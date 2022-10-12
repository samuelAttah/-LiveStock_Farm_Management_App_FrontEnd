import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
// import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
};

const ProfilePictureModal = ({
  handleClose,
  open,
  profilePicture,
  handleImageUploadChange,
  handleSubmit,
  localFile,
  isUploading,
  errors,
  progress,
  handleProfilePictureRemoval,
  isRemovePictureLoading,
  isLoading,
}) => {
  return (
    <div>
      <Modal
        open={open}
        // onClose={handleClose}
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
            <Typography id="modal-modal-title" mr={15} fontWeight="bold">
              Profile Picture
            </Typography>
          </Box>

          <Card sx={{ mt: 1 }}>
            {profilePicture ? (
              <CardMedia
                component="img"
                height="300"
                image={profilePicture}
                alt="profile picture"
              />
            ) : (
              <CardMedia
                component="img"
                height="300"
                image="../../user_icon.png"
                alt="profile picture"
              />
            )}
          </Card>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography sx={{ mt: 1 }} fontSize={12}>
              Change Photo:
            </Typography>
            {/* <OutlinedInput
              type="file"
              
              sx={{ mr: 2, mt: 1 }}
              size="small"
            /> */}
            <Box sx={{ mt: 1.5 }}>
              <input
                type="file"
                accept=".png, .jpg, .jpeg, .gif"
                onChange={handleImageUploadChange}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{ height: 20, mt: 2 }}
              onClick={handleSubmit}
              disabled={!localFile || isLoading}
            >
              {isLoading ? "Uploading" : "Upload"}
            </Button>
          </Box>
          <Box>
            <Button
              type="submit"
              variant="contained"
              size="small"
              sx={{ height: 20, mt: 0.5 }}
              disabled={isRemovePictureLoading || !profilePicture}
              onClick={handleProfilePictureRemoval}
              color="error"
            >
              {isRemovePictureLoading ? "Removing Photo ..." : "Remove Photo"}
            </Button>
          </Box>

          {isUploading ? (
            <Box sx={{ width: "50" }} mt={1}>
              <LinearProgress value={progress} />
              <Typography>{`${progress}%`}</Typography>
            </Box>
          ) : null}

          {errors ? (
            <Typography color="red" fontSize="12px" fontFamily="Cursive" mt={1}>
              {errors}
            </Typography>
          ) : null}
        </Box>
      </Modal>
    </div>
  );
};

export default ProfilePictureModal;
