import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import {
  useGetMortalitysQuery,
  useDeleteMortalityMutation,
} from "./mortalityApiSlice";
import SingleMortalityPageExcerpt from "./SingleMortalityPageExcerpt";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";

const SingleMortalityPage = () => {
  const { mortalityId, batchId } = useParams();
  const navigate = useNavigate();

  const [stateMortality, setStateMortality] = useState({});
  const [createdDate, setCreatedDate] = useState(String);

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

  const [deleteMortality, { isLoading }] = useDeleteMortalityMutation();

  useEffect(() => {
    if (Object.keys(mortality)?.length) {
      setStateMortality(mortality);
      setCreatedDate(mortality.createdAt);
    }
  }, [mortality]);

  const handleClick = () => {
    navigate(`/batch/${batchId}/mortalities/${mortalityId}/edit`);
  };

  const handleDelete = async () => {
    const payLoad = {
      batchId: batchId,
      mortalityId: mortalityId,
    };

    try {
      await deleteMortality(payLoad).unwrap();
      navigate(`/batch/${batchId}/mortalities`, { replace: true });
      toast.success("Deleted Successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (error) {
      console.log("error", error?.data?.message);
      toast.error("Failed to Delete", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };

  return (
    <div>
      {isBatchSuccess &&
      isMortalitySuccess &&
      Object.keys(batch)?.length &&
      Object.keys(stateMortality)?.length ? (
        <SingleMortalityPageExcerpt
          stateMortality={stateMortality}
          createdDate={createdDate}
          handleClick={handleClick}
          batch={batch}
          handleDelete={handleDelete}
          isLoading={isLoading}
        />
      ) : null}

      {!Object.keys(stateMortality)?.length &&
      isBatchSuccess &&
      isMortalitySuccess &&
      Object.keys(batch)?.length ? (
        <p>Mortality Does not Exist</p>
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
    </div>
  );
};

export default SingleMortalityPage;
