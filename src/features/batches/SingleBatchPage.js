import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBatchesQuery, useDeleteBatchMutation } from "./batchApiSlice";
import SIngleBatchPageExcerpt from "./SIngleBatchPageExcerpt";
import { toast } from "react-toastify";
const SingleBatchPage = () => {
  const { batchId } = useParams();

  const navigate = useNavigate();

  const [stateBatch, setStateBatch] = useState([]);
  const [stateError, setStateError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createdDate, setCreatedDate] = useState(String);
  const [costPerUnit, setCostPerUnit] = useState(String);
  const [totalPurchaseCost, setTotalPurchaseCost] = useState(String);

  const { batch } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data }) => ({
      batch: data?.entities[batchId],
    }),
    refetchOnMountOrArgChange: true,
  });

  const [deleteBatch, { isLoading }] = useDeleteBatchMutation();

  useEffect(() => {
    setLoading(true);
    if (batch) {
      setStateBatch(batch);

      setCreatedDate(batch.createdAt);

      const formattedTotalPurchaseCost = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: batch.currency ?? "USD",
      }).format(Object.values(batch.totalPurchaseCost)[0]);

      const formattedCostPerUnit = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: batch.currency ?? "USD",
      }).format(Object.values(batch.costPerUnit)[0]);

      setTotalPurchaseCost(formattedTotalPurchaseCost);

      setCostPerUnit(formattedCostPerUnit);

      setStateError(false);

      setLoading(false);
    } else {
      setStateError(true);
      setLoading(false);
    }
    return () => setStateError(false);
  }, [batch]);

  const handleClick = () => {
    navigate(`/batch/${batchId}/edit`);
  };

  const handleDelete = async () => {
    try {
      await deleteBatch({ id: batchId }).unwrap();
      navigate("/dashboard", { replace: true });
      toast.success("Deleted Successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    } catch (error) {
      console.log("error", error?.data?.message);
      toast.error("Failed to Delete", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
    }
  };
  return (
    <div>
      {stateBatch && !stateError ? (
        <SIngleBatchPageExcerpt
          stateBatch={stateBatch}
          costPerUnit={costPerUnit}
          totalPurchaseCost={totalPurchaseCost}
          createdDate={createdDate}
          handleClick={handleClick}
          handleDelete={handleDelete}
          isLoading={isLoading}
        />
      ) : null}
      {!loading && stateError ? <p>Batch Does not exist</p> : null}
    </div>
  );
};

export default SingleBatchPage;
