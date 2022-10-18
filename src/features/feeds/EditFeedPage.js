import { useEffect, useState } from "react";
import dayjs from "dayjs";
import EditFeedPageExcerpt from "./EditFeedPageExcerpt";
import { useUpdateFeedMutation, useGetFeedsQuery } from "./feedsApiSlice";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";

const EditFeedPage = () => {
  const { batchId, feedId } = useParams();
  const navigate = useNavigate();

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

  const [formData, setFormData] = useState({
    feedName: "",
    cost: "",
  });

  const [fetchError, setFetchError] = useState("");

  const [stateBatch, setStateBatch] = useState({});

  const [datePurchased, setDatePurchased] = useState(dayjs());

  const [updateFeed, { isLoading, isError, error, isSuccess }] =
    useUpdateFeedMutation();

  const canSave = [formData.feedName, formData.cost, datePurchased].every(
    Boolean
  );

  useEffect(() => {
    if (Object.keys(batch)?.length && Object.keys(feed)?.length) {
      setStateBatch(batch);
      setFormData({
        feedName: feed?.feedName,
        cost: Number(Object.values(feed?.amountPurchased)[0]),
      });
      setDatePurchased(dayjs(feed?.datePurchased.split("T")[0]));
    }
  }, [batch, feed]);

  useEffect(() => {
    if (isError) {
      setFetchError(error?.data?.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Edited Successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      navigate(`/batch/${batchId}/feeds/${feedId}`, { replace: true });
    }
  }, [isSuccess, navigate, batchId, feedId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payLoad = {
      feedName: formData.feedName,
      amountPurchased: formData.cost,
      datePurchased: datePurchased.format("YYYY-MM-DD"),
      batchId: batchId,
      feedId: feedId,
    };
    console.log("payLoad", payLoad);
    try {
      await updateFeed(payLoad).unwrap();
    } catch (error) {
      setFetchError(error?.data.message);
    }
  };

  return (
    <>
      {isBatchSuccess &&
      isFeedSuccess &&
      Object.keys(feed)?.length &&
      Object.keys(stateBatch)?.length &&
      stateBatch?.isActive ? (
        <EditFeedPageExcerpt
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          canSave={canSave}
          datePurchased={datePurchased}
          setDatePurchased={setDatePurchased}
          stateBatch={stateBatch}
          isLoading={isLoading}
          fetchError={fetchError}
        />
      ) : null}

      {isBatchSuccess &&
      isFeedSuccess &&
      Object.keys(feed)?.length &&
      Object.keys(stateBatch)?.length &&
      !stateBatch?.isActive ? (
        <p>Inactive Batches Can't Update Details </p>
      ) : null}

      {isBatchSuccess &&
      isFeedSuccess &&
      !Object.keys(stateBatch)?.length &&
      !Object.keys(feed)?.length ? (
        <p>Feed Does not Exist </p>
      ) : null}

      {isBatchLoading || isFeedLoading ? <PulseLoader color="green" /> : null}

      {isBatchError && !isBatchLoading ? (
        <p>{batchError?.data?.message ?? "Failed to Load Batch"}</p>
      ) : null}

      {isFeedError && !isFeedLoading ? (
        <p>{feedError?.data?.message ?? "Failed to Load Feed"}</p>
      ) : null}
    </>
  );
};

export default EditFeedPage;
