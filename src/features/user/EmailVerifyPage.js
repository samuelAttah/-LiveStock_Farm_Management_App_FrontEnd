import { useState, useEffect } from "react";
import EmailVerifyPageExcerpt from "./EmailVerifyPageExcerpt";
import { useForgotPasswordMutation } from "./userApiSlice";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import useTitle from "../../common/hooks/useTitle";

const EmailVerifyPage = () => {
  //   const navigate = useNavigate();
  useTitle("Farm Diary | Verify Email");

  const EMAIL_REGEX =
    /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

  const [fetchError, setFetchError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(Boolean);

  const [doForgotPassword, { isError, isSuccess, error, isLoading }] =
    useForgotPasswordMutation();

  //USEEFFECT FOR VALIDATING EMAIL WITH REGEX
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    if (isSuccess) {
      setSuccessMessage(
        "Password reset link has been sent to your Email Address"
      );
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      setFetchError(error?.data?.message);
    }
  }, [isError, error]);

  const handleChange = (e) => {
    setFetchError("");
    setEmail(e.target?.value);
  };

  const canSave = [email].every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validEmail) return;
    try {
      await doForgotPassword({ email: email }).unwrap();
      setEmail("");
    } catch (error) {
      setFetchError(
        error?.data?.message ?? "Failed to send Password reset link"
      );
    }
  };

  return (
    <EmailVerifyPageExcerpt
      fetchError={fetchError}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      canSave={canSave}
      email={email}
      validEmail={validEmail}
      handleChange={handleChange}
      successMessage={successMessage}
    />
  );
};

export default EmailVerifyPage;
