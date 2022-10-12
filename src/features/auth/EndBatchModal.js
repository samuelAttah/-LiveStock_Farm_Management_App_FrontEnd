import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
};

const EndBatchModal = ({
  handleClose,
  open,
  handleSubmit,
  errors,
  isLoading,
  isError,
}) => {
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box flexDirection="row-reverse" display="flex" mt="0px">
            {" "}
            <Tooltip title="Close">
              <IconButton
                sx={{
                  p: 0,
                  backgroundColor: "red",
                  ":hover": { backgroundColor: "red" },
                }}
                color="secondary"
                onClick={handleClose}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
            <Typography
              id="modal-modal-title"
              mr={15}
              fontWeight="bold"
              fontSize={15}
              color="red"
            >
              END BATCH
            </Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography
              mt={5}
              fontSize={20}
              display="flex"
              textAlign={"center"}
              fontWeight="bold"
            >
              Once A Batch is Ended, it Can't be reversed. You will not be able
              to create or update Batch details, However you can view Batch
              anytime you want.
            </Typography>
          </Box>
          <Box
            display={"flex"}
            justifyContent="space-between"
            flexDirection={"row"}
            mt={6}
          >
            <Button
              type="submit"
              variant="contained"
              size="medium"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="medium"
              disabled={isLoading}
              onClick={handleSubmit}
              color="error"
            >
              Continue
            </Button>
          </Box>

          {isError ? (
            <Typography color="red" fontSize={14} fontFamily="Cursive" mt={1}>
              {errors}
            </Typography>
          ) : null}
        </Box>
      </Modal>
    </div>
  );
};

export default EndBatchModal;
