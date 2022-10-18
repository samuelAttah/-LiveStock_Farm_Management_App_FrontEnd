import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetHousingsQuery,
  useDeleteHousingMutation,
} from "./housingApiSlice";
import SingleHousingPageExcerpt from "./SingleHousingPageExcerpt";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import { toast } from "react-toastify";
import PulseLoader from "react-spinners/PulseLoader";

const SingleHousingPage = () => {
  const { housingId, batchId } = useParams();
  const navigate = useNavigate();

  //Component States
  const [stateHousing, setStateHousing] = useState([]);
  const [createdDate, setCreatedDate] = useState("");
  const [datePurchased, setDatePurchased] = useState("");
  const [cost, setCost] = useState("");

  const {
    batch = {},
    isError: isBatchError,
    isLoading: isBatchLoading,
    isSuccess: isBatchSuccess,
    error: batchError,
  } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data, isError, isLoading, error, isSuccess }) => ({
      batch: data?.entities[batchId],
      isError,
      isLoading,
      isSuccess,
      error,
    }),
  });

  const {
    house = {},
    isError: isHouseError,
    isLoading: isHouseLoading,
    isSuccess: isHouseSuccess,
    error: houseError,
  } = useGetHousingsQuery(batchId, {
    selectFromResult: ({ data, isError, isLoading, isSuccess, error }) => ({
      house: data?.entities[housingId],
      isError,
      isLoading,
      isSuccess,
      error,
    }),
  });

  const [deleteHousing, { isLoading }] = useDeleteHousingMutation();

  useEffect(() => {
    if (Object.keys(house)?.length && Object.keys(batch)?.length) {
      setStateHousing(house);

      setCreatedDate(house?.createdAt?.split("T")[0]);
      setDatePurchased(house?.datePurchased?.split("T")[0]);

      const formattedCost = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: batch?.currency ?? "USD",
      }).format(Object.values(house?.cost)[0]);

      setCost(formattedCost);
    }
  }, [house, batch]);

  const handleClick = () => {
    navigate(`/batch/${batchId}/housings/${housingId}/edit`);
  };

  const handleDelete = async () => {
    const payLoad = {
      batchId: batchId,
      housingId: housingId,
    };

    try {
      await deleteHousing(payLoad).unwrap();
      navigate(`/batch/${batchId}/housings`, { replace: true });
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
      {isBatchSuccess &&
      isHouseSuccess &&
      Object.keys(batch)?.length &&
      Object.keys(house)?.length ? (
        <SingleHousingPageExcerpt
          stateHousing={stateHousing}
          cost={cost}
          createdDate={createdDate}
          datePurchased={datePurchased}
          batch={batch}
          handleClick={handleClick}
          handleDelete={handleDelete}
          isLoading={isLoading}
        />
      ) : null}

      {!isHouseLoading &&
      !isBatchLoading &&
      !isHouseError &&
      !isBatchError &&
      !Object.keys(stateHousing)?.length ? (
        <p>Property Does not exist</p>
      ) : null}

      {!isBatchLoading && isBatchError ? (
        <p>{batchError?.data?.message ?? "Failed to Load Batch Details"}</p>
      ) : null}

      {!isHouseLoading && isHouseError ? (
        <p>{houseError?.data?.message ?? "Failed to Load Property Details"}</p>
      ) : null}

      {isHouseLoading || isBatchLoading ? <PulseLoader color="green" /> : null}
    </div>
  );
};

export default SingleHousingPage;
