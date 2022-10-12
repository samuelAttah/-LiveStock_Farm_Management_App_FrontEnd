import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import {
  useGetAnimalSalesQuery,
  useDeleteAnimalSaleMutation,
} from "./animalSaleApiSlice";
import SingleAnimalSalePageExcerpt from "./SingleAnimalSalePageExcerpt";

const SingleAnimalSalePage = () => {
  const { animalSaleId, batchId } = useParams();
  const navigate = useNavigate();

  const [stateAnimalSale, setStateAnimalSale] = useState({});
  const [stateError, setStateError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createdDate, setCreatedDate] = useState(String);
  const [dateSold, setDateSold] = useState(String);
  const [costPerUnit, setCostPerUnit] = useState(String);
  const [totalCost, setTotalCost] = useState(String);

  const { animalSale } = useGetAnimalSalesQuery(batchId, {
    selectFromResult: ({ data }) => ({
      revenue: data?.entities[animalSaleId],
    }),
    refetchOnMountOrArgChange: true,
  });

  const { batch } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data }) => ({
      batch: data?.entities[batchId],
    }),
  });

  const [deleteAnimalSale, { isLoading }] = useDeleteAnimalSaleMutation();

  useEffect(() => {
    setLoading(true);
    if (animalSale && batch) {
      setStateAnimalSale(animalSale);

      setCreatedDate(animalSale?.createdAt);
      setDateSold(animalSale?.dateSold);

      const formattedCostPerUnit = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: batch?.currency,
      }).format(Object.values(animalSale?.costPerUnit)[0]);

      const formattedTotalCost = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: batch?.currency,
      }).format(Object.values(animalSale?.totalCost)[0]);

      setCostPerUnit(formattedCostPerUnit);
      setTotalCost(formattedTotalCost);

      setStateError(false);

      setLoading(false);
    } else {
      setStateError(true);
      setLoading(false);
    }
    return () => setStateError(false);
  }, [animalSale, batch]);

  const handleClick = () => {
    navigate(`/batch/${batchId}/animalsales/${animalSaleId}/edit`);
  };

  const handleDelete = async () => {
    const payLoad = {
      batchId: batchId,
      animalSaleId: animalSaleId,
    };

    try {
      await deleteAnimalSale(payLoad).unwrap();
      navigate(`/batch/${batchId}/animalsales`, { replace: true });
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
      {stateAnimalSale && !stateError ? (
        <SingleAnimalSalePageExcerpt
          stateAnimalSale={stateAnimalSale}
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

export default SingleAnimalSalePage;
