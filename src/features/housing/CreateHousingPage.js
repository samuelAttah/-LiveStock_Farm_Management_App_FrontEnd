import { useEffect, useState } from "react";
import dayjs from "dayjs";
import CreateHousingPageExcerpt from "./CreateHousingPageExcerpt";
import { useAddNewHousingMutation } from "./housingApiSlice";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CreateHousingPage = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();

  const { batch } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data }) => ({
      batch: data?.entities[batchId],
    }),
  });

  console.log("batch", batch);

  const [formData, setFormData] = useState({
    housingType: "",
    cost: "",
    description: "",
  });

  const [fetchError, setFetchError] = useState("");

  const [stateBatch, setStateBatch] = useState({});

  const [datePurchased, setDatePurchased] = useState(dayjs());

  const [createHousing, { isLoading, isError, error, isSuccess }] =
    useAddNewHousingMutation();

  const canSave = [
    formData.housingType,
    formData.cost,
    formData.description,
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
      navigate(`/batch/${batchId}/housings`, { replace: true });
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
      housingType: formData.housingType,
      description: formData.description,
      cost: formData.cost,
      datePurchased: datePurchased.format("YYYY-MM-DD"),
      batchId: batchId,
    };
    console.log("payLoad", payLoad);
    try {
      await createHousing(payLoad);
    } catch (error) {
      setFetchError(error.message);
    }
  };

  return stateBatch?.isActive ? (
    <CreateHousingPageExcerpt
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
    <p>Inactive Batches Can't Create New Details</p>
  );
};

export default CreateHousingPage;
