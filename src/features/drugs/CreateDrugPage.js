import { useEffect, useState } from "react";
import dayjs from "dayjs";
import CreateDrugPageExcerpt from "./CreateDrugPageExcerpt";
import { useAddNewDrugMutation } from "./drugsApiSlice";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import countryCurrencyList from "../../common/utils/countryCurrencyList";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CreateDrugPage = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();

  const { batch } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data }) => ({
      batch: data?.entities[batchId],
    }),
  });

  console.log("batch", batch);

  const [formData, setFormData] = useState({
    drugName: "",
    cost: "",
    purchaseReason: "",
  });

  const [currency, setCurrency] = useState(countryCurrencyList[0]);

  const [fetchError, setFetchError] = useState("");

  const [stateBatch, setStateBatch] = useState();

  //   console.log("currency", currency);
  const [datePurchased, setDatePurchased] = useState(dayjs());
  //   console.log("datePurchased", datePurchased);

  const [createDrug, { isLoading, isError, error, isSuccess }] =
    useAddNewDrugMutation();

  const canSave = [
    formData.drugName,
    formData.cost,
    formData.purchaseReason,
    datePurchased,
  ].every(Boolean);

  useEffect(() => {
    if (batch) {
      setStateBatch(batch);
    }
  }, [batch]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Created Successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      navigate(`/batch/${batchId}/drugs`, { replace: true });
    }
  }, [isSuccess, navigate, batchId]);

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
      batchId: batchId,
    };
    console.log("payLoad", payLoad);
    try {
      await createDrug(payLoad);
    } catch (error) {
      setFetchError(error?.data?.message);
    }
  };

  return stateBatch?.isActive ? (
    <CreateDrugPageExcerpt
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      currency={currency}
      setCurrency={setCurrency}
      canSave={canSave}
      datePurchased={datePurchased}
      setDatePurchased={setDatePurchased}
      stateBatch={stateBatch}
      isLoading={isLoading}
      fetchError={fetchError}
    />
  ) : (
    <p>Inactive Batches Can't Create New Details</p>
  );
};

export default CreateDrugPage;
