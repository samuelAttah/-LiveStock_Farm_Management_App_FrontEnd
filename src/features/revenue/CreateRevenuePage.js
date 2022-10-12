import { useEffect, useState } from "react";
import dayjs from "dayjs";
import CreateRevenuePageExcerpt from "./CreateRevenuePageExcerpt";
import { useAddNewRevenueMutation } from "./revenueApiSlice";
import { useGetBatchesQuery } from "../batches/batchApiSlice";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CreateRevenuePage = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();

  const { batch } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data }) => ({
      batch: data?.entities[batchId],
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

  const [createRevenue, { isLoading, isError, error, isSuccess }] =
    useAddNewRevenueMutation();

  const canSave = [
    formData.itemSold,
    formData.numberSold,
    formData.costPerUnit,
    dateSold,
  ].every(Boolean);

  useEffect(() => {
    if (batch) {
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
      navigate(`/batch/${batchId}/revenues`, { replace: true });
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
      itemSold: formData.itemSold,
      numberSold: Number(formData.numberSold),
      costPerUnit: formData.costPerUnit,
      dateSold: dateSold.format("YYYY-MM-DD"),
      batchId: batchId,
    };
    console.log("payLoad", payLoad);
    try {
      await createRevenue(payLoad);
    } catch (error) {
      setFetchError(error?.data?.message);
    }
  };

  return stateBatch?.isActive ? (
    <CreateRevenuePageExcerpt
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
    <p>Inactive Batches Can't Create New Details</p>
  );
};

export default CreateRevenuePage;
