import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import grey from "@mui/material/colors/grey";
import BatchSummaryExpensesExcerpt from "./BatchSummaryExpensesExcerpt";
import BatchSummaryDescriptionExcerpt from "./BatchSummaryDescriptionExcerpt";
import { PDFDownloadLink } from "@react-pdf/renderer";
import BatchSummaryPDFfile from "./BatchSummaryPDFfile";
// import CardMedia from "@mui/material/CardMedia";
import blue from "@mui/material/colors/blue";

const BatchSummaryPageExcerpt = ({
  batch,
  totalDeadAnimals,
  costPerUnit,
  totalPurchaseCost,
  createdDate,
  purchasedDate,
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
  profitOrLoss,
  formattedProfitOrLoss,
  singleUserDetail,
}) => {
  return (
    <>
      <Container component="main" maxWidth="md">
        <Grid
          container
          spacing={1}
          display="flex"
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Grid item xs={6} md={6}>
            <Typography
              textAlign="left"
              fontSize={17}
              fontWeight="bold"
              color={blue[500]}
            >
              {singleUserDetail?.farmName ?? "Update Farm Name"}
            </Typography>
          </Grid>
          <Grid item xs={3} md={3}>
            {singleUserDetail?.companyLogo ? (
              <img
                src={singleUserDetail?.companyLogo}
                alt="farm logo"
                height={60}
                width={80}
              />
            ) : (
              <Typography>Update Farm/Company Logo</Typography>
            )}
          </Grid>
        </Grid>
        <Typography component="h5" variant="h5" sx={{ mt: 2 }} color="gray">
          {`${batch?.batchTitle} Summary`}
        </Typography>
        <hr />
        <BatchSummaryDescriptionExcerpt
          batch={batch}
          totalDeadAnimals={totalDeadAnimals}
          totalPurchaseCost={totalPurchaseCost}
          costPerUnit={costPerUnit}
          createdDate={createdDate}
          purchasedDate={purchasedDate}
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
        />

        <hr />

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
            Sales of Animals:
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
        <Grid container spacing={1} mb={1}>
          <Grid item xs={12} md={12}>
            <Box
              display="flex"
              flexDirection="row-reverse"
              alignItems={"center"}
            >
              <Typography
                ml={1}
                textAlign="left"
                fontWeight="bold"
                fontSize={20}
                color={"primary.main"}
              >
                {formattedTotalBatchRevenues}
              </Typography>
              <Typography
                fontWeight="bold"
                textAlign="left"
                color={"primary.main"}
              >
                Total Amount of All Revenues:
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={1} my={2}>
          <Grid item xs={12} md={12}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              {profitOrLoss >= 0 ? (
                <Typography
                  fontWeight="bold"
                  textAlign="left"
                  color={"primary.main"}
                >
                  Total Profit:
                </Typography>
              ) : (
                <Typography
                  fontWeight="bold"
                  textAlign="left"
                  color={"error.main"}
                >
                  Total Loss:
                </Typography>
              )}
              {profitOrLoss > 0 ? (
                <Typography
                  ml={1}
                  textAlign="left"
                  fontWeight="bold"
                  fontSize={20}
                  color={"primary.main"}
                >
                  {formattedProfitOrLoss}
                </Typography>
              ) : profitOrLoss < 0 ? (
                <Typography
                  ml={1}
                  textAlign="left"
                  fontWeight="bold"
                  fontSize={20}
                  color={"error.main"}
                >
                  {formattedProfitOrLoss}
                </Typography>
              ) : (
                <Typography
                  ml={1}
                  textAlign="left"
                  fontWeight="bold"
                  fontSize={20}
                >
                  {formattedProfitOrLoss}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Print
        </Button> */}
        <PDFDownloadLink
          document={
            <BatchSummaryPDFfile
              stateBatch={batch}
              createdDate={createdDate}
              purchasedDate={purchasedDate}
              costPerUnit={costPerUnit}
              totalDeadAnimals={totalDeadAnimals}
              totalPurchaseCost={totalPurchaseCost}
              numberOfTimesFeedExpense={numberOfTimesFeedExpense}
              formattedTotalAmountSpentOnFeeds={
                formattedTotalAmountSpentOnFeeds
              }
              numberOfTimesDrugExpense={numberOfTimesDrugExpense}
              formattedTotalAmountSpentOnDrugs={
                formattedTotalAmountSpentOnDrugs
              }
              numberOfTimesHousingExpense={numberOfTimesHousingExpense}
              formattedTotalAmountSpentOnHousings={
                formattedTotalAmountSpentOnHousings
              }
              numberOfTimesOtherExpense={numberOfTimesOtherExpense}
              formattedTotalAmountSpentOnOtherExpenses={
                formattedTotalAmountSpentOnOtherExpenses
              }
              numberOfTimesAnimalsWereSold={numberOfTimesAnimalsWereSold}
              totalNumberOfAnimalsSold={totalNumberOfAnimalsSold}
              formattedTotalIncomeGeneratedFromAnimalSales={
                formattedTotalIncomeGeneratedFromAnimalSales
              }
              numberOfTimesOtherItemsWereSold={numberOfTimesOtherItemsWereSold}
              formattedTotalIncomeGeneratedFromOtherSales={
                formattedTotalIncomeGeneratedFromOtherSales
              }
              formattedTotalBatchExpenses={formattedTotalBatchExpenses}
              formattedTotalBatchRevenues={formattedTotalBatchRevenues}
              profitOrLoss={profitOrLoss}
              formattedProfitOrLoss={formattedProfitOrLoss}
              singleUserDetail={singleUserDetail}
            />
          }
          fileName="Batch_Summary"
        >
          {({ loading, error }) =>
            loading ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                Loading
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Download As Pdf
              </Button>
            )
          }
        </PDFDownloadLink>
      </Container>
    </>
  );
};

export default BatchSummaryPageExcerpt;
