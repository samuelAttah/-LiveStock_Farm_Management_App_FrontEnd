import Container from "@mui/material/Container";

const CustomContainer = ({ children, width }) => {
  return (
    <div>
      <Container
        maxWidth={width ?? "xxl"}
        sx={{
          minHeight: "100vh",
          minWidth: "100vw",
          position: "relative",
        }}
      >
        {children}
      </Container>
    </div>
  );
};

export default CustomContainer;
