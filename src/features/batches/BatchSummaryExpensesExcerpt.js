import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import grey from "@mui/material/colors/grey";

const BatchSummaryExpensesExcerpt = ({
  numberOfTimesFeedExpense,
  formattedTotalAmountSpentOnFeeds,
  numberOfTimesDrugExpense,
  formattedTotalAmountSpentOnDrugs,
  numberOfTimesHousingExpense,
  formattedTotalAmountSpentOnHousings,
  numberOfTimesOtherExpense,
  formattedTotalAmountSpentOnOtherExpenses,
}) => {
  return (
    <>
      {" "}
      <Typography color="error.main" component="h6" variant="h6" mb={2} mt={3}>
        Batch Expenses
      </Typography>
      <Grid item md={12} xs={12} lg={12} mb={0}>
        <Typography textAlign="left" color={grey[700]} mb={0}>
          Purchase of Feeds
        </Typography>
      </Grid>
      <hr />
      <Grid container spacing={1} mb={1}>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="row">
            <Typography fontWeight="bold" textAlign="left">
              Feeds Purchase Count
            </Typography>
            <Typography ml={1} textAlign="left">
              {numberOfTimesFeedExpense}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="row">
            <Typography fontWeight="bold" textAlign="left">
              {" "}
              Total amount spent on Feeding:{" "}
            </Typography>
            <Typography ml={1} textAlign="left">
              {formattedTotalAmountSpentOnFeeds}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid item md={12} xs={12} lg={12} mb={0}>
        <Typography textAlign="left" color={grey[700]} mb={0}>
          Purchase of Drugs
        </Typography>
      </Grid>
      <hr />
      <Grid container spacing={1} mb={1}>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="row">
            <Typography fontWeight="bold" textAlign="left">
              Drugs Purchase Count
            </Typography>
            <Typography ml={1} textAlign="left">
              {numberOfTimesDrugExpense}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="row">
            <Typography fontWeight="bold" textAlign="left">
              {" "}
              Total amount spent on Drugs:{" "}
            </Typography>
            <Typography ml={1} textAlign="left">
              {formattedTotalAmountSpentOnDrugs}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid item md={12} xs={12} lg={12} mb={0}>
        <Typography textAlign="left" color={grey[700]} mb={0}>
          Purchase of Properties
        </Typography>
      </Grid>
      <hr />
      <Grid container spacing={1} mb={1}>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="row">
            <Typography fontWeight="bold" textAlign="left">
              Properties Purchase Count
            </Typography>
            <Typography ml={1} textAlign="left">
              {numberOfTimesHousingExpense}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="row">
            <Typography fontWeight="bold" textAlign="left">
              {" "}
              Total amount spent on Properties:{" "}
            </Typography>
            <Typography ml={1} textAlign="left">
              {formattedTotalAmountSpentOnHousings}
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid item md={12} xs={12} lg={12} mb={0}>
        <Typography textAlign="left" color={grey[700]} mb={0}>
          Other/Miscellaneous Expenses
        </Typography>
      </Grid>
      <hr />
      <Grid container spacing={1} mb={1}>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="row">
            <Typography fontWeight="bold" textAlign="left">
              Other Expenses Count
            </Typography>
            <Typography ml={1} textAlign="left">
              {numberOfTimesOtherExpense}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" flexDirection="row">
            <Typography fontWeight="bold" textAlign="left">
              {" "}
              Total amount spent on Other Expenses:{" "}
            </Typography>
            <Typography ml={1} textAlign="left">
              {formattedTotalAmountSpentOnOtherExpenses}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default BatchSummaryExpensesExcerpt;
