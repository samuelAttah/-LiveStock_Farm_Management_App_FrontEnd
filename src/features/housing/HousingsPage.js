import { useGetHousingsQuery } from "./housingApiSlice";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import HousingsPageExcerpt from "./HousingsPageExcerpt";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const HousingsPage = () => {
  const { batchId } = useParams();

  const [stateHousings, setStateHousings] = useState([]);
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

  //FETCHING DATA WITH USEGETDRUGSQUERY
  const {
    data: housings = {},
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetHousingsQuery(batchId, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isSuccess) {
      const allHousings = Object.keys(housings)?.length
        ? housings?.ids.map((id) => {
            return housings?.entities[id];
          })
        : [];
      setStateHousings(allHousings);
    } else if (isError) {
      setStateError(error);
    }
  }, [isError, error, isSuccess, housings]);

  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <Typography fontWeight="bold">
          List of All Properties Purchased for this Batch
        </Typography>
        {isBatchSuccess && !isBatchLoading && batch?.isActive ? (
          <Link to={`/batch/${batchId}/housings/create`}>NEW HOUSING</Link>
        ) : null}
      </Box>

      <Divider sx={{ mb: "15px" }} />
      {stateHousings?.length && !stateError
        ? stateHousings
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((house) => (
              <HousingsPageExcerpt
                key={house.id}
                house={house}
                batchId={batchId}
              />
            ))
        : null}
      {isLoading ? <p>Loading Properties</p> : null}
      {isSuccess && !stateError && !isLoading && !stateHousings?.length ? (
        <p>No Properties Purchased so far in this Batch</p>
      ) : null}
      {!isLoading && stateError ? <p>{stateError}</p> : null}
    </div>
  );
};

export default HousingsPage;
