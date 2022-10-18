import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetFeedsQuery, useDeleteFeedMutation } from "./feedsApiSlice";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import SingleFeedPageExcerpt from "./SingleFeedPageExcerpt";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";

const SingleFeedPage = () => {
  const { feedId, batchId } = useParams();
  const navigate = useNavigate();

  const [stateFeed, setStateFeed] = useState({});
  const [createdDate, setCreatedDate] = useState(String);
  const [purchasedDate, setPurchasedDate] = useState(String);
  const [cost, setCost] = useState(String);

  const {
    batch = {},
    isError: isBatchError,
    isLoading: isBatchLoading,
    isSuccess: isBatchSuccess,
    error: batchError,
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
    feed = {},
    isLoading: isFeedLoading,
    isError: isFeedError,
    isSuccess: isFeedSuccess,
    error: feedError,
  } = useGetFeedsQuery(batchId, {
    selectFromResult: ({ data, isError, isLoading, isSuccess, error }) => ({
      feed: data?.entities[feedId],
      isError,
      isLoading,
      isSuccess,
      error,
    }),
  });

  const [deleteFeed, { isLoading }] = useDeleteFeedMutation();

  useEffect(() => {
    if (Object.keys(feed)?.length && Object.keys(batch)?.length) {
      setStateFeed(feed);

      setCreatedDate(feed.createdAt);
      setPurchasedDate(feed.datePurchased);

      const formattedCost = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: batch.currency ?? "USD",
      }).format(Object.values(feed?.amountPurchased)[0]);

      setCost(formattedCost);
    }
  }, [feed, batch]);

  const handleClick = () => {
    navigate(`/batch/${batchId}/feeds/${feedId}/edit`);
  };

  const handleDelete = async () => {
    const payLoad = {
      batchId: batchId,
      feedId: feedId,
    };

    try {
      await deleteFeed(payLoad).unwrap();
      navigate(`/batch/${batchId}/feeds`, { replace: true });
      toast.success("Deleted Successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (error) {
      console.log("error", error?.data?.message);
      toast.error("Failed to Delete", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  return (
    <>
      {!isBatchLoading &&
      isBatchSuccess &&
      !isFeedLoading &&
      isFeedSuccess &&
      Object.keys(feed)?.length &&
      Object.keys(batch)?.length ? (
        <SingleFeedPageExcerpt
          stateFeed={stateFeed}
          cost={cost}
          createdDate={createdDate}
          purchasedDate={purchasedDate}
          batch={batch}
          handleClick={handleClick}
          handleDelete={handleDelete}
          isLoading={isLoading}
        />
      ) : null}

      {isBatchSuccess &&
      isFeedSuccess &&
      Object.keys(batch)?.length &&
      !Object.keys(feed)?.length ? (
        <p>Feed Does not Exist </p>
      ) : null}

      {isBatchLoading || isFeedLoading ? <PulseLoader color="green" /> : null}
      {!isBatchLoading && isBatchError ? (
        <p>{batchError?.data?.message ?? "Failed to Load Batch Details"}</p>
      ) : null}

      {!isFeedLoading && isFeedError ? (
        <p>{feedError?.data?.message ?? "Failed to Load Feed Details"}</p>
      ) : null}
    </>
  );
};

export default SingleFeedPage;
