import { useEffect, useState } from "react";
import dayjs from "dayjs";
import EditFeedPageExcerpt from "./EditFeedPageExcerpt";
import { useUpdateFeedMutation, useGetFeedsQuery } from "./feedsApiSlice";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditFeedPage = () => {
  const { batchId, feedId } = useParams();
  const navigate = useNavigate();

  const { batch } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data }) => ({
      batch: data?.entities[batchId],
    }),
  });

  const { feed } = useGetFeedsQuery(batchId, {
    selectFromResult: ({ data }) => ({
      feed: data?.entities[feedId],
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
    if (batch && feed) {
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

  return stateBatch?.isActive ? (
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
  ) : (
    <p>Inactive Batches Can not be Updated</p>
  );
};

export default EditFeedPage;
