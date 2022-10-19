import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import usePersistUser from "../../common/hooks/usePersistUser";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import PulseLoader from "react-spinners/PulseLoader";

const PersistLogin = () => {
  const [persist] = usePersistUser();
  const token = useSelector(selectCurrentToken);

  const [loading, setLoading] = useState(true);

  const [refresh] = useRefreshMutation();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      // console.log("verifying refresh token");
      try {
        await refresh().unwrap();
      } catch (err) {
        console.error(err?.data?.message);
      } finally {
        isMounted && setLoading(false);
      }
    };

    !token && persist ? verifyRefreshToken() : setLoading(false);

    return () => (isMounted = false);

    // eslint-disable-next-line
  }, [persist]);

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : loading ? (
        <PulseLoader color="green" />
      ) : (
        <Outlet />
      )}
    </>
  );
};
export default PersistLogin;
