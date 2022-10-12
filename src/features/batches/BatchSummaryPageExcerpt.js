import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import grey from "@mui/material/colors/grey";
import BatchSummaryExpensesExcerpt from "./BatchSummaryExpensesExcerpt";

import BatchSummaryDescriptionExcerpt from "./BatchSummaryDescriptionExcerpt";
const BatchSummaryPageExcerpt = ({
  batch,
  totalDeadAnimals,
  costPerUnit,
  totalPurchaseCost,
  createdDate,
  numberOfTimesFeedExpense,
  formattedTotalAmountSpentOnFeeds,
  numberOfTimesDrugExpense,
  formattedTotalAmountSpentOnDrugs,
  numberOfTimesHousingExpense,
  formattedTotalAmountSpentOnHousings,
  numberOfTimesOtherExpense,
  formattedTotalAmountSpentOnOtherExpenses,
  numberOfTimesAnimalsWereSold,
  totalNumberOfAnimalsSold,
  formattedTotalIncomeGeneratedFromAnimalSales,
  numberOfTimesOtherItemsWereSold,
  formattedTotalIncomeGeneratedFromOtherSales,
  formattedTotalBatchExpenses,
  formattedTotalBatchRevenues,
  totalBatchExpenses,
  totalBatchRevenues,
}) => {
  return (
    <>
      <Container component="main" maxWidth="md">
        <Typography component="h5" variant="h5" sx={{ mt: 2 }} color="gray">
          {`${batch?.batchTitle} Summary`}
        </Typography>
        <hr />
        <BatchSummaryDescriptionExcerpt
          batch={batch}
          totalDeadAnimals={totalDeadAnimals}
          totalPurchaseCost={totalPurchaseCost}
          costPerUnit={costPerUnit}
        />
        <hr />
        <BatchSummaryExpensesExcerpt
          numberOfTimesFeedExpense={numberOfTimesFeedExpense}
          formattedTotalAmountSpentOnFeeds={formattedTotalAmountSpentOnFeeds}
          numberOfTimesDrugExpense={numberOfTimesDrugExpense}
          formattedTotalAmountSpentOnDrugs={formattedTotalAmountSpentOnDrugs}
          numberOfTimesHousingExpense={numberOfTimesHousingExpense}
          formattedTotalAmountSpentOnHousings={
            formattedTotalAmountSpentOnHousings
          }
          numberOfTimesOtherExpense={numberOfTimesOtherExpense}
          formattedTotalAmountSpentOnOtherExpenses={
            formattedTotalAmountSpentOnOtherExpenses
          }
          formattedTotalBatchExpenses={formattedTotalBatchExpenses}
          totalBatchExpenses={totalBatchExpenses}
        />

        <Typography
          color="primary.main"
          component="h6"
          variant="h6"
          mb={2}
          mt={3}
        >
          Batch Revenues
        </Typography>
        <Grid item md={12} xs={12} lg={12} mb={0}>
          <Typography textAlign="left" color={grey[700]} mb={0}>
            Sales of Batch Animals:
          </Typography>
        </Grid>
        <hr />
        <Grid container spacing={1} mb={1}>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="row">
              <Typography fontWeight="bold" textAlign="left">
                Animal Sales Count:
              </Typography>
              <Typography ml={1} textAlign="left">
                {numberOfTimesAnimalsWereSold}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="row">
              <Typography fontWeight="bold" textAlign="left">
                {" "}
                Total Amount Generated from Sales of Animals:{" "}
              </Typography>
              <Typography ml={1} textAlign="left">
                {formattedTotalIncomeGeneratedFromAnimalSales}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="row">
              <Typography fontWeight="bold" textAlign="left">
                {" "}
                Total Number of Animals Sold:{" "}
              </Typography>
              <Typography ml={1} textAlign="left">
                {totalNumberOfAnimalsSold}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid item md={12} xs={12} lg={12} mb={0}>
          <Typography textAlign="left" color={grey[700]} mb={0}>
            Sales of Other Farm Items:
          </Typography>
        </Grid>
        <hr />
        <Grid container spacing={1} mb={1}>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="row">
              <Typography fontWeight="bold" textAlign="left">
                Other Revenues Count:
              </Typography>
              <Typography ml={1} textAlign="left">
                {numberOfTimesOtherItemsWereSold}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="row">
              <Typography fontWeight="bold" textAlign="left">
                {" "}
                Total Amount Generated from Sales of Other Items:{" "}
              </Typography>
              <Typography ml={1} textAlign="left">
                {formattedTotalIncomeGeneratedFromOtherSales}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Print
        </Button>
      </Container>
    </>
  );
};

export default BatchSummaryPageExcerpt;
