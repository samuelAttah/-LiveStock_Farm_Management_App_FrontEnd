import { useEffect, useState } from "react";
import dayjs from "dayjs";
import EditDrugPageExcerpt from "./EditDrugPageExcerpt";
import { useGetDrugsQuery, useUpdateDrugMutation } from "./drugsApiSlice";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditDrugPage = () => {
  const { batchId, drugId } = useParams();
  const navigate = useNavigate();

  const { batch } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data }) => ({
      batch: data?.entities[batchId],
    }),
  });

  const { drug } = useGetDrugsQuery(batchId, {
    selectFromResult: ({ data }) => ({
      drug: data?.entities[drugId],
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
    if (drug) {
      setFormData({
        drugName: drug.drugName,
        cost: Number(Object.values(drug.cost)[0]),
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
    console.log("payLoad", payLoad);
    try {
      await editDrug(payLoad);
    } catch (error) {
      setFetchError(error?.data?.message);
    }
  };

  return batch?.isActive ? (
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
  ) : (
    <p>Inactive Batches Can not be Updated</p>
  );
};

export default EditDrugPage;
