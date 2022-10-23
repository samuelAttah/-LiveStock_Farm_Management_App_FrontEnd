import useTitle from "../hooks/useTitle";
const PageNotFound = () => {
  useTitle("Farm Diary | Page Not Found");

  return (
    <div
      style={{ color: "red", fontSize: 25, marginTop: 50, fontWeight: "bold" }}
    >
      404 Error! Page Not Found
    </div>
  );
};

export default PageNotFound;
