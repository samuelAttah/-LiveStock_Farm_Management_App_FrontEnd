import { useEffect, useState } from "react";
import dayjs from "dayjs";
import EditMortalityPageExcerpt from "./EditMortalityPageExcerpt";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import {
  useGetMortalitysQuery,
  useUpdateMortalityMutation,
} from "./mortalityApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";

const EditMortalityPage = () => {
  const { batchId, mortalityId } = useParams();
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
    mortality = {},
    isError: isMortalityError,
    isLoading: isMortalityLoading,
    isSuccess: isMortalitySuccess,
    error: mortalityError,
  } = useGetMortalitysQuery(batchId, {
    selectFromResult: ({ data, isError, isLoading, isSuccess, error }) => ({
      mortality: data?.entities[mortalityId],
      isError,
      isLoading,
      isSuccess,
      error,
    }),
  });

  const [formData, setFormData] = useState({
    numberDead: "",
    deathReason: "",
  });

  const [stateBatch, setStateBatch] = useState({});

  const [fetchError, setFetchError] = useState("");

  const [deathDate, setDeathDate] = useState(dayjs());

  const [updateMortality, { isLoading, isError, error, isSuccess }] =
    useUpdateMortalityMutation();

  const canSave = [formData.numberDead, formData.deathReason, deathDate].every(
    Boolean
  );

  useEffect(() => {
    if (Object.keys(batch)?.length) {
      setStateBatch(batch);
    }
  }, [batch]);

  useEffect(() => {
    if (Object.keys(mortality)?.length) {
      setFormData({
        numberDead: Number(mortality?.numberDead),
        deathReason: mortality?.deathReason,
      });
      setDeathDate(dayjs(mortality?.deathDate.split("T")[0]));
    }
  }, [mortality]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Edited Successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      navigate(`/batch/${batchId}/mortalities/${mortalityId}`, {
        replace: true,
      });
    }
  }, [isSuccess, navigate, batchId, mortalityId]);

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
      mortalityId: mortalityId,
    };

    try {
      await updateMortality(payLoad);
    } catch (error) {
      setFetchError(error?.data?.message);
    }
  };

  return (
    <>
      {isBatchSuccess &&
      isMortalitySuccess &&
      Object.keys(stateBatch)?.length &&
      Object.keys(mortality)?.length &&
      stateBatch?.isActive ? (
        <EditMortalityPageExcerpt
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

      {isBatchSuccess &&
      isMortalitySuccess &&
      Object.keys(stateBatch)?.length &&
      Object.keys(mortality)?.length &&
      !stateBatch?.isActive ? (
        <p>Inactive Batches Can't Update Details</p>
      ) : null}

      {isBatchLoading || isMortalityLoading ? (
        <PulseLoader color="green" />
      ) : null}

      {!isBatchLoading && isBatchError ? (
        <p>{batchError?.data?.message ?? "Failed to Load Batch Details"}</p>
      ) : null}

      {!isMortalityLoading && isMortalityError ? (
        <p>
          {mortalityError?.data?.message ?? "Failed to Load Mortality Details"}
        </p>
      ) : null}
    </>
  );
};

export default EditMortalityPage;
