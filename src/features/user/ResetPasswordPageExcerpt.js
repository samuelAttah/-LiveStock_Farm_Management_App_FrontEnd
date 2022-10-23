import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const ResetPasswordPageExcerpt = ({
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
  showPasswordOne,
  handleShowPasswordOne,
  showPasswordTwo,
  handleShowPasswordTwo,
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
        {networkError ? (
          <Typography color="red" fontSize={14} fontFamily="cursive">
            {networkError}
          </Typography>
        ) : null}
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
      </Box>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Typography>Enter New Password</Typography>
        <FormControl variant="outlined" fullWidth sx={{ mt: 1 }}>
          <InputLabel
            htmlFor="passwordOne"
            color={errors.passwordOne ? "error" : "primary"}
          >
            Password
          </InputLabel>
          <OutlinedInput
            required
            fullWidth
            name="passwordOne"
            value={passwordOne}
            onChange={handlePasswordOneChange}
            label="Password"
            autoComplete="current-password"
            inputProps={{ maxLength: 30 }}
            error={errors?.passwordOne ? true : false}
            type={showPasswordOne ? "text" : "password"}
            id="passwordOne"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowPasswordOne}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPasswordOne ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        {errors?.passwordOne ? (
          <Typography color="red" fontSize={12} fontFamily="cursive" mt={0}>
            {errors?.passwordOne}
          </Typography>
        ) : null}

        <Typography mb={0} mt={5}>
          Confirm Password
        </Typography>
        <FormControl variant="outlined" fullWidth sx={{ mt: 1 }}>
          <InputLabel
            htmlFor="passwordTwo"
            color={errors.passwordTwo || !matchInput ? "error" : "primary"}
          >
            Confirm Password
          </InputLabel>
          <OutlinedInput
            required
            fullWidth
            name="passwordTwo"
            value={passwordTwo}
            onChange={handlePasswordTwoChange}
            label="Confirm Password"
            type={showPasswordTwo ? "text" : "password"}
            id="passwordTwo"
            autoComplete="current-password"
            error={!matchInput || errors?.passwordTwo ? true : false}
            inputProps={{ maxLength: 30 }}
            disabled={!passwordOne}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowPasswordTwo}
                  // onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPasswordTwo ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
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
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </Box>
    </Container>
  );
};

export default ResetPasswordPageExcerpt;
