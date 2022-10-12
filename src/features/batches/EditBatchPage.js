import { useEffect, useState } from "react";
import EditBatchPageExcerpt from "./EditBatchPageExcerpt";
import { useUpdateBatchMutation, useGetBatchesQuery } from "./batchApiSlice";
import countryCurrencyList from "../../common/utils/countryCurrencyList";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import farmAnimalsList from "../../common/utils/farmAnimalsList";
import dayjs from "dayjs";

const EditBatchPage = () => {
  const navigate = useNavigate();

  const { batchId } = useParams();

  const [formData, setFormData] = useState({
    animalType: "",
    numberPurchased: "",
    costPerUnit: "",
    batchTitle: "",
  });

  const { batch } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data }) => ({
      batch: data?.entities[batchId],
    }),
  });

  const [currency, setCurrency] = useState(countryCurrencyList[0]);

  const [datePurchased, setDatePurchased] = useState(dayjs());

  const [stateBatch, setStateBatch] = useState();

  const [fetchError, setFetchError] = useState("");

  const [editBatch, { isLoading, isError, error, isSuccess }] =
    useUpdateBatchMutation();

  const canSave = [
    formData.animalType,
    formData.numberPurchased,
    formData.costPerUnit,
    formData.batchTitle,
  ].every(Boolean);

  useEffect(() => {
    if (batch) {
      setStateBatch(batch);
      const currencyEntry = countryCurrencyList.find(
        (currency) => currency.code === batch.countryCode
      );
      setFormData({
        animalType: batch?.animalType,
        numberPurchased: Number(batch?.numberPurchased),
        costPerUnit: Number(Object.values(batch?.costPerUnit)[0]),
        batchTitle: batch.batchTitle,
      });
      setCurrency(currencyEntry);
      setDatePurchased(dayjs(batch?.datePurchased.split("T")[0]));
    }
  }, [batch]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Edited Successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      navigate("/dashboard", { replace: true });
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      setFetchError(error?.data?.message);
    }
  }, [isError, error]);

  const animalTypeOptions = farmAnimalsList.map((animal) => (
    <MenuItem value={animal.name} key={animal.name}>
      {animal.name}
    </MenuItem>
  ));

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payLoad = {
      animalType: formData.animalType,
      numberPurchased: Number(formData.numberPurchased),
      costPerUnit: formData.costPerUnit,
      currency: currency.currencyCode,
      batchTitle: formData.batchTitle,
      id: batchId,
      isActive: batch.isActive,
      datePurchased: datePurchased.format("YYYY-MM-DD"),
    };

    console.log("payLoad", payLoad);
    try {
      await editBatch(payLoad);
    } catch (error) {
      setFetchError(error?.data?.message);
    }
  };

  return batch?.isActive ? (
    <EditBatchPageExcerpt
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      currency={currency}
      setCurrency={setCurrency}
      canSave={canSave}
      isLoading={isLoading}
      fetchError={fetchError}
      stateBatch={stateBatch}
      animalTypeOptions={animalTypeOptions}
      datePurchased={datePurchased}
      setDatePurchased={setDatePurchased}
    />
  ) : (
    <p>Inactive Batches Can not be Updated </p>
  );
};

export default EditBatchPage;
