import { useEffect, useState } from "react";
import dayjs from "dayjs";
import CreateMortalityPageExcerpt from "./CreateMortalityPageExcerpt";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import { useAddNewMortalityMutation } from "./mortalityApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";

const CreateMortalityPage = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    drugName: "",
    numberDead: "",
    deathReason: "",
  });

  const [fetchError, setFetchError] = useState("");

  const [stateBatch, setStateBatch] = useState({});

  const [deathDate, setDeathDate] = useState(dayjs());

  const [createMortality, { isLoading, isError, error, isSuccess }] =
    useAddNewMortalityMutation();

  const canSave = [formData.numberDead, formData.deathReason, deathDate].every(
    Boolean
  );

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
      navigate(`/batch/${batchId}/mortalities`, { replace: true });
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
      numberDead: Number(formData.numberDead),
      deathReason: formData.deathReason,
      deathDate: deathDate.format("YYYY-MM-DD"),
      batchId: batchId,
    };
    console.log("payLoad", payLoad);
    try {
      await createMortality(payLoad);
    } catch (error) {
      setFetchError(error?.data?.message);
    }
  };

  return (
    <>
      {isBatchSuccess &&
      Object.keys(stateBatch)?.length &&
      stateBatch?.isActive ? (
        <CreateMortalityPageExcerpt
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          canSave={canSave}
          deathDate={deathDate}
          setDeathDate={setDeathDate}
          isLoading={isLoading}
          fetchError={fetchError}
        />
      ) : null}

      {!isBatchLoading &&
      isBatchSuccess &&
      Object.keys(stateBatch)?.length &&
      !stateBatch?.isActive ? (
        <p>Inactive Batches Can't Create New Details</p>
      ) : null}

      {isBatchLoading && <PulseLoader color="green" />}

      {!isBatchLoading && isBatchError ? (
        <p>{batchError?.data?.message ?? "Failed to Load Batch Details"}</p>
      ) : null}
    </>
  );
};

export default CreateMortalityPage;

//
