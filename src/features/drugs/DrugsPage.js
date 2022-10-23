import { useGetDrugsQuery } from "./drugsApiSlice";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DrugsPageExcerpt from "./DrugsPageExcerpt";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import useTitle from "../../common/hooks/useTitle";

const DrugsPage = () => {
  useTitle("Farm Diary | Batch Drugs");
  const { batchId } = useParams();

  const [stateDrugs, setStateDrugs] = useState([]);
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
    data: drugs,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetDrugsQuery(batchId, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isSuccess) {
      const allDrugs = Object.keys(drugs)?.length
        ? drugs?.ids.map((id) => {
            return drugs?.entities[id];
          })
        : [];
      setStateDrugs(allDrugs);
    } else if (isError) {
      setStateError(error);
    }
  }, [isError, error, isSuccess, drugs]);

  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <Typography fontWeight="bold">
          List of All Drugs Purchased for this Batch
        </Typography>
        {isBatchSuccess && !isBatchLoading && batch?.isActive ? (
          <Link to={`/batch/${batchId}/drugs/create`}>NEW DRUG</Link>
        ) : null}
      </Box>

      <Divider sx={{ mb: "15px" }} />
      {stateDrugs?.length && !stateError
        ? stateDrugs
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((drug) => (
              <DrugsPageExcerpt key={drug.id} drug={drug} batchId={batchId} />
            ))
        : null}
      {isLoading ? <p>Loading Drugs</p> : null}
      {isSuccess && !stateError && !isLoading && !stateDrugs?.length ? (
        <p>No Drugs Purchased so far in this Batch</p>
      ) : null}
      {!isLoading && stateError ? <p>{stateError}</p> : null}
    </div>
  );
};

export default DrugsPage;
