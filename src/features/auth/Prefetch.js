import store from "../../app/store";
import { batchesApiSlice } from "../batches/batchApiSlice";
import { userApiSlice } from "../user/userApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      batchesApiSlice.util.prefetch("getBatches", "batchesList", {
        force: true,
      })
    );
    store.dispatch(
      userApiSlice.util.prefetch("getUserDetail", "userList", {
        force: true,
      })
    );
  }, []);

  return <Outlet />;
};
export default Prefetch;
