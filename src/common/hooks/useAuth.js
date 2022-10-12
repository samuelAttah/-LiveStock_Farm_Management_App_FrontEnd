import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../features/auth/authSlice";
import jwt_decode from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  if (token) {
    const decoded = jwt_decode(token);
    const username = decoded.username;

    return { username };
  }
};
export default useAuth;
