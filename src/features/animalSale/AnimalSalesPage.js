import { useGetAnimalSalesQuery } from "./animalSaleApiSlice";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import AnimalSalesPageExcerpt from "./AnimalSalesPageExcerpt";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const AnimalSalesPage = () => {
  const { batchId } = useParams();

  const [stateAnimalSales, setStateAnimalSales] = useState([]);
  const [stateError, setStateError] = useState(null);

  //FETCHING DATA WITH USEGETANIMALSALESQUERY
  const {
    data: animalSales,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetAnimalSalesQuery(batchId, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isSuccess) {
      const allAnimalSales = Object.keys(animalSales)?.length
        ? animalSales?.ids.map((id) => {
            return animalSales?.entities[id];
          })
        : [];
      setStateAnimalSales(allAnimalSales);
      console.log("stateAnimalSales", allAnimalSales);
    } else if (isError) {
      setStateError(error?.data?.message);
    }
  }, [isError, error, isSuccess, animalSales]);

  return (
    <div>
      <Box display="flex" justifyContent="space-between">
        <Typography fontWeight="bold">
          List of All Revenues Generated from Animal Sales in this Batch
        </Typography>
        <Link to={`/batch/${batchId}/animalsales/create`}>NEW SALES</Link>
      </Box>

      <Divider sx={{ mb: "15px" }} />
      {stateAnimalSales?.length && !stateError
        ? stateAnimalSales.map((animalSale) => (
            <AnimalSalesPageExcerpt
              key={animalSale.id}
              animalSale={animalSale}
              batchId={batchId}
            />
          ))
        : null}
      {isLoading ? <p>Loading Animal Sales</p> : null}
      {isSuccess && !stateError && !isLoading && !stateAnimalSales?.length ? (
        <p>No Animal Sales Recorded so far in this Batch</p>
      ) : null}
      {!isLoading && stateError ? <p>{stateError}</p> : null}
    </div>
  );
};

export default AnimalSalesPage;