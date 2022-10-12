import { useEffect, useState } from "react";
import dayjs from "dayjs";
import CreateOtherExpensePageExcerpt from "./CreateOtherExpensePageExcerpt";
import { useAddNewOtherExpenseMutation } from "./otherExpensesApiSlice";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CreateOtherExpensePage = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();

  const { batch } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data }) => ({
      batch: data?.entities[batchId],
    }),
  });

  const [formData, setFormData] = useState({
    itemName: "",
    cost: "",
  });

  const [fetchError, setFetchError] = useState("");

  const [stateBatch, setStateBatch] = useState({});

  const [datePurchased, setDatePurchased] = useState(dayjs());

  const [createOtherExpense, { isLoading, isError, error, isSuccess }] =
    useAddNewOtherExpenseMutation();

  const canSave = [formData.itemName, formData.cost, datePurchased].every(
    Boolean
  );

  useEffect(() => {
    if (batch) {
      setStateBatch(batch);
    }
  }, [batch]);

  useEffect(() => {
    if (isError) {
      setFetchError(error?.data?.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Created Successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      navigate(`/batch/${batchId}/otherexpenses`, { replace: true });
    }
  }, [isSuccess, navigate, batchId]);

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
    };

    try {
      await createOtherExpense(payLoad).unwrap();
    } catch (error) {
      setFetchError(error?.data.message);
    }
  };

  return stateBatch?.isActive ? (
    <CreateOtherExpensePageExcerpt
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
    <p>InActive Batches Can't Create New Details</p>
  );
};

export default CreateOtherExpensePage;
