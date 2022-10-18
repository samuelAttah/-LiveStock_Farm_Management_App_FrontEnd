import { useEffect, useState } from "react";
import dayjs from "dayjs";
import EditRevenuePageExcerpt from "./EditRevenuePageExcerpt";
import {
  useGetRevenuesQuery,
  useUpdateRevenueMutation,
} from "./revenueApiSlice";
import { useGetBatchesQuery } from "../batches/batchApiSlice";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";

const EditRevenuePage = () => {
  const { batchId, revenueId } = useParams();
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
    revenue = {},
    isLoading: isRevenueLoading,
    isError: isRevenueError,
    isSuccess: isRevenueSuccess,
    error: revenueError,
  } = useGetRevenuesQuery(batchId, {
    selectFromResult: ({ data, isLoading, isError, isSuccess, error }) => ({
      revenue: data?.entities[revenueId],
      isLoading,
      isError,
      isSuccess,
      error,
    }),
  });

  const [formData, setFormData] = useState({
    itemSold: "",
    numberSold: "",
    costPerUnit: "",
  });

  const [fetchError, setFetchError] = useState("");

  const [dateSold, setDateSold] = useState(dayjs());

  const [stateBatch, setStateBatch] = useState({});

  const [updateRevenue, { isLoading, isError, error, isSuccess }] =
    useUpdateRevenueMutation();

  const canSave = [
    formData.itemSold,
    formData.numberSold,
    formData.costPerUnit,
    dateSold,
  ].every(Boolean);

  useEffect(() => {
    if (Object.keys(batch)?.length && Object.keys(revenue)?.length) {
      setStateBatch(batch);
      setFormData({
        itemSold: revenue?.itemSold,
        numberSold: Number(revenue?.numberSold),
        costPerUnit: Number(Object.values(revenue?.costPerUnit)[0]),
      });
      setDateSold(dayjs(revenue?.dateSold.split("T")[0]));
    }
  }, [batch, revenue]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Edited Successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      navigate(`/batch/${batchId}/revenues/${revenueId}`, { replace: true });
    }
  }, [isSuccess, navigate, batchId, revenueId]);

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
      itemSold: formData.itemSold,
      numberSold: Number(formData.numberSold),
      costPerUnit: formData.costPerUnit,
      dateSold: dateSold.format("YYYY-MM-DD"),
      batchId: batchId,
      revenueId: revenueId,
    };

    try {
      await updateRevenue(payLoad);
    } catch (error) {
      setFetchError(error?.data?.message);
    }
  };

  return (
    <>
      {isBatchSuccess &&
      isRevenueSuccess &&
      Object.keys(stateBatch)?.length &&
      Object.keys(revenue)?.length &&
      stateBatch?.isActive ? (
        <EditRevenuePageExcerpt
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          canSave={canSave}
          dateSold={dateSold}
          setDateSold={setDateSold}
          stateBatch={stateBatch}
          isLoading={isLoading}
          fetchError={fetchError}
        />
      ) : null}

      {isBatchSuccess &&
      isRevenueSuccess &&
      Object.keys(stateBatch)?.length &&
      Object.keys(revenue)?.length &&
      !stateBatch?.isActive ? (
        <p>Inactive Batches Can't Update Details</p>
      ) : null}

      {isBatchSuccess &&
      isRevenueSuccess &&
      Object.keys(stateBatch)?.length &&
      !Object.keys(revenue)?.length ? (
        <p>Revenue Does not exist</p>
      ) : null}

      {isBatchLoading || isRevenueLoading ? (
        <PulseLoader color="green" />
      ) : null}

      {!isBatchLoading && isBatchError ? (
        <p>{batchError?.data?.message ?? "Failed to Load Batch Details"}</p>
      ) : null}

      {!isRevenueLoading && isRevenueError ? (
        <p>{revenueError?.data?.message ?? "Failed to Load Revenue Details"}</p>
      ) : null}
    </>
  );
};

export default EditRevenuePage;
