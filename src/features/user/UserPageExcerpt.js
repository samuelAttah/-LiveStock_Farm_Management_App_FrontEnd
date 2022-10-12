import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import ProfilePictureModal from "./ProfilePictureModal";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import blue from "@mui/material/colors/blue";
import Divider from "@mui/material/Divider";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

const UserPageExcerpt = ({
  singleUserDetail,
  handleImageUploadChange,
  handleSubmit,
  isUploading,
  errors,
  progress,
  localFile,
  handleOpen,
  handleClose,
  open,
  isRemovePictureLoading,
  handleProfilePictureRemoval,
  isLoading,
}) => {
  return (
    <Container maxWidth="md">
      <Typography fontWeight="bold" fontSize="20px" mb={2}>
        User Profile
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Card>
            <Tooltip title="Change Picture">
              <CardActionArea onClick={handleOpen}>
                {singleUserDetail?.profilePicture ? (
                  <CardMedia
                    component="img"
                    height="140"
                    image={singleUserDetail?.profilePicture}
                    alt="profile picture"
                  />
                ) : (
                  <CardMedia
                    component="img"
                    height="140"
                    image="../../user_icon.png"
                    alt="profile picture"
                  />
                )}
              </CardActionArea>
            </Tooltip>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          {singleUserDetail?.firstName && singleUserDetail?.lastName ? (
            <Typography
              color={blue[500]}
              fontSize={25}
              display="flex"
              fontWeight="bold"
            >
              {singleUserDetail?.firstName} {singleUserDetail?.lastName}
            </Typography>
          ) : null}
          <Box display="flex" flexDirection="row" my={2}>
            <Typography color="gray" mr={1}>
              First Name:{" "}
            </Typography>
            {singleUserDetail?.firstName ? (
              <Typography>{singleUserDetail?.firstName} </Typography>
            ) : null}
          </Box>

          <Box display="flex" flexDirection="row" mb={2}>
            <Typography color="gray" mr={1}>
              Last Name:{" "}
            </Typography>
            {singleUserDetail?.lastName ? (
              <Typography>{singleUserDetail?.lastName} </Typography>
            ) : null}
          </Box>
          <Box mb={0} display="flex" flexDirection="row">
            <PersonIcon fontSize="small" />
            <Typography fontSize={13} fontWeight="bold" ml={1}>
              About
            </Typography>
          </Box>
          <Divider />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Box display="flex" mt={3} flexDirection="row">
            <Typography color="gray" fontSize={13}>
              WORK
            </Typography>
          </Box>
          <Divider />
          <Box textAlign="left" mt={1}>
            <Typography mr={1} fontSize={13} fontWeight="bold">
              Company/Farm Name:{" "}
            </Typography>
            {singleUserDetail?.farmName ? (
              <Typography color={blue[500]}>
                {singleUserDetail?.farmName}
              </Typography>
            ) : null}
          </Box>
          <Box textAlign="left" mt={1}>
            <Typography mr={1} fontSize={13} fontWeight="bold">
              Company/Farm Address:{" "}
            </Typography>
            {singleUserDetail?.workAddress ? (
              <Typography color={blue[500]}>
                {singleUserDetail?.workAddress}
              </Typography>
            ) : (
              <Link to="/dashboard/updateuserdetails">Update detail</Link>
            )}
          </Box>
          <Box textAlign="left" mt={1.5}>
            <Typography mr={1} fontSize={13} fontWeight="bold">
              Company/Farm Logo:{" "}
            </Typography>
            {singleUserDetail?.companyLogo ? (
              <CardMedia
                component="img"
                height="140"
                image={singleUserDetail?.companyLogo}
                alt="company picture"
              />
            ) : (
              <Link to="/dashboard/updateuserdetails/#companyLogo">
                Update detail
              </Link>
            )}
          </Box>
          <Box textAlign="left" mt={2}>
            <Typography fontSize={13} fontWeight="bold">
              Signed up on:
            </Typography>
            <Typography>{singleUserDetail?.createdAt.split("T")[0]}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box display="flex" mt={1} flexDirection="row" my={2.5}>
            <Typography color="gray" fontSize={13}>
              CONTACT INFORMATION
            </Typography>
          </Box>
          <Box display="flex" mt={1} flexDirection="row">
            <Typography mr={1}>Phone: </Typography>
            {singleUserDetail?.phoneNumber ? (
              <Typography color={blue[500]}>
                {`+${singleUserDetail?.phoneNumber}`}
              </Typography>
            ) : null}
          </Box>
          <Box display="flex" mt={1} flexDirection="row">
            <Typography mr={1}>Home Address: </Typography>
            {singleUserDetail?.homeAddress ? (
              <Typography>{singleUserDetail?.homeAddress}</Typography>
            ) : null}
          </Box>
          <Box display="flex" mt={1} flexDirection="row">
            <Typography mr={1}>E-mail: </Typography>
            {singleUserDetail?.email ? (
              <Typography color={blue[500]}>
                {singleUserDetail?.email}
              </Typography>
            ) : null}
          </Box>
          <Box display="flex" mt={1} flexDirection="row" my={2.5}>
            <Typography color="gray" fontSize={13}>
              BASIC INFORMATION
            </Typography>
          </Box>
          <Box display="flex" mt={1} flexDirection="row">
            <Typography mr={1}>Birth Day: </Typography>
            {singleUserDetail?.birthDay ? (
              <Typography>
                {singleUserDetail?.birthDay.split("T")[0]}
              </Typography>
            ) : null}
          </Box>
          <Box display="flex" mt={1} flexDirection="row">
            <Typography mr={1}>Gender: </Typography>
            {singleUserDetail?.gender ? (
              <Typography>{singleUserDetail?.gender}</Typography>
            ) : null}
          </Box>
        </Grid>
      </Grid>

      <ProfilePictureModal
        open={open}
        handleClose={handleClose}
        profilePicture={singleUserDetail?.profilePicture}
        handleImageUploadChange={handleImageUploadChange}
        handleSubmit={handleSubmit}
        localFile={localFile}
        isUploading={isUploading}
        errors={errors}
        progress={progress}
        handleProfilePictureRemoval={handleProfilePictureRemoval}
        isRemovePictureLoading={isRemovePictureLoading}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default UserPageExcerpt;
