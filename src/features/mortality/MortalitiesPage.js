import { useGetBatchesQuery } from "../batches/batchApiSlice";
import { useGetMortalitysQuery } from "./mortalityApiSlice";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import MortalitiesPageExcerpt from "./MortalitiesPageExcerpt";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import useTitle from "../../common/hooks/useTitle";

const MortalitiesPage = () => {
  useTitle("Farm Diary | Batch Mortalities");
  const { batchId } = useParams();

  const [stateDeaths, setStateDeaths] = useState([]);
  const [stateError, setStateError] = useState(null);

  //USING RTK HOOK TO FETCH BATCH
  const {
    batch = {},
    // isError: isBatchError,
    isLoading: isBatchLoading,
    isSuccess: isBatchSuccess,
    // error: batchError,
  } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data, isError, isLoading, isSuccess, error }) => ({
      batch: data?.entities[batchId],
      isError,
      isLoading,
      isSuccess,
      error,
    }),
  });

  //FETCHING DATA WITH USEGETMORTALITYSQUERY
  const {
    data: deaths = {},
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetMortalitysQuery(batchId, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isSuccess) {
      const allDeaths = Object.keys(deaths)?.length
        ? deaths?.ids.map((id) => {
            return deaths?.entities[id];
          })
        : [];
      setStateDeaths(allDeaths);
    } else if (isError) {
      setStateError(error);
    }
  }, [isError, error, isSuccess, deaths]);

  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <Typography fontWeight="bold">
          List of All Livestock Deaths for this Batch
        </Typography>
        {isBatchSuccess && !isBatchLoading && batch?.isActive ? (
          <Link to={`/batch/${batchId}/mortalities/create`}>NEW DEATH</Link>
        ) : null}
      </Box>

      <Divider sx={{ mb: "15px" }} />
      {stateDeaths?.length && !stateError
        ? stateDeaths
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((death) => (
              <MortalitiesPageExcerpt
                key={death.id}
                death={death}
                batchId={batchId}
              />
            ))
        : null}
      {isLoading ? <p>Loading Mortalities</p> : null}
      {isSuccess && !stateError && !isLoading && !stateDeaths?.length ? (
        <p>No Deaths Recorded so far in this Batch</p>
      ) : null}
      {!isLoading && stateError ? <p>{stateError}</p> : null}
    </div>
  );
};

export default MortalitiesPage;
