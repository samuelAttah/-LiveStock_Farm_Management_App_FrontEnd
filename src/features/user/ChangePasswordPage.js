import { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useChangepasswordMutation } from "./userApiSlice";
import ChangePasswordPageExcerpt from "./ChangePasswordPageExcerpt";
import useTitle from "../../common/hooks/useTitle";

const ChangePasswordPage = () => {
  useTitle("Farm Diary | Change Password");
  const location = useLocation();
  const navigate = useNavigate();

  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [matchInput, setMatchInput] = useState(Boolean);

  const [errors, setErrors] = useState({});
  const [networkError, setNetworkError] = useState("");

  //PASSWORDS VISIBILITY STATES
  const [showPasswordOne, setShowPasswordOne] = useState(false);
  const [showPasswordTwo, setShowPasswordTwo] = useState(false);

  //USING RTK CUSTOM HOOK FOR SUBMISSION
  const [doChangePassword, { isError, isLoading, error, isSuccess }] =
    useChangepasswordMutation();

  useEffect(() => {
    setMatchInput(passwordTwo === passwordOne);
  }, [passwordOne, passwordTwo]);

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

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully Changed Password", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      navigate("/dashboard", { replace: true });
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (isError) {
      setNetworkError(error?.data?.message);
    }
  }, [isError, error]);

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

  const handleShowPasswordOne = () => {
    setShowPasswordOne((prev) => !prev);
  };

  const handleShowPasswordTwo = () => {
    setShowPasswordTwo((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formIsValid()) return;
    if (!matchInput) {
      return;
    }
    const payLoad = {
      oldPassword: location?.state?.oldPassword,
      newPassword: passwordOne,
    };
    try {
      await doChangePassword(payLoad).unwrap();
    } catch (error) {
      setNetworkError(error?.data?.message);
    }
  };

  return location?.state?.oldPassword ? (
    <ChangePasswordPageExcerpt
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
  ) : (
    <Navigate to="/dashboard/verifycurrentpassword" />
  );
};

export default ChangePasswordPage;
