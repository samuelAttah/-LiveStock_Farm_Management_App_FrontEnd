import { useEffect, useState } from "react";
import dayjs from "dayjs";
import EditHousingPageExcerpt from "./EditHousingPageExcerpt";
import {
  useUpdateHousingMutation,
  useGetHousingsQuery,
} from "./housingApiSlice";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";

const EditHousingPage = () => {
  const { batchId, housingId } = useParams();
  const navigate = useNavigate();

  //USING RTK CUSTOM HOOKS

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
    house = {},
    isError: isHouseError,
    isLoading: isHouseLoading,
    isSuccess: isHouseSuccess,
    error: houseError,
  } = useGetHousingsQuery(batchId, {
    selectFromResult: ({ data, isError, isLoading, isSuccess, error }) => ({
      house: data?.entities[housingId],
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

  const [updateHousing, { isLoading, isError, error, isSuccess }] =
    useUpdateHousingMutation();

  const canSave = [
    formData.housingType,
    formData.cost,
    formData.description,
    datePurchased,
  ].every(Boolean);

  useEffect(() => {
    if (Object.keys(batch)?.length && Object.keys(house)?.length) {
      setStateBatch(batch);
      setFormData({
        housingType: house?.housingType,
        cost: Number(Object.values(house?.cost)[0]),
        description: house?.description,
      });
      setDatePurchased(dayjs(house?.datePurchased.split("T")[0]));
    }
  }, [batch, house]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Edited Successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      navigate(`/batch/${batchId}/housings/${housingId}`, { replace: true });
    }
  }, [isSuccess, navigate, batchId, housingId]);

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
      housingId: housingId,
    };
    try {
      await updateHousing(payLoad);
    } catch (error) {
      setFetchError(error.message);
    }
  };

  return (
    <>
      {isBatchSuccess &&
      isHouseSuccess &&
      Object.keys(stateBatch)?.length &&
      Object.keys(house)?.length &&
      stateBatch?.isActive ? (
        <EditHousingPageExcerpt
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
      isHouseSuccess &&
      Object.keys(stateBatch)?.length &&
      Object.keys(house)?.length &&
      !stateBatch?.isActive ? (
        <p>Inactive Batches Can't Update Details</p>
      ) : null}

      {isBatchLoading || isHouseLoading ? <PulseLoader color="green" /> : null}

      {!isBatchLoading && isBatchError ? (
        <p>{batchError?.data?.message ?? "Failed to Load Batch Details"}</p>
      ) : null}

      {!isHouseLoading && isHouseError ? (
        <p>{houseError?.data?.message ?? "Failed to Load House Details"}</p>
      ) : null}
    </>
  );
};

export default EditHousingPage;
