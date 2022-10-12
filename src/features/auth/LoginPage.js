import { useState } from "react";
import LoginComponent from "./LoginComponent";
import { useLoginMutation } from "./authApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import usePersistUser from "../../common/hooks/usePersistUser";
import { setCredentials } from "./authSlice";
import { selectCurrentToken } from "./authSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/dashboard";

  const [login, { isLoading }] = useLoginMutation();

  const accessToken = useSelector(selectCurrentToken);

  const [persist, setPersist] = usePersistUser();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [fetchError, setFetchError] = useState("");

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFetchError("");
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const formIsValid = () => {
    const { username, password } = formData;
    const errors = {};
    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";

    setErrors(errors);
    // form is valid if object properties are empty
    return Object.keys(errors).length === 0;
  };

  const canSave = [formData.username, formData.password].every(Boolean);

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formIsValid()) return;
    try {
      const { accessToken } = await login(formData).unwrap();
      console.log(accessToken);
      dispatch(setCredentials({ accessToken }));
      toast.success("Login Success", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
      });
      navigate(from, { replace: true });
    } catch (error) {
      setFetchError(error?.data?.message);
    }
  };

  return accessToken ? (
    <Navigate to="/dashboard" />
  ) : (
    <LoginComponent
      handleSubmit={handleSubmit}
      formData={formData}
      handleChange={handleChange}
      errors={errors}
      fetchError={fetchError}
      isLoading={isLoading}
      canSave={canSave}
      togglePersist={togglePersist}
      persist={persist}
    />
  );
};

export default LoginPage;
