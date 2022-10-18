import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import {
  useGetRevenuesQuery,
  useDeleteRevenueMutation,
} from "./revenueApiSlice";
import SingleRevenuePageExcerpt from "./SingleRevenuePageExcerpt";
import PulseLoader from "react-spinners/PulseLoader";

const SingleRevenuePage = () => {
  const { revenueId, batchId } = useParams();
  const navigate = useNavigate();

  const [stateRevenue, setStateRevenue] = useState({});
  const [createdDate, setCreatedDate] = useState(String);
  const [dateSold, setDateSold] = useState(String);
  const [costPerUnit, setCostPerUnit] = useState(String);
  const [totalCost, setTotalCost] = useState(String);

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
    revenue = {},
    isLoading: isRevenueLoading,
    isError: isRevenueError,
    isSuccess: isRevenueSuccess,
    error: revenueError,
  } = useGetRevenuesQuery(batchId, {
    selectFromResult: ({ data, isLoading, isError, isSuccess, error }) => ({
      revenue: data?.entities[revenueId],
      isLoading,
      isError,
      isSuccess,
      error,
    }),
  });

  const [deleteRevenue, { isLoading }] = useDeleteRevenueMutation();

  useEffect(() => {
    if (Object.keys(revenue)?.length && Object.keys(batch)?.length) {
      setStateRevenue(revenue);
      setCreatedDate(revenue?.createdAt);
      setDateSold(revenue?.dateSold);

      const formattedCostPerUnit = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: batch?.currency,
      }).format(Object.values(revenue.costPerUnit)[0]);

      const formattedTotalCost = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: batch?.currency,
      }).format(Object.values(revenue?.totalCost)[0]);

      setCostPerUnit(formattedCostPerUnit);
      setTotalCost(formattedTotalCost);
    }
  }, [revenue, batch]);

  const handleClick = () => {
    navigate(`/batch/${batchId}/revenues/${revenueId}/edit`);
  };

  const handleDelete = async () => {
    const payLoad = {
      batchId: batchId,
      revenueId: revenueId,
    };

    try {
      await deleteRevenue(payLoad).unwrap();
      navigate(`/batch/${batchId}/revenues`, { replace: true });
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
    <>
      {isBatchSuccess &&
      isRevenueSuccess &&
      Object.keys(stateRevenue)?.length &&
      Object.keys(batch)?.length ? (
        <SingleRevenuePageExcerpt
          stateRevenue={stateRevenue}
          costPerUnit={costPerUnit}
          createdDate={createdDate}
          totalCost={totalCost}
          dateSold={dateSold}
          batch={batch}
          handleClick={handleClick}
          handleDelete={handleDelete}
          isLoading={isLoading}
        />
      ) : null}

      {!isBatchLoading &&
      !isRevenueLoading &&
      isBatchSuccess &&
      isRevenueSuccess &&
      Object.keys(batch)?.length &&
      !Object.keys(revenue)?.length ? (
        <p>Revenue Does not exist</p>
      ) : null}

      {isBatchLoading || isRevenueLoading ? (
        <PulseLoader color="green" />
      ) : null}

      {!isBatchLoading && isBatchError ? (
        <p>{batchError?.data?.message ?? "Failed to Load Batch Details"}</p>
      ) : null}

      {!isRevenueLoading && isRevenueError ? (
        <p>{revenueError?.data?.message ?? "Failed to Load Revenue Details"}</p>
      ) : null}
    </>
  );
};

export default SingleRevenuePage;
