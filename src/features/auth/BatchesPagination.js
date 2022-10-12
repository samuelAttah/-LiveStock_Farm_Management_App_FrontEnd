import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

const BatchesPagination = ({ setPagination, count, pageSize }) => {
  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;

    setPagination({ from: from, to: to });
  };
  return (
    <Box display={"flex"} justifyContent="center" alignItems={"center"} my={4}>
      <Pagination
        count={Math.ceil(count / pageSize)}
        color="primary"
        onChange={handlePageChange}
      />
    </Box>
  );
};

export default BatchesPagination;
