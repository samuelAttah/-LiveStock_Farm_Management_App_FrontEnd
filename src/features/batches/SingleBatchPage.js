import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBatchesQuery, useDeleteBatchMutation } from "./batchApiSlice";
import SIngleBatchPageExcerpt from "./SIngleBatchPageExcerpt";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";

const SingleBatchPage = () => {
  const { batchId } = useParams();

  const navigate = useNavigate();

  const [stateBatch, setStateBatch] = useState({});
  const [createdDate, setCreatedDate] = useState(String);
  const [costPerUnit, setCostPerUnit] = useState(String);
  const [totalPurchaseCost, setTotalPurchaseCost] = useState(String);

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
    refetchOnMountOrArgChange: true,
  });

  const [deleteBatch, { isLoading }] = useDeleteBatchMutation();

  useEffect(() => {
    if (Object.keys(batch)?.length) {
      setStateBatch(batch);

      setCreatedDate(batch.createdAt);

      const formattedTotalPurchaseCost = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: batch.currency ?? "USD",
      }).format(Object.values(batch.totalPurchaseCost)[0]);

      const formattedCostPerUnit = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: batch.currency ?? "USD",
      }).format(Object.values(batch.costPerUnit)[0]);

      setTotalPurchaseCost(formattedTotalPurchaseCost);

      setCostPerUnit(formattedCostPerUnit);
    }
  }, [batch]);

  const handleClick = () => {
    navigate(`/batch/${batchId}/edit`);
  };

  const handleDelete = async () => {
    try {
      await deleteBatch({ id: batchId }).unwrap();
      navigate("/dashboard", { replace: true });
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

  const handleSummary = () => {
    navigate(`/batch/${batchId}/summary`);
  };
  return (
    <>
      {isBatchSuccess && Object.keys(stateBatch)?.length ? (
        <SIngleBatchPageExcerpt
          stateBatch={stateBatch}
          costPerUnit={costPerUnit}
          totalPurchaseCost={totalPurchaseCost}
          createdDate={createdDate}
          handleClick={handleClick}
          handleDelete={handleDelete}
          handleSummary={handleSummary}
          isLoading={isLoading}
        />
      ) : null}

      {!isBatchLoading && isBatchSuccess & !Object.keys(stateBatch)?.length ? (
        <p>Batch Does not exist</p>
      ) : null}

      {isBatchLoading && <PulseLoader color="green" />}

      {isBatchError && !isBatchLoading ? (
        <p>{batchError?.data?.message ?? "Failed to Load Batch Details"}</p>
      ) : null}
    </>
  );
};

export default SingleBatchPage;
