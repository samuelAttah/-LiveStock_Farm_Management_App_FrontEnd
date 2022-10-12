import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import {
  useGetMortalitysQuery,
  useDeleteMortalityMutation,
} from "./mortalityApiSlice";
import SingleMortalityPageExcerpt from "./SingleMortalityPageExcerpt";
import { toast } from "react-toastify";

const SingleMortalityPage = () => {
  const { mortalityId, batchId } = useParams();
  const navigate = useNavigate();

  const [stateMortality, setStateMortality] = useState({});
  const [stateError, setStateError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [createdDate, setCreatedDate] = useState(String);

  const { mortality } = useGetMortalitysQuery(batchId, {
    selectFromResult: ({ data }) => ({
      mortality: data?.entities[mortalityId],
    }),
    refetchOnMountOrArgChange: true,
  });

  const { batch } = useGetBatchesQuery("batchesList", {
    selectFromResult: ({ data }) => ({
      batch: data?.entities[batchId],
    }),
  });

  const [deleteMortality, { isLoading }] = useDeleteMortalityMutation();

  useEffect(() => {
    setLoading(true);
    if (mortality) {
      setStateMortality(mortality);
      console.log("inmortality", mortality);

      setCreatedDate(mortality.createdAt);

      setStateError(false);
      setLoading(false);
    } else {
      setStateError(true);
      setLoading(false);
    }
    return () => setStateError(false);
  }, [mortality]);

  const handleClick = () => {
    navigate(`/batch/${batchId}/mortalities/${mortalityId}/edit`);
  };

  const handleDelete = async () => {
    const payLoad = {
      batchId: batchId,
      mortalityId: mortalityId,
    };

    try {
      await deleteMortality(payLoad).unwrap();
      navigate(`/batch/${batchId}/mortalities`, { replace: true });
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
      {stateMortality && !stateError ? (
        <SingleMortalityPageExcerpt
          stateMortality={stateMortality}
          createdDate={createdDate}
          handleClick={handleClick}
          batch={batch}
          handleDelete={handleDelete}
          isLoading={isLoading}
        />
      ) : null}
      {!loading && stateError ? <p>Livestock Death Does not exist</p> : null}
    </div>
  );
};

export default SingleMortalityPage;
