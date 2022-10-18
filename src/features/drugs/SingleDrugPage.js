import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetDrugsQuery, useDeleteDrugMutation } from "./drugsApiSlice";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import SingleDrugPageExcerpt from "./SingleDrugPageExcerpt";
import { toast } from "react-toastify";

const SingleDrugPage = () => {
  const { drugId, batchId } = useParams();

  const navigate = useNavigate();

  const [stateDrug, setStateDrug] = useState({});

  const [createdDate, setCreatedDate] = useState(String);
  const [datePurchased, setDatePurchased] = useState(String);
  const [cost, setCost] = useState(String);

  const {
    drug = {},
    isError: isDrugError,
    isLoading: isDrugLoading,
    isSuccess: isDrugSuccess,
    error: drugError,
  } = useGetDrugsQuery(batchId, {
    selectFromResult: ({ data, isError, isLoading, isSuccess, error }) => ({
      drug: data?.entities[drugId] ?? {},
      isError,
      isLoading,
      isSuccess,
      error,
    }),
  });

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

  const [deleteDrug, { isLoading }] = useDeleteDrugMutation();

  useEffect(() => {
    if (Object.keys(drug)?.length && Object.keys(batch)?.length) {
      setStateDrug(drug);

      setCreatedDate(drug.createdAt);
      setDatePurchased(drug.datePurchased);

      const formattedCost = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: batch.currency ?? "NGN",
      }).format(Object.values(drug.cost)[0]);

      setCost(formattedCost);
    }
  }, [drug, batch]);

  const handleClick = () => {
    navigate(`/batch/${batchId}/drugs/${drugId}/edit`);
  };

  const handleDelete = async () => {
    const payLoad = {
      batchId: batchId,
      drugId: drugId,
    };

    try {
      await deleteDrug(payLoad).unwrap();
      navigate(`/batch/${batchId}/drugs`, { replace: true });
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
      isDrugSuccess &&
      Object.keys(stateDrug)?.length &&
      Object.keys(batch)?.length ? (
        <SingleDrugPageExcerpt
          stateDrug={stateDrug}
          cost={cost}
          createdDate={createdDate}
          datePurchased={datePurchased}
          handleClick={handleClick}
          handleDelete={handleDelete}
          batch={batch}
          isLoading={isLoading}
        />
      ) : null}

      {!isBatchLoading &&
      !isDrugLoading &&
      !isBatchError &&
      !isDrugError &&
      !Object.keys(stateDrug)?.length ? (
        <p>Drug Does not exist</p>
      ) : null}

      {!isBatchLoading && !isDrugLoading && isBatchError ? (
        <p>{batchError?.data?.message ?? "Failed to Load Batch Details"}</p>
      ) : null}

      {!isBatchLoading && !isDrugLoading && isDrugError ? (
        <p>{drugError?.data?.message ?? "Failed to Load Drug Details"}</p>
      ) : null}
    </div>
  );
};

export default SingleDrugPage;
