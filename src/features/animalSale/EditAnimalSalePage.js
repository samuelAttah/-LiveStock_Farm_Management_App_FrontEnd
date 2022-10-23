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
import useTitle from "../../common/hooks/useTitle";

const EditAnimalSalePage = () => {
  useTitle("Farm Diary | Edit Animal Revenue");
  const { batchId, animalSaleId } = useParams();
  const navigate = useNavigate();

  const {
    animalSale = {},
    isError: isSaleError,
    isLoading: isSaleLoading,
    isSuccess: isSaleSuccess,
    error: saleError,
  } = useGetAnimalSalesQuery(batchId, {
    selectFromResult: ({ data, isError, isLoading, isSuccess, error }) => ({
      animalSale: data?.entities[animalSaleId],
      isError,
      isSuccess,
      isLoading,
      error,
    }),
    refetchOnMountOrArgChange: true,
  });

  const {
    batch = {},
    isLoading: isBatchLoading,
    isSuccess: isBatchSuccess,
    isError: isBatchError,
    error: batchError,
  } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data, isError, isLoading, isSuccess, error }) => ({
      batch: data?.entities[batchId],
      isLoading,
      isError,
      isSuccess,
      error,
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
    if (Object.keys(batch)?.length && Object?.keys(animalSale)?.length) {
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

    try {
      await updateAnimalSale(payLoad);
    } catch (error) {
      setFetchError(error?.data?.message);
    }
  };

  return (
    <>
      {isBatchSuccess &&
      isSaleSuccess &&
      Object?.keys(stateBatch)?.length &&
      Object.keys(animalSale)?.length &&
      stateBatch?.isActive ? (
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
      ) : null}

      {isBatchSuccess &&
      isSaleSuccess &&
      Object?.keys(stateBatch)?.length &&
      Object.keys(animalSale)?.length &&
      !stateBatch?.isActive ? (
        <p>Inactive Batches Can't be Updated</p>
      ) : null}

      {isBatchSuccess &&
      isSaleSuccess &&
      !Object?.keys(stateBatch)?.length &&
      !Object.keys(animalSale)?.length ? (
        <p>Animal Sale Does not Exist</p>
      ) : null}

      {isBatchError && !isBatchLoading ? (
        <p>{batchError?.data?.message}</p>
      ) : null}
      {isSaleError && !isSaleLoading ? <p>{saleError?.data?.message}</p> : null}
    </>
  );
};

export default EditAnimalSalePage;
