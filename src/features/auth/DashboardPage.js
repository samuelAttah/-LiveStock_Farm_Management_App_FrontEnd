import useAuth from "../../common/hooks/useAuth";
import useGreeting from "../../common/hooks/useGreeting";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { useGetBatchesQuery } from "../batches/batchApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import { useNavigate } from "react-router-dom";
import DashBoardPageExcerpt from "./DashBoardPageExcerpt";
import DashBoardPageExcerptInActive from "./DashBoardPageExcerptInActive";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import BatchesPagination from "./BatchesPagination";

const DashboardPage = () => {
  const { username } = useAuth();
  const { greeting } = useGreeting();

  const navigate = useNavigate();

  const [activeBatches, setActiveBatches] = useState([]);
  const [inActiveBatches, setInActiveBatches] = useState([]);

  const [count, setCount] = useState(0);

  const [inActiveCount, setInActiveCount] = useState(0);

  const pageSize = 5;

  const [pagination, setPagination] = useState({
    from: 0,
    to: pageSize,
  });

  const [inActivePagination, setInActivePagination] = useState({
    from: 0,
    to: pageSize,
  });

  //RTK CUSTOM HOOKS
  const {
    data: batches = {},
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetBatchesQuery("batchesList", {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isSuccess) {
      const fetchedBatches = Object.keys(batches)?.length
        ? batches?.ids.map((id) => {
            return batches?.entities[id];
          })
        : [];
      //EVALUATING ACTIVE BATCHES
      const fetchedActiveBatches = fetchedBatches?.filter((batch) => {
        return batch.isActive === true;
      });

      const data = fetchedActiveBatches.slice(pagination.from, pagination.to);
      setActiveBatches(data);
      setCount(fetchedActiveBatches.length);

      //EVALUATING INACTIVE BATCHES
      const fetchedInActiveBatches = fetchedBatches?.filter((batch) => {
        return batch.isActive === false;
      });

      const inActiveData = fetchedInActiveBatches.slice(
        inActivePagination.from,
        inActivePagination.to
      );
      setInActiveBatches(inActiveData);
      setInActiveCount(fetchedInActiveBatches.length);
    }
  }, [batches, isSuccess, pagination, inActivePagination]);

  const handleClick = () => {
    navigate("/dashboard/batches/create");
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography
          fontWeight="bold"
          color="gray"
        >{`Welcome Back ${username.toUpperCase()}`}</Typography>
        <Typography fontWeight="bold" fontFamily="cursive">
          {greeting}
        </Typography>
      </Box>
      <Divider sx={{ mb: "15px" }} />
      {!isLoading && (
        <Box display="flex" justifyContent="space-between" mb="10px">
          <Typography sx={{ mb: "10px" }} fontWeight="bold">
            {activeBatches?.length
              ? `You currently have ${count} active batches`
              : "You currently have 0 active batches"}
          </Typography>
          <Button onClick={handleClick} variant="contained" size="small">
            START NEW BATCH
          </Button>
        </Box>
      )}

      {activeBatches?.length
        ? activeBatches
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((batch) => (
              <DashBoardPageExcerpt key={batch.id} batch={batch} />
            ))
        : null}
      {!activeBatches?.length && !isLoading && (
        <p>No Active Batches to Display</p>
      )}
      {isError && <p>{error.data?.message}</p>}
      {isLoading && <PulseLoader color="green" />}

      <BatchesPagination
        setPagination={(p) => setPagination(p)}
        count={count}
        pageSize={pageSize}
      />

      <Typography sx={{ mb: "10px" }} fontWeight="bold">
        {inActiveBatches?.length
          ? `You currently have ${inActiveCount} inactive batches`
          : "You currently have 0 inactive batches"}
      </Typography>

      {/* inactive batches */}
      {inActiveBatches?.length
        ? inActiveBatches
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((batch) => (
              <DashBoardPageExcerptInActive key={batch.id} batch={batch} />
            ))
        : null}
      {!inActiveBatches?.length && !isLoading && (
        <p>No Inactive Batches to Display</p>
      )}
      {isError && <p>{error?.data?.message}</p>}
      {isLoading && <PulseLoader color="green" />}
      <BatchesPagination
        setPagination={(p) => setInActivePagination(p)}
        count={inActiveCount}
        pageSize={pageSize}
      />
    </>
  );
};

export default DashboardPage;
