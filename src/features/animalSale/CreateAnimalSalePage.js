import { useEffect, useState } from "react";
import dayjs from "dayjs";
import CreateAnimalSalePageExcerpt from "./CreateAnimalSalePageExcerpt";
import { useAddNewAnimalSaleMutation } from "./animalSaleApiSlice";
import { useGetBatchesQuery } from "../batches/batchApiSlice";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CreateAnimalSalePage = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();

  const { batch } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data }) => ({
      batch: data?.entities[batchId],
    }),
  });

  const [formData, setFormData] = useState({
    numberSold: "",
    costPerUnit: "",
  });

  const [fetchError, setFetchError] = useState("");

  const [dateSold, setDateSold] = useState(dayjs());

  const [stateBatch, setStateBatch] = useState({});

  const [createAnimalSale, { isLoading, isError, error, isSuccess }] =
    useAddNewAnimalSaleMutation();

  const canSave = [formData.numberSold, formData.costPerUnit, dateSold].every(
    Boolean
  );

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
      navigate(`/batch/${batchId}/animalsales`, { replace: true });
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
      numberSold: Number(formData.numberSold),
      costPerUnit: formData.costPerUnit,
      dateSold: dateSold.format("YYYY-MM-DD"),
      batchId: batchId,
    };
    console.log("payLoad", payLoad);
    try {
      await createAnimalSale(payLoad);
    } catch (error) {
      setFetchError(error?.data?.message);
    }
  };

  return stateBatch?.isActive ? (
    <CreateAnimalSalePageExcerpt
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

export default CreateAnimalSalePage;
