import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { NumericFormat } from "react-number-format";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const EditRevenuePageExcerpt = ({
  formData,
  handleSubmit,
  handleChange,
  fetchError,
  canSave,
  dateSold,
  setDateSold,
  stateBatch,
  isLoading,
}) => {
  const materialUITextFieldProps = {
    id: "filled-multiline-flexible",
    label: "Cost of each Item Sold",
    multiline: false,
    maxRows: 1,
    variant: "outlined",
    fullWidth: true,
    name: "costPerUnit",
    placeholder: "0.00",
  };

  const materialUINumberSoldTextFieldProps = {
    id: "filled-multiline-flexible",
    label: "Number of items/animals Sold",
    multiline: false,
    maxRows: 1,
    variant: "outlined",
    fullWidth: true,
    name: "numberSold",
    placeholder: "0",
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography component="h3" variant="h5" sx={{ mt: 2 }}>
        Update Revenue
      </Typography>
      <hr />
      {fetchError ? (
        <Typography sx={{ color: "red", fontSize: "small" }}>
          {fetchError}
        </Typography>
      ) : null}
      <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
        <Typography sx={{ textAlign: "left" }}>Item Sold:</Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Item Sold"
          name="itemSold"
          placeholder="Animals, property, or any item sold from the farm. e.g 150 Chickens Sold"
          value={formData.itemSold}
          onChange={handleChange}
          autoFocus
          inputProps={{ maxLength: 30 }}
        />

        <Typography sx={{ textAlign: "left", mb: "10px" }}>
          {`Cost Per Unit in ${stateBatch.currency ?? "USD"}`}
        </Typography>
        <NumericFormat
          value={formData.costPerUnit}
          customInput={TextField}
          name="costPerUnit"
          onChange={handleChange}
          {...materialUITextFieldProps}
        />

        <Typography sx={{ textAlign: "left", my: "10px" }}>
          Number Sold:
        </Typography>
        <NumericFormat
          value={formData.numberSold}
          customInput={TextField}
          name="numberSold"
          onChange={handleChange}
          {...materialUINumberSoldTextFieldProps}
        />

        <Typography sx={{ textAlign: "left", my: "15px" }}>
          Date Sold:
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disableFuture
            label="Date of Purchase"
            openTo="year"
            views={["year", "month", "day"]}
            value={dateSold}
            onChange={(newValue) => {
              setDateSold(newValue);
            }}
            renderInput={(params) => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!canSave || isLoading}
          sx={{ mt: 3, mb: 2 }}
        >
          {isLoading ? "Saving Revenue..." : "Save Revenue"}
        </Button>
      </Box>
    </Container>
  );
};

export default EditRevenuePageExcerpt;
