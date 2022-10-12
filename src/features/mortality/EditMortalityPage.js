import { useEffect, useState } from "react";
import dayjs from "dayjs";
import EditMortalityPageExcerpt from "./EditMortalityPageExcerpt";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import {
  useGetMortalitysQuery,
  useUpdateMortalityMutation,
} from "./mortalityApiSlice";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditMortalityPage = () => {
  const { batchId, mortalityId } = useParams();
  const navigate = useNavigate();

  const { batch } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data }) => ({
      batch: data?.entities[batchId],
    }),
  });

  const { mortality } = useGetMortalitysQuery(batchId, {
    selectFromResult: ({ data }) => ({
      mortality: data?.entities[mortalityId],
    }),
  });

  const [formData, setFormData] = useState({
    numberDead: "",
    deathReason: "",
  });

  const [stateBatch, setStateBatch] = useState({});

  const [fetchError, setFetchError] = useState("");

  const [deathDate, setDeathDate] = useState(dayjs());

  const [updateMortality, { isLoading, isError, error, isSuccess }] =
    useUpdateMortalityMutation();

  const canSave = [formData.numberDead, formData.deathReason, deathDate].every(
    Boolean
  );

  useEffect(() => {
    if (batch) {
      setStateBatch(batch);
    }
  }, [batch]);

  useEffect(() => {
    if (mortality) {
      setFormData({
        numberDead: Number(mortality?.numberDead),
        deathReason: mortality?.deathReason,
      });
      setDeathDate(dayjs(mortality?.deathDate.split("T")[0]));
    }
  }, [mortality]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Edited Successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      navigate(`/batch/${batchId}/mortalities/${mortalityId}`, {
        replace: true,
      });
    }
  }, [isSuccess, navigate, batchId, mortalityId]);

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
      mortalityId: mortalityId,
    };

    try {
      await updateMortality(payLoad);
    } catch (error) {
      setFetchError(error?.data?.message);
    }
  };

  return stateBatch?.isActive ? (
    <EditMortalityPageExcerpt
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
    <p>Inactive Batches Can't Update Details</p>
  );
};

export default EditMortalityPage;
