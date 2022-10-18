import { useEffect, useState } from "react";
import dayjs from "dayjs";
import CreateAnimalSalePageExcerpt from "./CreateAnimalSalePageExcerpt";
import { useAddNewAnimalSaleMutation } from "./animalSaleApiSlice";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import PulseLoader from "react-spinners/PulseLoader";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CreateAnimalSalePage = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();

  const {
    batch,
    isError: isBatchError,
    isLoading: isBatchLoading,
    isSuccess: isBatchSuccess,
    error: batchError,
  } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data, isError, isLoading, isSuccess, error }) => ({
      batch: data?.entities[batchId],
      isError,
      isLoading,
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

  return (
    <>
      {isBatchSuccess &&
      !isBatchLoading &&
      Object.keys(stateBatch)?.length &&
      stateBatch?.isActive ? (
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
      ) : null}

      {isBatchSuccess &&
      !isBatchLoading &&
      Object.keys(stateBatch)?.length &&
      !stateBatch?.isActive ? (
        <p>Inactive Batches can't create New Details</p>
      ) : null}

      {isBatchLoading ? <PulseLoader color="green" /> : null}
      {isBatchError ? <p>{batchError?.data?.message}</p> : null}
    </>
  );
};

export default CreateAnimalSalePage;
