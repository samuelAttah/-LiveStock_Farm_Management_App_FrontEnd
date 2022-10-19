import { useEffect, useState } from "react";
import dayjs from "dayjs";
import EditDrugPageExcerpt from "./EditDrugPageExcerpt";
import { useGetDrugsQuery, useUpdateDrugMutation } from "./drugsApiSlice";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";

const EditDrugPage = () => {
  const { batchId, drugId } = useParams();
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

  const [formData, setFormData] = useState({
    drugName: "",
    cost: "",
    purchaseReason: "",
  });

  const [fetchError, setFetchError] = useState("");

  const [datePurchased, setDatePurchased] = useState(dayjs());

  const [editDrug, { isLoading, isError, error, isSuccess }] =
    useUpdateDrugMutation();

  const canSave = [
    formData.drugName,
    formData.cost,
    formData.purchaseReason,
    datePurchased,
  ].every(Boolean);

  useEffect(() => {
    if (Object.keys(drug).length) {
      setFormData({
        drugName: drug.drugName,
        cost: Number(Object.values(drug?.cost)[0]),
        purchaseReason: drug.purchaseReason,
      });

      setDatePurchased(dayjs(drug?.datePurchased.split("T")[0]));
    }
  }, [drug]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Edited Successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      navigate(`/batch/${batchId}/drugs/${drugId}`, { replace: true });
    }
  }, [isSuccess, navigate, batchId, drugId]);

  useEffect(() => {
    if (isError) {
      setFetchError(error?.data?.message);
    }
  }, [isError, error]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payLoad = {
      drugName: formData.drugName,
      purchaseReason: formData.purchaseReason,
      cost: formData.cost,
      datePurchased: datePurchased.format("YYYY-MM-DD"),
      drugId: drugId,
      batchId: batchId,
    };

    try {
      await editDrug(payLoad);
    } catch (error) {
      setFetchError(error?.data?.message);
    }
  };

  return (
    <>
      {!isBatchLoading &&
      isBatchSuccess &&
      !isDrugLoading &&
      isDrugSuccess &&
      Object.keys(batch)?.length &&
      Object.keys(drug)?.length &&
      batch?.isActive ? (
        <EditDrugPageExcerpt
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          canSave={canSave}
          datePurchased={datePurchased}
          setDatePurchased={setDatePurchased}
          batch={batch}
          isLoading={isLoading}
          fetchError={fetchError}
        />
      ) : null}

      {!isBatchLoading &&
      isBatchSuccess &&
      !isDrugLoading &&
      isDrugSuccess &&
      Object.keys(batch)?.length &&
      Object.keys(drug)?.length &&
      !batch?.isActive ? (
        <p>Inactive Batches Can't be Updated</p>
      ) : null}

      {!isBatchLoading &&
      isBatchSuccess &&
      !isDrugLoading &&
      isDrugSuccess &&
      Object.keys(batch)?.length &&
      !Object.keys(drug)?.length ? (
        <p>Drug Does not Exist</p>
      ) : null}

      {isBatchLoading || isDrugLoading ? <PulseLoader color="green" /> : null}

      {!isBatchLoading && !isDrugLoading && isDrugError ? (
        <p>{drugError?.data?.message}</p>
      ) : null}

      {!isBatchLoading && !isDrugLoading && isBatchError ? (
        <p>{batchError?.data?.message}</p>
      ) : null}
    </>
  );
};

export default EditDrugPage;
