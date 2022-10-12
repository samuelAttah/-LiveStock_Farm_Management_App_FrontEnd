import { useEffect, useState } from "react";
import dayjs from "dayjs";
import CreateMortalityPageExcerpt from "./CreateMortalityPageExcerpt";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import { useAddNewMortalityMutation } from "./mortalityApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CreateMortalityPage = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    drugName: "",
    numberDead: "",
    deathReason: "",
  });

  const [fetchError, setFetchError] = useState("");

  const [stateBatch, setStateBatch] = useState({});

  const [deathDate, setDeathDate] = useState(dayjs());

  const [createMortality, { isLoading, isError, error, isSuccess }] =
    useAddNewMortalityMutation();

  const canSave = [formData.numberDead, formData.deathReason, deathDate].every(
    Boolean
  );

  const { batch } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data }) => ({
      batch: data?.entities[batchId],
    }),
  });

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
      navigate(`/batch/${batchId}/mortalities`, { replace: true });
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
      numberDead: Number(formData.numberDead),
      deathReason: formData.deathReason,
      deathDate: deathDate.format("YYYY-MM-DD"),
      batchId: batchId,
    };
    console.log("payLoad", payLoad);
    try {
      await createMortality(payLoad);
    } catch (error) {
      setFetchError(error?.data?.message);
    }
  };

  return stateBatch?.isActive ? (
    <CreateMortalityPageExcerpt
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      canSave={canSave}
      deathDate={deathDate}
      setDeathDate={setDeathDate}
      isLoading={isLoading}
      fetchError={fetchError}
    />
  ) : (
    <p>Inactive Batches Can't Create New Details </p>
  );
};

export default CreateMortalityPage;
