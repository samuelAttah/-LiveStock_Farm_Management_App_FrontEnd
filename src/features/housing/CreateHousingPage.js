import { useEffect, useState } from "react";
import dayjs from "dayjs";
import CreateHousingPageExcerpt from "./CreateHousingPageExcerpt";
import { useAddNewHousingMutation } from "./housingApiSlice";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import useTitle from "../../common/hooks/useTitle";

const CreateHousingPage = () => {
  useTitle("Farm Diary | New Housing");
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
    housingType: "",
    cost: "",
    description: "",
  });

  const [fetchError, setFetchError] = useState("");

  const [stateBatch, setStateBatch] = useState({});

  const [datePurchased, setDatePurchased] = useState(dayjs());

  const [createHousing, { isLoading, isError, error, isSuccess }] =
    useAddNewHousingMutation();

  const canSave = [
    formData.housingType,
    formData.cost,
    formData.description,
    datePurchased,
  ].every(Boolean);

  useEffect(() => {
    if (Object.keys(batch)?.length) {
      setStateBatch(batch);
    }
  }, [batch]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Created Successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      navigate(`/batch/${batchId}/housings`, { replace: true });
    }
  }, [isSuccess, navigate, batchId]);

  useEffect(() => {
    if (isError) {
      setFetchError(error?.data?.message);
    }
  }, [isError, error]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payLoad = {
      housingType: formData.housingType,
      description: formData.description,
      cost: formData.cost,
      datePurchased: datePurchased.format("YYYY-MM-DD"),
      batchId: batchId,
    };
    try {
      await createHousing(payLoad);
    } catch (error) {
      setFetchError(error.message);
    }
  };

  return (
    <>
      {isBatchSuccess &&
      !isBatchLoading &&
      Object.keys(stateBatch)?.length &&
      stateBatch?.isActive ? (
        <CreateHousingPageExcerpt
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
        <p>Inactive Batches Can't Create New Details</p>
      ) : null}

      {isBatchLoading && <PulseLoader color="green" />}

      {isBatchError && !isBatchLoading ? (
        <p>{batchError?.data?.message ?? "Failed to Load Batch Data"}</p>
      ) : null}
    </>
  );
};

export default CreateHousingPage;
