import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import {
  useGetRevenuesQuery,
  useDeleteRevenueMutation,
} from "./revenueApiSlice";
import SingleRevenuePageExcerpt from "./SingleRevenuePageExcerpt";

const SingleRevenuePage = () => {
  const { revenueId, batchId } = useParams();
  const navigate = useNavigate();

  const [stateRevenue, setStateRevenue] = useState({});
  const [stateError, setStateError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createdDate, setCreatedDate] = useState(String);
  const [dateSold, setDateSold] = useState(String);
  const [costPerUnit, setCostPerUnit] = useState(String);
  const [totalCost, setTotalCost] = useState(String);

  const { revenue } = useGetRevenuesQuery(batchId, {
    selectFromResult: ({ data }) => ({
      revenue: data?.entities[revenueId],
    }),
    refetchOnMountOrArgChange: true,
  });

  const { batch } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data }) => ({
      batch: data?.entities[batchId],
    }),
  });

  const [deleteRevenue, { isLoading }] = useDeleteRevenueMutation();

  useEffect(() => {
    setLoading(true);
    if (revenue && batch) {
      setStateRevenue(revenue);

      setCreatedDate(revenue?.createdAt);
      setDateSold(revenue?.dateSold);

      const formattedCostPerUnit = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: batch?.currency,
      }).format(Object.values(revenue.costPerUnit)[0]);

      const formattedTotalCost = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: batch?.currency,
      }).format(Object.values(revenue?.totalCost)[0]);

      setCostPerUnit(formattedCostPerUnit);
      setTotalCost(formattedTotalCost);

      setStateError(false);

      setLoading(false);
    } else {
      setStateError(true);
      setLoading(false);
    }
    return () => setStateError(false);
  }, [revenue, batch]);

  const handleClick = () => {
    navigate(`/batch/${batchId}/revenues/${revenueId}/edit`);
  };

  const handleDelete = async () => {
    const payLoad = {
      batchId: batchId,
      revenueId: revenueId,
    };

    try {
      await deleteRevenue(payLoad).unwrap();
      navigate(`/batch/${batchId}/revenues`, { replace: true });
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
      {stateRevenue && !stateError ? (
        <SingleRevenuePageExcerpt
          stateRevenue={stateRevenue}
          costPerUnit={costPerUnit}
          createdDate={createdDate}
          totalCost={totalCost}
          dateSold={dateSold}
          batch={batch}
          handleClick={handleClick}
          handleDelete={handleDelete}
          isLoading={isLoading}
        />
      ) : null}
      {!loading && stateError ? <p>Revenue Does not exist</p> : null}
    </div>
  );
};

export default SingleRevenuePage;
