import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetOtherExpensesQuery,
  useDeleteOtherExpenseMutation,
} from "./otherExpensesApiSlice";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import SingleOtherExpensePageExcerpt from "./SingleOtherExpensePageExcerpt";
import { toast } from "react-toastify";

const SingleOtherExpensePage = () => {
  const { expenseId, batchId } = useParams();
  const navigate = useNavigate();

  const [stateExpense, setStateExpense] = useState({});
  const [stateError, setStateError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createdDate, setCreatedDate] = useState(String);
  const [purchasedDate, setPurchasedDate] = useState(String);
  const [cost, setCost] = useState(String);

  const { expense } = useGetOtherExpensesQuery(batchId, {
    selectFromResult: ({ data }) => ({
      expense: data?.entities[expenseId],
    }),
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  console.log("expenseOject", expense);

  const { batch } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data }) => ({
      batch: data?.entities[batchId],
    }),
  });

  const [deleteExpense, { isLoading }] = useDeleteOtherExpenseMutation();

  useEffect(() => {
    setLoading(true);
    if (expense && batch) {
      setStateExpense(expense);

      setCreatedDate(expense?.createdAt);
      setPurchasedDate(expense?.datePurchased);

      const formattedCost = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: batch?.currency ?? "USD",
      }).format(Object.values(expense?.amountPurchased)[0]);

      setCost(formattedCost);

      setStateError(false);

      setLoading(false);
    } else {
      setStateError(true);
      setLoading(false);
    }
    return () => setStateError(false);
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
    <div>
      {stateExpense && !stateError ? (
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
      {!loading && stateError ? <p>Expense Does not exist</p> : null}
    </div>
  );
};

export default SingleOtherExpensePage;
