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

const EditRevenuePage = () => {
  const { batchId, revenueId } = useParams();
  const navigate = useNavigate();

  const { batch } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data }) => ({
      batch: data?.entities[batchId],
    }),
  });

  const { revenue } = useGetRevenuesQuery(batchId, {
    selectFromResult: ({ data }) => ({
      revenue: data?.entities[revenueId],
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
    if (batch && revenue) {
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
    console.log("payLoad", payLoad);
    try {
      await updateRevenue(payLoad);
    } catch (error) {
      setFetchError(error?.data?.message);
    }
  };

  return stateBatch?.isActive ? (
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
  ) : (
    <p>Inactive Batches Can't Update Details</p>
  );
};

export default EditRevenuePage;
