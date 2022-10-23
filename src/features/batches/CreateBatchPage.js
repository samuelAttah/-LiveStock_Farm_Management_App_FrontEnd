import { useEffect, useState } from "react";
import dayjs from "dayjs";
import CreateBatchPageExcerpt from "./CreateBatchPageExcerpt";
import { useAddNewBatchMutation } from "./batchApiSlice";
import countryCurrencyList from "../../common/utils/countryCurrencyList";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MenuItem from "@mui/material/MenuItem";
import farmAnimalsList from "../../common/utils/farmAnimalsList";
import useTitle from "../../common/hooks/useTitle";

const CreateBatchPage = () => {
  const navigate = useNavigate();
  useTitle("Farm Diary | Create Batch");

  const [formData, setFormData] = useState({
    animalType: "",
    numberPurchased: "",
    costPerUnit: "",
    batchTitle: "",
  });

  const [currency, setCurrency] = useState(countryCurrencyList[0]);

  const [datePurchased, setDatePurchased] = useState(dayjs());

  const [fetchError, setFetchError] = useState("");

  const [createBatch, { isLoading, isError, error, isSuccess }] =
    useAddNewBatchMutation();

  const canSave = [
    formData.animalType,
    formData.numberPurchased,
    formData.costPerUnit,
    formData.batchTitle,
    datePurchased,
  ].every(Boolean);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Created Successfully", {
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
      numberPurchased: formData.numberPurchased,
      costPerUnit: formData.costPerUnit,
      currency: currency.currencyCode,
      countryCode: currency.code,
      batchTitle: formData.batchTitle,
      datePurchased: datePurchased.format("YYYY-MM-DD"),
    };

    try {
      await createBatch(payLoad);
    } catch (error) {
      setFetchError(error?.data?.message);
    }
  };

  return (
    <CreateBatchPageExcerpt
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      currency={currency}
      setCurrency={setCurrency}
      datePurchased={datePurchased}
      setDatePurchased={setDatePurchased}
      canSave={canSave}
      isLoading={isLoading}
      fetchError={fetchError}
      animalTypeOptions={animalTypeOptions}
    />
  );
};

export default CreateBatchPage;
