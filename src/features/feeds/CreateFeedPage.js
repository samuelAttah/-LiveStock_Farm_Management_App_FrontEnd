import { useEffect, useState } from "react";
import dayjs from "dayjs";
import CreateFeedPageExcerpt from "./CreateFeedPageExcerpt";
import { useAddNewFeedMutation } from "./feedsApiSlice";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CreateFeedPage = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();

  const { batch } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data }) => ({
      batch: data?.entities[batchId],
    }),
  });

  const [formData, setFormData] = useState({
    feedName: "",
    cost: "",
  });

  const [fetchError, setFetchError] = useState("");

  const [stateBatch, setStateBatch] = useState({});

  const [datePurchased, setDatePurchased] = useState(dayjs());

  const [createFeed, { isLoading, isError, error, isSuccess }] =
    useAddNewFeedMutation();

  const canSave = [formData.feedName, formData.cost, datePurchased].every(
    Boolean
  );

  useEffect(() => {
    if (batch) {
      setStateBatch(batch);
    }
  }, [batch]);

  useEffect(() => {
    if (isError) {
      setFetchError(error?.data?.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Created Successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      navigate(`/batch/${batchId}/feeds`, { replace: true });
    }
  }, [isSuccess, navigate, batchId]);

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
    };
    console.log("payLoad", payLoad);
    try {
      await createFeed(payLoad).unwrap();
    } catch (error) {
      setFetchError(error?.data.message);
    }
  };

  return stateBatch?.isActive ? (
    <CreateFeedPageExcerpt
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
    <p>Inactive Batches Can't Create New Details</p>
  );
};

export default CreateFeedPage;
