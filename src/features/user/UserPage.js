import { useEffect, useState } from "react";
import UserPageExcerpt from "./UserPageExcerpt";
import {
  useGetUserDetailQuery,
  useRemoveProfilePictureMutation,
  useUploadProfilePictureMutation,
} from "./userApiSlice";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const UserPage = () => {
  const [errors, setErrors] = useState("");
  const [localFile, setLocalFile] = useState(null);

  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  //STATE FOR MODAL
  const [open, setOpen] = useState(false);

  //USING RTK CUSTOM HOOKS
  const [doUpload, { isError, error, isLoading }] =
    useUploadProfilePictureMutation();

  const [
    doRemove,
    {
      isLoading: isRemovePictureLoading,
      isError: isRemovePictureError,
      error: removePictureError,
    },
  ] = useRemoveProfilePictureMutation();

  const {
    data: userDetails = {},
    // isError,
    // isLoading,
    // error,
  } = useGetUserDetailQuery("userList", {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isRemovePictureError) {
      setErrors(removePictureError?.data?.message);
    }
  }, [isRemovePictureError, removePictureError]);

  useEffect(() => {
    if (isError) {
      setErrors(error?.data?.message);
    }
  }, [isError, error]);

  const arrayOfUserDetails = Object.keys(userDetails)?.length
    ? userDetails?.ids.map((id) => {
        return userDetails?.entities[id];
      })
    : [];

  const singleUserDetail = arrayOfUserDetails?.[0];

  //ARRAY OF ALLOWED FILE FORMATS
  const allowedFileFormats = ["jpg", "gif", "jpeg", "png"];

  //HANDLER FOR PICTURE CHANGE
  const handleImageUploadChange = (e) => {
    setLocalFile(e.target.files[0]);
  };

  //FUNCTION TO UPLOAD PROFILE PICTURE TO DATABASE AND RETURN URL
  const uploadImage = (username, file) => (onSuccess) => (onError) => {
    const fileName =
      file?.name.substring(file?.name.lastIndexOf("/") + 1) ||
      file?.path.substring(file.path.lastIndexOf("/") + 1);

    const ext = fileName.split(".").pop();

    if (file?.size >= 500000) {
      setErrors("File size should be less than 500KB");
      return;
    }

    if (!allowedFileFormats.includes(ext.toLowerCase())) {
      setErrors("Unacceptable File Format");
      return;
    }

    const name = fileName.split(".")[0];

    const newFileName = `${name.slice(0, 5)}${Date.now()}.${ext}`;
    const pathToFile = `/livestock-dairy/${username}/profilepix/${newFileName}`;

    const storageRef = ref(storage, pathToFile);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setIsUploading(true);
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error?.message),
      () => {
        setIsUploading(false);

        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            onSuccess(downloadURL);
          })
          .catch((error) => onError(error));
      }
    );
  };

  //HANDLER FOR PICTURE SUBMISSION
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      uploadImage(
        singleUserDetail?.username,
        localFile
      )(async (url) => {
        console.log("Downloadurl", url);
        await doUpload({ profilePicture: url }).unwrap();
        setLocalFile(null);
        setErrors("");
      })((error) => {
        setErrors(error?.data?.message);
      });
    } catch (error) {
      setErrors(error?.data?.message);
    }
  };

  //HANDLER FOR PICTURE REMOVAL
  const handleProfilePictureRemoval = async (e) => {
    try {
      await doRemove().unwrap();
    } catch (error) {
      setErrors(error?.data?.message);
    }
  };

  //HANDLERS FOR THE PICTURE MODAL
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <UserPageExcerpt
      singleUserDetail={singleUserDetail}
      handleImageUploadChange={handleImageUploadChange}
      handleSubmit={handleSubmit}
      progress={progress}
      isUploading={isUploading}
      errors={errors}
      localFile={localFile}
      handleOpen={handleOpen}
      open={open}
      handleClose={handleClose}
      isRemovePictureLoading={isRemovePictureLoading}
      handleProfilePictureRemoval={handleProfilePictureRemoval}
      isLoading={isLoading}
    />
  );
};

export default UserPage;
