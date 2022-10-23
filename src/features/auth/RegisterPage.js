import { useEffect, useState } from "react";
import RegisterComponent from "./RegisterComponent";
import { useRegisterMutation } from "./authApiSlice";
import { toast } from "react-toastify";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import useTitle from "../../common/hooks/useTitle";

const RegisterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useTitle("Farm Diary | Sign Up");

  const from = location.state?.from?.pathname || "/login";

  const accessToken = useSelector(selectCurrentToken);

  const USER_REGEX = /^[A-z]{3,20}$/;
  const PWD_REGEX = /^[A-z0-9!@#$%]{8,25}$/;
  const EMAIL_REGEX =
    /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

  const [register, { isLoading, isSuccess }] = useRegisterMutation();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
  });
  const [validUsername, setValidUsername] = useState(Boolean);
  const [validPassword, setValidPassword] = useState(Boolean);
  const [validEmail, setValidEmail] = useState(Boolean);

  const [fetchError, setFetchError] = useState("");

  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(formData.username));
  }, [formData.username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(formData.password));
  }, [formData.password]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(formData.email));
  }, [formData.email]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Register Success", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      navigate(from, { replace: true });
    }
  }, [isSuccess, navigate, from]);

  const handleChange = (e) => {
    setFetchError("");
    const { name, value } = e.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const formIsValid = () => {
    const { username, password, email } = formData;
    const errors = {};
    if (!username) errors.username = "Username is required";
    if (!(password.length >= 8)) errors.password = "Password is too Short";
    if (password.length > 25) errors.password = "Password is too Long";
    if (!email) errors.email = "Email is Required";

    setErrors(errors);
    // form is valid if object properties are empty
    return Object.keys(errors).length === 0;
  };

  const canSave = [formData.username, formData.password, formData.email].every(
    Boolean
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formIsValid()) return;
    if (!validEmail || !validPassword || !validUsername) return;
    try {
      await register(formData).unwrap();
    } catch (error) {
      if (error.code === "ERR_BAD_REQUEST") {
        return setFetchError("Invalid Username or Password");
      } else if (error.status === 401) {
        return setFetchError("Invalid Username or Password");
      }
      return setFetchError(error?.data?.message);
    }
  };

  return (
    <div>
      {accessToken ? (
        <Navigate to="/dashboard" />
      ) : (
        <RegisterComponent
          handleSubmit={handleSubmit}
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          fetchError={fetchError}
          isLoading={isLoading}
          canSave={canSave}
          validEmail={validEmail}
          validPassword={validPassword}
          validUsername={validUsername}
          showPassword={showPassword}
          handleShowPassword={handleShowPassword}
        />
      )}
    </div>
  );
};

export default RegisterPage;
