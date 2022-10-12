import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { NumericFormat } from "react-number-format";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import countryCurrencyList from "../../common/utils/countryCurrencyList";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const CreateBatchPageExcerpt = ({
  formData,
  handleSubmit,
  handleChange,
  fetchError,
  currency,
  setCurrency,
  canSave,
  isLoading,
  animalTypeOptions,
  datePurchased,
  setDatePurchased,
}) => {
  const materialUINumberTextFieldProps = {
    id: "filled-multiline-flexible",
    label: "Number Purchased",
    multiline: false,
    maxRows: 1,
    variant: "outlined",
    fullWidth: true,
    name: "numberPurchased",
    placeholder: "0",
  };
  const materialUITextFieldProps = {
    id: "filled-multiline",
    label: "Price per Unit",
    multiline: false,
    maxRows: 1,
    variant: "outlined",
    fullWidth: true,
    name: "costPerUnit",
    placeholder: "0.00",
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography component="h3" variant="h5" sx={{ mt: 2 }}>
        Create New Batch
      </Typography>
      <hr />
      {fetchError ? (
        <Typography sx={{ color: "red", fontSize: "small" }}>
          {fetchError}
        </Typography>
      ) : null}
      <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
        <Typography sx={{ textAlign: "left" }}>Batch Title:</Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="batchTitle"
          label="Batch Title"
          placeholder="e.g September-December Batch"
          name="batchTitle"
          value={formData.batchTitle}
          onChange={handleChange}
          autoFocus
          inputProps={{ maxLength: 30 }}
        />

        <Typography sx={{ textAlign: "left" }}> Animal Type: </Typography>
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="demo-simple-select-label">Animal Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formData.animalType}
            name="animalType"
            label="Category"
            required
            onChange={handleChange}
          >
            {animalTypeOptions}
          </Select>
        </FormControl>
        <Typography sx={{ textAlign: "left", my: "10px" }}>
          Number of Animals Purchased
        </Typography>
        <NumericFormat
          value={formData.numberPurchased}
          customInput={TextField}
          name="numberPurchased"
          onChange={handleChange}
          {...materialUINumberTextFieldProps}
        />

        <Typography sx={{ textAlign: "left", my: "10px" }}>
          Price per Unit:
        </Typography>
        <NumericFormat
          value={formData.costPerUnit}
          customInput={TextField}
          name="costPerUnit"
          onChange={handleChange}
          {...materialUITextFieldProps}
        />

        <Typography sx={{ textAlign: "left", my: "12px" }}>
          Currency:
        </Typography>

        <Autocomplete
          id="currency-select-demo"
          options={countryCurrencyList}
          autoSelect
          autoHighlight
          fullWidth
          value={currency}
          getOptionLabel={(option) => option.code}
          onChange={(event, newValue) => {
            setCurrency(newValue);
            console.log("newValue", newValue);
          }}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                alt=""
              />
              {option.label} ({option.currencyName})
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a currency"
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />

        <Typography sx={{ textAlign: "left", my: "15px" }}>
          Date of Purchase:
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disableFuture
            label="Date of Purchase"
            openTo="year"
            views={["year", "month", "day"]}
            value={datePurchased}
            onChange={(newValue) => {
              setDatePurchased(newValue);
              console.log("datePurchased", newValue.toISOString());
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                onChange={(newValue) => setDatePurchased(newValue)}
              />
            )}
          />
        </LocalizationProvider>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!canSave || isLoading}
          sx={{ mt: 3, mb: 2 }}
        >
          {isLoading ? "Creating Batch..." : "Create"}
        </Button>
      </Box>
    </Container>
  );
};

export default CreateBatchPageExcerpt;
