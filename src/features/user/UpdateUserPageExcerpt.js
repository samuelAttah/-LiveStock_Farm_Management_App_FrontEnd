import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const UpdateUserPageExcerpt = ({
  singleUserDetail,
  handleSubmit,
  formData,
  handleChange,
  phoneValue,
  setPhoneValue,
  genderOptions,
  birthDay,
  setBirthDay,
  handleImageUploadChange,
  localFile,
  isLoading,
  errors,
  networkError,
  canSave,
  isUploading,
  validEmail,
}) => {
  return (
    <Container component="main" maxWidth="md">
      <Typography component="h6" variant="h6" sx={{ mt: 2 }} mb={0} pb={0}>
        Update User Profile
      </Typography>
      <Divider />
      {networkError ? (
        <Typography color="red" fontSize="13px" fontFamily="Cursive">
          {networkError}
        </Typography>
      ) : null}
      <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
        <Box display="flex" mt={2} flexDirection="row">
          <Typography color="gray" fontSize={13}>
            PERSONAL details
          </Typography>
        </Box>
        <Divider />
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography mr={1}>First Name:</Typography>
              <TextField
                margin="normal"
                required
                id="firstName"
                label="First Name"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                size="small"
                onChange={handleChange}
                autoFocus
                inputProps={{ maxLength: 30 }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography mr={1}>Last Name:</Typography>
              <TextField
                margin="normal"
                required
                id="lastName"
                label="Last Name"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                size="small"
                onChange={handleChange}
                inputProps={{ maxLength: 30 }}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography mr={1}>E-mail:</Typography>
              <TextField
                margin="normal"
                required
                type="email"
                id="email"
                label="E-mail"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                size="small"
                onChange={handleChange}
                inputProps={{ maxLength: 40 }}
                error={!validEmail}
              />
            </Box>
            {!validEmail ? (
              <Typography
                display="flex"
                flexDirection="row"
                color="red"
                fontSize={13}
                fontFamily="cursive"
                mt={0}
              >
                {`[incl. a-z@.domain]`}
              </Typography>
            ) : null}
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
              <Typography mr={1}>Phone Number:</Typography>
              <PhoneInput
                placeholder="Enter phone number"
                defaultCountry="NG"
                flags={flags}
                value={phoneValue}
                onChange={setPhoneValue}
                limitMaxLength
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography mr={1}>Gender:</Typography>
              <FormControl margin="normal" required size="small" fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.gender}
                  name="gender"
                  label="Category"
                  required
                  size="small"
                  onChange={handleChange}
                >
                  {genderOptions}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography mr={1}>Home Address:</Typography>
              <TextField
                margin="normal"
                required
                type="address"
                id="homeAddress"
                label="Home Address"
                name="homeAddress"
                placeholder="Home Address"
                value={formData.homeAddress}
                fullWidth
                maxRows={2}
                size="small"
                onChange={handleChange}
                inputProps={{ maxLength: 100 }}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
              <Typography mr={1}>Date of Birth:</Typography>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disableFuture
                  label="Date of Birth"
                  openTo="year"
                  views={["year", "month", "day"]}
                  value={birthDay}
                  onChange={(newValue) => {
                    setBirthDay(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} size="small" required />
                  )}
                />
              </LocalizationProvider>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography mr={1}>Occupation:</Typography>
              <TextField
                margin="normal"
                required
                type="text"
                id="occupation"
                label="Occupation"
                name="occupation"
                placeholder="Occupation"
                value={formData.occupation}
                fullWidth
                maxRows={2}
                size="small"
                onChange={handleChange}
                inputProps={{ maxLength: 30 }}
              />
            </Box>
          </Grid>
        </Grid>
        <Box display="flex" mt={2} flexDirection="row">
          <Typography color="gray" fontSize={13}>
            WORK details
          </Typography>
        </Box>
        <Divider />

        <Grid container>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography mr={1}>Company/Farm Name:</Typography>
              <TextField
                margin="normal"
                required
                type="text"
                id="farmName"
                label="company/farm Name"
                name="farmName"
                placeholder="Company Name or Farm Name"
                value={formData.farmName}
                maxRows={2}
                size="small"
                onChange={handleChange}
                inputProps={{ maxLength: 35 }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box display="flex" flexDirection="row" alignItems="center">
              <Typography mr={1}>Company/Farm Address:</Typography>
              <TextField
                margin="normal"
                required
                type="address"
                id="farmAddress"
                label="company/farm address"
                name="farmAddress"
                placeholder="Company Address or Farm Address"
                value={formData.farmAddress}
                fullWidth
                maxRows={2}
                size="small"
                onChange={handleChange}
                inputProps={{ maxLength: 100 }}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6} mb={2}>
            <Box display="flex" flexDirection="row" alignItems="center" my={2}>
              <Typography mr={1}>Company Logo:</Typography>
              <Box>
                <input
                  type="file"
                  id="companyLogo"
                  accept=".png, .jpg, .jpeg,"
                  onChange={handleImageUploadChange}
                />
              </Box>
            </Box>
            {errors ? (
              <Typography
                color="red"
                fontSize="11px"
                fontFamily="Cursive"
                display="flex"
                flexDirection="row"
              >
                {errors}
              </Typography>
            ) : null}
            {!errors ? (
              <Typography fontSize="12px" display="flex" flexDirection="row">
                .jpg,.jpeg,.png must be less than 250KB
              </Typography>
            ) : null}
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={!canSave || isLoading || isUploading}
        >
          {isLoading ? "Saving" : "Save"}
        </Button>
      </Box>
    </Container>
  );
};

export default UpdateUserPageExcerpt;
