import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";

const PasswordResetPageExcerpt = ({
  networkError,
  handleSubmit,
  isLoading,
  canSave,
  passwordOne,
  passwordTwo,
  handlePasswordOneChange,
  handlePasswordTwoChange,
  matchInput,
  errors = {},
}) => {
  return (
    <Container component="main" maxWidth="xs" minWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingY: 15,
        }}
      >
        {networkError ? (
          <Typography color="red" fontSize={14} fontFamily="cursive">
            {networkError}
          </Typography>
        ) : null}
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <Typography>Enter New Password</Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            name="passwordOne"
            value={passwordOne}
            onChange={handlePasswordOneChange}
            label="Password"
            type="password"
            id="passwordOne"
            autoComplete="current-password"
            inputProps={{ maxLength: 40 }}
            error={errors?.passwordOne}
          />
          {errors?.passwordOne ? (
            <Typography color="red" fontSize={12} fontFamily="cursive" mt={0}>
              {errors?.passwordOne}
            </Typography>
          ) : null}

          <Typography mb={0} mt={5}>
            Confirm Password
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            name="passwordTwo"
            value={passwordTwo}
            onChange={handlePasswordTwoChange}
            label="Confirm Password"
            type="password"
            id="passwordTwo"
            autoComplete="current-password"
            error={!matchInput || errors?.passwordTwo}
            inputProps={{ maxLength: 40 }}
          />
          {errors?.passwordTwo ? (
            <Typography color="red" fontSize={12} fontFamily="cursive" mt={0}>
              {errors?.passwordTwo}
            </Typography>
          ) : null}
          {!matchInput ? (
            <Typography color="red" fontFamily="cursive" mt={0} fontSize={12}>
              Password Mismatch
            </Typography>
          ) : null}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={!canSave || isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default PasswordResetPageExcerpt;
