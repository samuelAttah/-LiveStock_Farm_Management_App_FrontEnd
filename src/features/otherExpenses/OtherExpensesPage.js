import { useGetOtherExpensesQuery } from "./otherExpensesApiSlice";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import OtherExpensesPageExcerpt from "./OtherExpensesPageExcerpt";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const OtherExpensesPage = () => {
  const { batchId } = useParams();

  const [stateExpenses, setStateExpenses] = useState([]);
  const [stateError, setStateError] = useState(null);

  const {
    data: expenses,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetOtherExpensesQuery(batchId, { refetchOnMountOrArgChange: true });

  useEffect(() => {
    if (isSuccess) {
      const allOtherExpenses = Object.keys(expenses)?.length
        ? expenses?.ids.map((id) => {
            return expenses?.entities[id];
          })
        : [];
      setStateExpenses(allOtherExpenses);
      console.log("stateExpenses", allOtherExpenses);
    } else if (isError) {
      setStateError(error?.data?.message);
    }
  }, [isError, error, isSuccess, expenses]);

  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <Typography fontWeight="bold">
          List of Other/Miscellaneous Expenses for this Batch
        </Typography>
        <Link to={`/batch/${batchId}/otherexpenses/create`}>
          NEW MISCELLANEOUS EXPENSE
        </Link>
      </Box>

      <Divider sx={{ mb: "15px" }} />
      {stateExpenses?.length && !stateError
        ? stateExpenses
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((expense) => (
              <OtherExpensesPageExcerpt
                key={expense.id}
                expense={expense}
                batchId={batchId}
              />
            ))
        : null}
      {isLoading ? <p>Loading Other Expenses</p> : null}
      {isSuccess && !stateError && !isLoading && !stateExpenses?.length ? (
        <p>No Other Expenses Recorded so far in this Batch</p>
      ) : null}
      {!isLoading && stateError ? <p>{stateError}</p> : null}
    </div>
  );
};

export default OtherExpensesPage;
