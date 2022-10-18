import { useEffect, useState } from "react";
import dayjs from "dayjs";
import EditOtherExpensePageExcerpt from "./EditOtherExpensePageExcerpt";
import {
  useGetOtherExpensesQuery,
  useUpdateOtherExpenseMutation,
} from "./otherExpensesApiSlice";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";

const EditOtherExpensePage = () => {
  const { batchId, expenseId } = useParams();
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
  });

  const [formData, setFormData] = useState({
    itemName: "",
    cost: "",
  });

  const [fetchError, setFetchError] = useState("");

  const [stateBatch, setStateBatch] = useState({});

  const [datePurchased, setDatePurchased] = useState(dayjs());

  const [updateOtherExpense, { isLoading, isError, error, isSuccess }] =
    useUpdateOtherExpenseMutation();

  const canSave = [formData.itemName, formData.cost, datePurchased].every(
    Boolean
  );

  useEffect(() => {
    if (Object.keys(batch)?.length && Object.keys(expense)?.length) {
      setStateBatch(batch);
      setFormData({
        itemName: expense?.itemName,
        cost: Number(Object.values(expense?.amountPurchased)[0]),
      });
      setDatePurchased(dayjs(expense?.datePurchased.split("T")[0]));
    }
  }, [batch, expense]);

  useEffect(() => {
    if (isError) {
      setFetchError(error?.data?.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Edited Successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      navigate(`/batch/${batchId}/otherexpenses/${expenseId}`, {
        replace: true,
      });
    }
  }, [isSuccess, navigate, batchId, expenseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payLoad = {
      itemName: formData.itemName,
      amountPurchased: formData.cost,
      datePurchased: datePurchased.format("YYYY-MM-DD"),
      batchId: batchId,
      expenseId: expenseId,
    };

    try {
      await updateOtherExpense(payLoad).unwrap();
    } catch (error) {
      setFetchError(error?.data.message);
    }
  };

  return (
    <>
      {isBatchSuccess &&
      isExpenseSuccess &&
      Object.keys(stateBatch)?.length &&
      Object.keys(expense)?.length &&
      stateBatch?.isActive ? (
        <EditOtherExpensePageExcerpt
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          canSave={canSave}
          datePurchased={datePurchased}
          setDatePurchased={setDatePurchased}
          stateBatch={stateBatch}
          isLoading={isLoading}
          fetchError={fetchError}
        />
      ) : null}

      {isBatchSuccess &&
      isExpenseSuccess &&
      Object.keys(stateBatch)?.length &&
      Object.keys(expense)?.length &&
      !stateBatch?.isActive ? (
        <p>Inactive Batches Can't Update Details</p>
      ) : null}

      {isBatchSuccess &&
      isExpenseSuccess &&
      !Object.keys(stateBatch)?.length &&
      !Object.keys(expense)?.length ? (
        <p>This Expense Does not exist</p>
      ) : null}

      {isBatchLoading || isExpenseLoading ? (
        <PulseLoader color="green" />
      ) : null}

      {!isBatchLoading && isBatchError ? (
        <p>{batchError?.data?.message ?? "Failed to Load Batch Details"}</p>
      ) : null}

      {!isExpenseLoading && isExpenseError ? (
        <p>{expenseError?.data?.message ?? "Failed to Load Expense Details"}</p>
      ) : null}
    </>
  );
};

export default EditOtherExpensePage;
