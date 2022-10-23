import { useGetFeedsQuery } from "./feedsApiSlice";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import FeedsPageExcerpt from "./FeedsPageExcerpt";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import PulseLoader from "react-spinners/PulseLoader";
import useTitle from "../../common/hooks/useTitle";

const FeedsPage = () => {
  useTitle("Farm Diary | Batch Feeds");
  const { batchId } = useParams();

  const [stateFeeds, setStateFeeds] = useState([]);
  const [stateError, setStateError] = useState(null);

  const {
    batch = {},
    // isError: isBatchError,
    isLoading: isBatchLoading,
    isSuccess: isBatchSuccess,
    // error: batchError,
  } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data, isError, isLoading, error, isSuccess }) => ({
      batch: data?.entities[batchId],
      isError,
      isLoading,
      isSuccess,
      error,
    }),
  });

  const {
    data: feeds = {},
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetFeedsQuery(batchId);

  useEffect(() => {
    if (isSuccess) {
      const allFeeds = Object.keys(feeds)?.length
        ? feeds?.ids.map((id) => {
            return feeds?.entities[id];
          })
        : [];
      setStateFeeds(allFeeds);
    } else if (isError) {
      setStateError(error?.data?.message);
    }
  }, [isError, error, isSuccess, feeds]);

  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <Typography fontWeight="bold">
          List of All Feeds Purchased for this Batch
        </Typography>
        {isBatchSuccess && !isBatchLoading && batch?.isActive ? (
          <Link to={`/batch/${batchId}/feeds/create`}>NEW FEED</Link>
        ) : null}
      </Box>

      <Divider sx={{ mb: "15px" }} />
      {isSuccess && stateFeeds?.length && !stateError
        ? stateFeeds
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((feed) => (
              <FeedsPageExcerpt key={feed.id} feed={feed} batchId={batchId} />
            ))
        : null}

      {isLoading ? <PulseLoader color="green" /> : null}

      {isSuccess && !stateError && !isLoading && !stateFeeds?.length ? (
        <p>No Feeds Purchased so far in this Batch</p>
      ) : null}

      {!isLoading && isError ? (
        <p>{stateError ?? "Failed to Load Feeds"}</p>
      ) : null}
    </div>
  );
};

export default FeedsPage;
