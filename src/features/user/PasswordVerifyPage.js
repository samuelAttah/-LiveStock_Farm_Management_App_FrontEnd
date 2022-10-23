import { useState, useEffect } from "react";
import PasswordVerifyPageExcerpt from "./PasswordVerifyPageExcerpt";
import { useVerifyPasswordMutation } from "./userApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useTitle from "../../common/hooks/useTitle";

const PasswordVerifyPage = () => {
  useTitle("Farm Diary | Verify Password");
  const navigate = useNavigate();

  const [fetchError, setFetchError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [doVerify, { isError, isSuccess, error, isLoading }] =
    useVerifyPasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Verified Successfully", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      navigate("/dashboard/changepassword", {
        state: { oldPassword: password },
        replace: true,
      });
    }
  }, [isSuccess, navigate, password]);

  useEffect(() => {
    if (isError) {
      setFetchError(error?.data?.message);
    }
  }, [isError, error]);

  const handleChange = (e) => {
    setFetchError("");
    setPassword(e.target?.value);
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const canSave = [password].every(Boolean);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await doVerify({ oldPassword: password }).unwrap();
    } catch (error) {
      setFetchError(error?.data?.message);
    }
  };

  return (
    <PasswordVerifyPageExcerpt
      fetchError={fetchError}
      handleSubmit={handleSubmit}
      isLoading={isLoading}
      canSave={canSave}
      password={password}
      handleChange={handleChange}
      showPassword={showPassword}
      handleShowPassword={handleShowPassword}
    />
  );
};

export default PasswordVerifyPage;
