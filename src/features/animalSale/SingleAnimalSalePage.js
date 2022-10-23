import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import {
  useGetAnimalSalesQuery,
  useDeleteAnimalSaleMutation,
} from "./animalSaleApiSlice";
import SingleAnimalSalePageExcerpt from "./SingleAnimalSalePageExcerpt";
import useTitle from "../../common/hooks/useTitle";

const SingleAnimalSalePage = () => {
  useTitle("Farm Diary | Batch Animal Revenue");
  const { batchId, animalSaleId } = useParams();
  const navigate = useNavigate();

  const [stateAnimalSale, setStateAnimalSale] = useState({});
  const [stateError, setStateError] = useState("");
  const [createdDate, setCreatedDate] = useState(String);
  const [dateSold, setDateSold] = useState(String);
  const [costPerUnit, setCostPerUnit] = useState(String);
  const [totalCost, setTotalCost] = useState(String);

  const {
    animalSale = {},
    isError: isSaleError,
    isLoading: isSaleLoading,
    isSuccess: isSaleSuccess,
    error: saleError,
  } = useGetAnimalSalesQuery(batchId, {
    selectFromResult: ({ data, isError, isLoading, isSuccess, error }) => ({
      animalSale: data?.entities[animalSaleId],
      isError,
      isSuccess,
      isLoading,
      error,
    }),
    refetchOnMountOrArgChange: true,
  });

  const {
    batch = {},
    isLoading: isBatchLoading,
    isSuccess: isBatchSuccess,
    isError: isBatchError,
    error: batchError,
  } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data, isError, isLoading, isSuccess, error }) => ({
      batch: data?.entities[batchId],
      isLoading,
      isError,
      isSuccess,
      error,
    }),
  });

  const [deleteAnimalSale, { isLoading }] = useDeleteAnimalSaleMutation();

  useEffect(() => {
    if (
      isBatchSuccess &&
      isSaleSuccess &&
      Object.keys(batch)?.length &&
      Object?.keys(animalSale)?.length
    ) {
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
    }
  }, [animalSale, batch, isBatchSuccess, isSaleSuccess]);

  useEffect(() => {
    if (isBatchError) {
      setStateError(batchError?.data?.message);
    }
  }, [isBatchError, batchError]);

  useEffect(() => {
    if (isSaleError) {
      setStateError(saleError?.data?.message);
    }
  }, [isSaleError, saleError]);

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
      {!isBatchLoading &&
      !isSaleLoading &&
      Object.keys?.(stateAnimalSale)?.length &&
      !stateError ? (
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
      {!isBatchLoading &&
      !isSaleLoading &&
      !batchError &&
      !saleError &&
      !Object.keys?.(stateAnimalSale)?.length ? (
        <p>Animal Sale Does not exist</p>
      ) : null}
      {!isBatchLoading && !isSaleLoading && isBatchError ? (
        <p>{batchError?.data?.message}</p>
      ) : null}
      {!isBatchLoading && !isSaleLoading && isSaleError ? (
        <p>{saleError?.data?.message}</p>
      ) : null}
    </div>
  );
};

export default SingleAnimalSalePage;
