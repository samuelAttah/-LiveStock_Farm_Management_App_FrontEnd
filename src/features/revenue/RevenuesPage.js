import { useGetBatchesQuery } from "../batches/batchApiSlice";
import { useGetRevenuesQuery } from "./revenueApiSlice";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import RevenuesPageExcerpt from "./RevenuesPageExcerpt";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const RevenuesPage = () => {
  const { batchId } = useParams();

  const [stateRevenues, setStateRevenues] = useState([]);
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

  //FETCHING DATA WITH USEGETREVENUESQUERY
  const {
    data: revenues,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetRevenuesQuery(batchId, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isSuccess) {
      const allRevenues = Object.keys(revenues)?.length
        ? revenues?.ids.map((id) => {
            return revenues?.entities[id];
          })
        : [];
      setStateRevenues(allRevenues);
    } else if (isError) {
      setStateError(error?.data?.message);
    }
  }, [isError, error, isSuccess, revenues]);

  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <Typography fontWeight="bold">
          List of Other Revenues Generated for this Batch
        </Typography>
        {isBatchSuccess && !isBatchLoading && batch?.isActive ? (
          <Link to={`/batch/${batchId}/revenues/create`}>NEW REVENUE</Link>
        ) : null}
      </Box>

      <Divider sx={{ mb: "15px" }} />
      {stateRevenues?.length && !stateError
        ? stateRevenues
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((revenue) => (
              <RevenuesPageExcerpt
                key={revenue.id}
                revenue={revenue}
                batchId={batchId}
              />
            ))
        : null}
      {isLoading ? <p>Loading Revenues</p> : null}
      {isSuccess && !stateError && !isLoading && !stateRevenues?.length ? (
        <p>No Revenues Recorded so far in this Batch</p>
      ) : null}
      {!isLoading && stateError ? <p>{stateError}</p> : null}
    </div>
  );
};

export default RevenuesPage;
