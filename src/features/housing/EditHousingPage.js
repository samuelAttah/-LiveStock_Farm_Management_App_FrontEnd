import { useEffect, useState } from "react";
import dayjs from "dayjs";
import EditHousingPageExcerpt from "./EditHousingPageExcerpt";
import {
  useUpdateHousingMutation,
  useGetHousingsQuery,
} from "./housingApiSlice";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditHousingPage = () => {
  const { batchId, housingId } = useParams();
  const navigate = useNavigate();

  const { batch } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data }) => ({
      batch: data?.entities[batchId],
    }),
  });

  const { house } = useGetHousingsQuery(batchId, {
    selectFromResult: ({ data }) => ({
      house: data?.entities[housingId],
    }),
  });

  const [formData, setFormData] = useState({
    housingType: "",
    cost: "",
    description: "",
  });

  const [fetchError, setFetchError] = useState("");

  const [stateBatch, setStateBatch] = useState({});

  const [datePurchased, setDatePurchased] = useState(dayjs());

  const [updateHousing, { isLoading, isError, error, isSuccess }] =
    useUpdateHousingMutation();

  const canSave = [
    formData.housingType,
    formData.cost,
    formData.description,
    datePurchased,
  ].every(Boolean);

  useEffect(() => {
    if (batch && house) {
      setStateBatch(batch);
      setFormData({
        housingType: house?.housingType,
        cost: Number(Object.values(house?.cost)[0]),
        description: house?.description,
      });
      setDatePurchased(dayjs(house?.datePurchased.split("T")[0]));
    }
  }, [batch, house]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Edited Successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      navigate(`/batch/${batchId}/housings/${housingId}`, { replace: true });
    }
  }, [isSuccess, navigate, batchId, housingId]);

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
      housingId: housingId,
    };
    console.log("payLoad", payLoad);
    try {
      await updateHousing(payLoad);
    } catch (error) {
      setFetchError(error.message);
    }
  };

  return stateBatch?.isActive ? (
    <EditHousingPageExcerpt
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
    <p>Inactive Batches Can not be Updated</p>
  );
};

export default EditHousingPage;
