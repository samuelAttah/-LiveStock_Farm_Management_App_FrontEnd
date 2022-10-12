import { useEffect, useState } from "react";
import dayjs from "dayjs";
import EditAnimalSalePageExcerpt from "./EditAnimalSalePageExcerpt";
import {
  useGetAnimalSalesQuery,
  useUpdateAnimalSaleMutation,
} from "./animalSaleApiSlice";
import { useGetBatchesQuery } from "../batches/batchApiSlice";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditAnimalSalePage = () => {
  const { batchId, animalSaleId } = useParams();
  const navigate = useNavigate();

  const { batch } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data }) => ({
      batch: data?.entities[batchId],
    }),
  });

  const { animalSale } = useGetAnimalSalesQuery(batchId, {
    selectFromResult: ({ data }) => ({
      revenue: data?.entities[animalSaleId],
    }),
  });

  const [formData, setFormData] = useState({
    numberSold: "",
    costPerUnit: "",
  });

  const [fetchError, setFetchError] = useState("");

  const [dateSold, setDateSold] = useState(dayjs());

  const [stateBatch, setStateBatch] = useState({});

  const [updateAnimalSale, { isLoading, isError, error, isSuccess }] =
    useUpdateAnimalSaleMutation();

  const canSave = [formData.numberSold, formData.costPerUnit, dateSold].every(
    Boolean
  );

  useEffect(() => {
    if (batch && animalSale) {
      setStateBatch(batch);
      setFormData({
        numberSold: Number(animalSale?.numberSold),
        costPerUnit: Number(Object.values(animalSale?.costPerUnit)[0]),
      });
      setDateSold(dayjs(animalSale?.dateSold.split("T")[0]));
    }
  }, [batch, animalSale]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Edited Successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      navigate(`/batch/${batchId}/animalsales/${animalSaleId}`, {
        replace: true,
      });
    }
  }, [isSuccess, navigate, batchId, animalSaleId]);

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
      animalSaleId: animalSaleId,
    };
    console.log("payLoad", payLoad);
    try {
      await updateAnimalSale(payLoad);
    } catch (error) {
      setFetchError(error?.data?.message);
    }
  };

  return stateBatch?.isActive ? (
    <EditAnimalSalePageExcerpt
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
    <p>Inactive Batches Can't be Updated</p>
  );
};

export default EditAnimalSalePage;
