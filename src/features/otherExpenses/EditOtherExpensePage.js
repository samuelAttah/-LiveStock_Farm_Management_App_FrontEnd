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

const EditOtherExpensePage = () => {
  const { batchId, expenseId } = useParams();
  const navigate = useNavigate();

  const { batch } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data }) => ({
      batch: data?.entities[batchId],
    }),
  });

  const { expense } = useGetOtherExpensesQuery(batchId, {
    selectFromResult: ({ data }) => ({
      expense: data?.entities[expenseId],
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
    if (batch && expense) {
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
    console.log("payLoad", payLoad);
    try {
      await updateOtherExpense(payLoad).unwrap();
    } catch (error) {
      setFetchError(error?.data.message);
    }
  };

  return stateBatch?.isActive ? (
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
  ) : (
    <p>Inactive Batches Can't Update Details</p>
  );
};

export default EditOtherExpensePage;
