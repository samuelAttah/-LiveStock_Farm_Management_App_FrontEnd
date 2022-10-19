import { useEffect, useState } from "react";
import dayjs from "dayjs";
import CreateFeedPageExcerpt from "./CreateFeedPageExcerpt";
import { useAddNewFeedMutation } from "./feedsApiSlice";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";

const CreateFeedPage = () => {
  const { batchId } = useParams();
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
    if (Object.keys(batch)?.length) {
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
    try {
      await createFeed(payLoad).unwrap();
    } catch (error) {
      setFetchError(error?.data.message);
    }
  };

  return (
    <>
      {isBatchSuccess &&
      !isBatchLoading &&
      Object.keys(stateBatch)?.length &&
      stateBatch?.isActive ? (
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
      ) : null}

      {isBatchSuccess &&
      !isBatchLoading &&
      Object.keys(stateBatch)?.length &&
      !stateBatch?.isActive ? (
        <p> Inactive Batches Can't Update Details</p>
      ) : null}

      {isBatchLoading && <PulseLoader color="green" />}

      {isBatchError && !isBatchLoading ? (
        <p>{batchError?.data?.message ?? "Failed to load Batch Data"}</p>
      ) : null}
    </>
  );
};

export default CreateFeedPage;
