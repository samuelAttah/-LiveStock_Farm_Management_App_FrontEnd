import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";

const EmailVerifyPageExcerpt = ({
  fetchError,
  handleSubmit,
  isLoading,
  canSave,
  email,
  handleChange,
  successMessage,
  validEmail,
}) => {
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 12,
        }}
      >
        {fetchError ? (
          <Typography
            component="h6"
            variant="h6"
            sx={{ color: "red", fontSize: 15, fontFamily: "cursive" }}
          >
            {fetchError}
          </Typography>
        ) : null}
        {successMessage ? (
          <Typography component="h6" variant="h6" color="primary.main">
            {successMessage}
          </Typography>
        ) : null}
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
      </Box>
      <Typography fontSize={17}>Enter Registered Email</Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="email"
          value={email}
          onChange={handleChange}
          label="email"
          type="email"
          id="email"
          autoComplete="email"
          autoFocus
          error={!validEmail}
        />
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          disabled={!canSave || isLoading || !validEmail}
          sx={{ mt: 3, mb: 2 }}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </Box>
    </Container>
  );
};

export default EmailVerifyPageExcerpt;
