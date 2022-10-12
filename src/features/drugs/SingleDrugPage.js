import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetDrugsQuery, useDeleteDrugMutation } from "./drugsApiSlice";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import SingleDrugPageExcerpt from "./SingleDrugPageExcerpt";
import { toast } from "react-toastify";

const SingleDrugPage = () => {
  const { drugId, batchId } = useParams();

  const navigate = useNavigate();

  const [stateDrug, setStateDrug] = useState({});
  const [stateError, setStateError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createdDate, setCreatedDate] = useState(String);
  const [datePurchased, setDatePurchased] = useState(String);
  const [cost, setCost] = useState(String);

  const { drug } = useGetDrugsQuery(batchId, {
    selectFromResult: ({ data }) => ({
      drug: data?.entities[drugId],
    }),
    refetchOnMountOrArgChange: true,
  });

  const { batch } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data }) => ({
      batch: data?.entities[batchId],
    }),
  });

  const [deleteDrug, { isLoading }] = useDeleteDrugMutation();

  useEffect(() => {
    setLoading(true);
    if (drug && batch) {
      setStateDrug(drug);
      console.log("indrug", drug);

      setCreatedDate(drug.createdAt);
      setDatePurchased(drug.datePurchased);

      const formattedCost = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: batch.currency ?? "NGN",
      }).format(Object.values(drug.cost)[0]);

      setCost(formattedCost);

      setStateError(false);

      setLoading(false);
    } else {
      setStateError(true);
      setLoading(false);
    }
    return () => setStateError(false);
  }, [drug, batch]);

  const handleClick = () => {
    navigate(`/batch/${batchId}/drugs/${drugId}/edit`);
  };

  const handleDelete = async () => {
    const payLoad = {
      batchId: batchId,
      drugId: drugId,
    };

    try {
      await deleteDrug(payLoad).unwrap();
      navigate(`/batch/${batchId}/drugs`, { replace: true });
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
      {stateDrug && !stateError ? (
        <SingleDrugPageExcerpt
          stateDrug={stateDrug}
          cost={cost}
          createdDate={createdDate}
          datePurchased={datePurchased}
          handleClick={handleClick}
          handleDelete={handleDelete}
          batch={batch}
          isLoading={isLoading}
        />
      ) : null}
      {!loading && stateError ? <p>Drug Does not exist</p> : null}
    </div>
  );
};

export default SingleDrugPage;
