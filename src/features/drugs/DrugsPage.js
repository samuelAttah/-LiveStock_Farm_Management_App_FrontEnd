import { useGetDrugsQuery } from "./drugsApiSlice";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import DrugsPageExcerpt from "./DrugsPageExcerpt";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const DrugsPage = () => {
  const { batchId } = useParams();

  const [stateDrugs, setStateDrugs] = useState([]);
  const [stateError, setStateError] = useState(null);

  //FETCHING DATA WITH USEGETDRUGSQUERY
  const {
    data: drugs,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetDrugsQuery(batchId, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isSuccess) {
      const allDrugs = Object.keys(drugs)?.length
        ? drugs?.ids.map((id) => {
            return drugs?.entities[id];
          })
        : [];
      setStateDrugs(allDrugs);
      console.log("stateDrugs", allDrugs);
    } else if (isError) {
      setStateError(error);
    }
  }, [isError, error, isSuccess, drugs]);

  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <Typography fontWeight="bold">
          List of All Drugs Purchased for this Batch
        </Typography>
        <Link to={`/batch/${batchId}/drugs/create`}>NEW DRUG</Link>
      </Box>

      <Divider sx={{ mb: "15px" }} />
      {stateDrugs?.length && !stateError
        ? stateDrugs.map((drug) => (
            <DrugsPageExcerpt key={drug.id} drug={drug} batchId={batchId} />
          ))
        : null}
      {isLoading ? <p>Loading Drugs</p> : null}
      {isSuccess && !stateError && !isLoading && !stateDrugs?.length ? (
        <p>No Drugs Purchased so far in this Batch</p>
      ) : null}
      {!isLoading && stateError ? <p>{stateError}</p> : null}
    </div>
  );
};

export default DrugsPage;
