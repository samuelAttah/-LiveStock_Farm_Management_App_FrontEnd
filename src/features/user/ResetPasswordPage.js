import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useResetPasswordMutation,
  useVerifyResetLinkMutation,
} from "./userApiSlice";
import ResetPasswordPageExcerpt from "./ResetPasswordPageExcerpt";
import Typography from "@mui/material/Typography";
import PulseLoader from "react-spinners/PulseLoader";
import useTitle from "../../common/hooks/useTitle";

const ResetPasswordPage = () => {
  useTitle("Farm Diary | Reset Password");
  const navigate = useNavigate();

  const { id, token } = useParams();

  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");

  const [matchInput, setMatchInput] = useState(Boolean);

  const [errors, setErrors] = useState({});
  const [networkError, setNetworkError] = useState("");

  const [showPasswordOne, setShowPasswordOne] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);

  const effectRan = useRef(false);

  //USING RTK CUSTOM HOOK FOR SUBMISSION
  const payLoad = { id: id, token: token };

  const [
    doVerifyLink,
    {
      isError: isLinkError,
      isLoading: isLinkLoading,
      error: linkError,
      isSuccess: isLinkSuccess,
    },
  ] = useVerifyResetLinkMutation();

  const [doResetPassword, { isError, isLoading, error, isSuccess }] =
    useResetPasswordMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      doVerifyLink(payLoad);
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  useEffect(() => {
    setMatchInput(passwordTwo === passwordOne);
  }, [passwordOne, passwordTwo]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password Reset Successful", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      navigate("/login", { replace: true });
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      setNetworkError(error?.data?.message);
    }
  }, [isError, error]);

  //HANDLERS
  const handlePasswordOneChange = (e) => {
    setNetworkError("");
    setErrors({ passwordOne: "" });
    setPasswordOne(e.target?.value);
  };
  const handlePasswordTwoChange = (e) => {
    setNetworkError("");
    setErrors({ passwordTwo: "" });
    setPasswordTwo(e.target?.value);
  };

  //PASSWORD VISIBILITY HANDLERS
  const handleShowPasswordOne = () => {
    setShowPasswordOne((prev) => !prev);
  };

  const handleShowPasswordTwo = () => {
    setShowPasswordTwo((prev) => !prev);
  };

  const formIsValid = () => {
    const errors = {};

    if (!(passwordOne.length >= 8))
      errors.passwordOne = "Password should be 8 to 25 characters Long";
    if (passwordOne.length > 25) errors.passwordOne = "Password is too Long";
    if (!(passwordTwo.length >= 8))
      errors.passwordTwo = "Password should be 8 to 25 characters Long";
    if (passwordTwo.length > 25) errors.passwordTwo = "Password is too Long";

    setErrors(errors);
    // form is valid if object properties are empty
    return Object.keys(errors).length === 0;
  };

  const canSave = [passwordOne, passwordTwo].every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formIsValid()) return;
    if (!matchInput) {
      return;
    }
    const payLoad = {
      password: passwordOne,
      id: id,
      token: token,
    };
    try {
      await doResetPassword(payLoad).unwrap();
    } catch (error) {
      setNetworkError(error?.data?.message);
    }
  };

  return (
    <>
      {isLinkSuccess ? (
        <ResetPasswordPageExcerpt
          passwordOne={passwordOne}
          passwordTwo={passwordTwo}
          handlePasswordOneChange={handlePasswordOneChange}
          handlePasswordTwoChange={handlePasswordTwoChange}
          matchInput={matchInput}
          handleSubmit={handleSubmit}
          errors={errors}
          networkError={networkError}
          canSave={canSave}
          isLoading={isLoading}
          showPasswordOne={showPasswordOne}
          handleShowPasswordOne={handleShowPasswordOne}
          showPasswordTwo={showPasswordTwo}
          handleShowPasswordTwo={handleShowPasswordTwo}
        />
      ) : null}

      {isLinkError && !isLinkLoading ? (
        <Typography
          component="h5"
          variant="h6"
          color="error.main"
          fontWeight="bold"
          padding={4}
          mt={10}
        >
          {linkError?.data?.message === "Unauthorized"
            ? "Invalid Password Reset Link"
            : "Failed to validate Link"}
        </Typography>
      ) : null}

      {isLinkLoading && <PulseLoader color="green" />}
    </>
  );
};

export default ResetPasswordPage;

//
