import { useGetFeedsQuery } from "./feedsApiSlice";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import FeedsPageExcerpt from "./FeedsPageExcerpt";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const FeedsPage = () => {
  const { batchId } = useParams();

  const [stateFeeds, setStateFeeds] = useState([]);
  const [stateError, setStateError] = useState(null);

  const {
    data: feeds,
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
      console.log("stateFeeds", allFeeds);
    } else if (isError) {
      setStateError(error);
    }
  }, [isError, error, isSuccess, feeds]);

  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <Typography fontWeight="bold">
          List of All Feeds Purchased for this Batch
        </Typography>
        <Link to={`/batch/${batchId}/feeds/create`}>NEW FEED</Link>
      </Box>

      <Divider sx={{ mb: "15px" }} />
      {stateFeeds?.length && !stateError
        ? stateFeeds.map((feed) => (
            <FeedsPageExcerpt key={feed.id} feed={feed} batchId={batchId} />
          ))
        : null}
      {isLoading ? <p>Loading Feeds</p> : null}
      {isSuccess && !stateError && !isLoading && !stateFeeds?.length ? (
        <p>No Feeds Purchased so far in this Batch</p>
      ) : null}
      {!isLoading && stateError ? <p>{stateError}</p> : null}
    </div>
  );
};

export default FeedsPage;
