import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetOtherExpensesQuery,
  useDeleteOtherExpenseMutation,
} from "./otherExpensesApiSlice";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import SingleOtherExpensePageExcerpt from "./SingleOtherExpensePageExcerpt";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";

const SingleOtherExpensePage = () => {
  const { expenseId, batchId } = useParams();
  const navigate = useNavigate();

  const [stateExpense, setStateExpense] = useState({});
  const [createdDate, setCreatedDate] = useState(String);
  const [purchasedDate, setPurchasedDate] = useState(String);
  const [cost, setCost] = useState(String);

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
    refetchOnMountOrArgChange: true,
  });

  const {
    expense = {},
    isLoading: isExpenseLoading,
    isError: isExpenseError,
    isSuccess: isExpenseSuccess,
    error: expenseError,
  } = useGetOtherExpensesQuery(batchId, {
    selectFromResult: ({ data, isLoading, isError, isSuccess, error }) => ({
      expense: data?.entities[expenseId],
      isLoading,
      isError,
      isSuccess,
      error,
    }),
    refetchOnMountOrArgChange: true,
  });

  const [deleteExpense, { isLoading }] = useDeleteOtherExpenseMutation();

  useEffect(() => {
    if (Object.keys(expense)?.length && Object.keys(batch)?.length) {
      setStateExpense(expense);

      setCreatedDate(expense?.createdAt);
      setPurchasedDate(expense?.datePurchased);

      const formattedCost = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: batch?.currency ?? "USD",
      }).format(Object.values(expense?.amountPurchased)[0]);

      setCost(formattedCost);
    }
  }, [expense, batch]);

  const handleClick = () => {
    navigate(`/batch/${batchId}/otherexpenses/${expenseId}/edit`);
  };

  const handleDelete = async () => {
    const payLoad = {
      batchId: batchId,
      expenseId: expenseId,
    };

    try {
      await deleteExpense(payLoad).unwrap();
      navigate(`/batch/${batchId}/otherexpenses`, { replace: true });
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
      isExpenseSuccess &&
      Object.keys(batch)?.length &&
      Object.keys(stateExpense)?.length ? (
        <SingleOtherExpensePageExcerpt
          stateExpense={stateExpense}
          cost={cost}
          createdDate={createdDate}
          purchasedDate={purchasedDate}
          batch={batch}
          handleClick={handleClick}
          handleDelete={handleDelete}
          isLoading={isLoading}
        />
      ) : null}

      {!Object.keys(stateExpense)?.length &&
      isBatchSuccess &&
      isExpenseSuccess &&
      Object.keys(batch)?.length ? (
        <p>Expense Does not exist</p>
      ) : null}

      {isBatchLoading || isExpenseLoading ? (
        <PulseLoader color="green" />
      ) : null}

      {!isBatchLoading && isBatchError ? (
        <p>{batchError?.data?.message ?? "Failed to Load Batch Details"}</p>
      ) : null}

      {!isExpenseLoading && isExpenseError ? (
        <p>
          {expenseError?.data?.message ?? "Failed to Load Mortality Details"}
        </p>
      ) : null}
    </>
  );
};

export default SingleOtherExpensePage;
