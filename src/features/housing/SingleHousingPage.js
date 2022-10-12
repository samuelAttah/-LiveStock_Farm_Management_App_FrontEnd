import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetHousingsQuery,
  useDeleteHousingMutation,
} from "./housingApiSlice";
import SingleHousingPageExcerpt from "./SingleHousingPageExcerpt";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import { toast } from "react-toastify";

const SingleHousingPage = () => {
  const { housingId, batchId } = useParams();
  const navigate = useNavigate();

  //Component States
  const [stateHousing, setStateHousing] = useState([]);
  const [stateError, setStateError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createdDate, setCreatedDate] = useState("");
  const [datePurchased, setDatePurchased] = useState("");
  const [cost, setCost] = useState("");

  const { house } = useGetHousingsQuery(batchId, {
    selectFromResult: ({ data }) => ({
      house: data?.entities[housingId],
    }),
    refetchOnMountOrArgChange: true,
  });

  const { batch } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data }) => ({
      batch: data?.entities[batchId],
    }),
  });

  const [deleteHousing, { isLoading }] = useDeleteHousingMutation();

  useEffect(() => {
    setLoading(true);
    if (house && batch) {
      setStateHousing(house);
      console.log("inhouse", house);

      setCreatedDate(house?.createdAt?.split("T")[0]);
      setDatePurchased(house?.datePurchased?.split("T")[0]);

      const formattedCost = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: batch?.currency ?? "USD",
      }).format(Object.values(house?.cost)[0]);

      setCost(formattedCost);

      setStateError(false);

      setLoading(false);
    } else {
      setStateError(true);
      setLoading(false);
    }
    return () => setStateError(false);
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
      {stateHousing && !stateError ? (
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
      {!loading && stateError ? <p>Property Does not exist</p> : null}
    </div>
  );
};

export default SingleHousingPage;
