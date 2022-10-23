import { useEffect, useState } from "react";
import dayjs from "dayjs";
import CreateOtherExpensePageExcerpt from "./CreateOtherExpensePageExcerpt";
import { useAddNewOtherExpenseMutation } from "./otherExpensesApiSlice";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";
import useTitle from "../../common/hooks/useTitle";

const CreateOtherExpensePage = () => {
  useTitle("Farm Diary | New Miscellaneous Expense");
  const { batchId } = useParams();
  const navigate = useNavigate();

  //RTK QUERY FOR FETCHING BATCH
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

  //MANAGING COMPONENT STATE
  const [formData, setFormData] = useState({
    itemName: "",
    cost: "",
  });

  const [fetchError, setFetchError] = useState("");

  const [stateBatch, setStateBatch] = useState({});

  const [datePurchased, setDatePurchased] = useState(dayjs());

  //RTK QUERY FOR MUTATION
  const [createOtherExpense, { isLoading, isError, error, isSuccess }] =
    useAddNewOtherExpenseMutation();

  const canSave = [formData.itemName, formData.cost, datePurchased].every(
    Boolean
  );

  useEffect(() => {
    if (Object.keys(batch)?.length) {
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

    setFetchError("");
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

  return (
    <>
      {isBatchSuccess &&
      Object.keys(stateBatch)?.length &&
      stateBatch?.isActive ? (
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
      ) : null}

      {!isBatchLoading &&
      isBatchSuccess &&
      Object.keys(stateBatch)?.length &&
      !stateBatch?.isActive ? (
        <p>Inactive Batches Can't Create New Details</p>
      ) : null}

      {isBatchLoading && <PulseLoader color="green" />}

      {!isBatchLoading && isBatchError ? (
        <p>{batchError?.data?.message ?? "Failed to Load Batch Details"}</p>
      ) : null}
    </>
  );
};

export default CreateOtherExpensePage;
