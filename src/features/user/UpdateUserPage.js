import { useEffect, useState } from "react";
import UpdateUserPageExcerpt from "./UpdateUserPageExcerpt";
import { useGetUserDetailQuery } from "./userApiSlice";
import MenuItem from "@mui/material/MenuItem";
import dayjs from "dayjs";
import { storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useUpdateUserDetailMutation } from "./userApiSlice";
import { useNavigate } from "react-router-dom";

const UpdateUserPage = () => {
  const [phoneValue, setPhoneValue] = useState();

  const navigate = useNavigate();

  const EMAIL_REGEX =
    /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    homeAddress: "",
    occupation: "",
    farmName: "",
    workAddress: "",
  });

  const [birthDay, setBirthDay] = useState(dayjs());

  const [localFile, setLocalFile] = useState(null);

  const [validEmail, setValidEmail] = useState(Boolean);

  const [errors, setErrors] = useState("");
  const [networkError, setNetworkError] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  //USING RTK CUSTOM HOOKS
  const [doUpdate, { isError, isLoading, error, isSuccess }] =
    useUpdateUserDetailMutation();
  const {
    data: userDetails = {},
    isError: isUserDetailsError,
    isLoading: isUserDetailsLoading,
    error: userDetailsError,
    isSuccess: isUserDetailsSuccess,
  } = useGetUserDetailQuery("userList", {
    refetchOnMountOrArgChange: true,
  });

  const arrayOfUserDetails = Object.keys(userDetails)?.length
    ? userDetails?.ids.map((id) => {
        return userDetails?.entities[id];
      })
    : [];

  const singleUserDetail = arrayOfUserDetails?.[0];

  //USEFEECT TO SET USERDATA ON PAGE MOUNT
  useEffect(() => {
    if (isUserDetailsSuccess) {
      setFormData({
        firstName: singleUserDetail?.firstName ?? "",
        lastName: singleUserDetail?.lastName ?? "",
        gender: singleUserDetail?.gender ?? "",
        email: singleUserDetail?.email ?? "",
        homeAddress: singleUserDetail?.homeAddress ?? "",
        farmName: singleUserDetail?.farmName ?? "",
        workAddress: singleUserDetail?.workAddress ?? "",
        occupation: singleUserDetail?.occupation ?? "",
      });
      setPhoneValue(`+${String(singleUserDetail?.phoneNumber)}` ?? null);
      setBirthDay(dayjs(singleUserDetail?.birthDay.split("T")[0]));
      setNetworkError("");
    }
  }, [isUserDetailsSuccess, singleUserDetail]);

  //USEEFFECT TO SET NETWORK ERROR IF UPLOADING FAILS
  useEffect(() => {
    if (isError) {
      setNetworkError(error?.data?.message);
    }
  }, [isError, error]);

  //USEEFFECT FOR REDIRECTION ON SUCCESS
  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard/userdetails", { replace: true });
    }
  }, [isSuccess, navigate]);

  //USEEFFECT FOR VALIDATING EMAIL WITH REGEX
  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(formData.email));
  }, [formData.email]);

  //HANDLE FORMDATA CHANGES
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleImageUploadChange = (e) => {
    setLocalFile(e.target.files[0]);
  };

  const { homeAddress, gender, email, farmName, firstName, lastName } =
    formData;

  const canSave = [
    homeAddress,
    gender,
    email,
    farmName,
    firstName,
    lastName,
    phoneValue,
    birthDay,
  ].every(Boolean);

  const allowedFileFormats = ["jpg", "jpeg", "png"];

  //FUNCTION TO UPLOAD COMPANY LOGO TO FIREBASE AND RETURN URL
  const uploadImage = (username, file) => (onSuccess) => (onError) => {
    const fileName =
      file?.name.substring(file?.name.lastIndexOf("/") + 1) ||
      file?.path.substring(file.path.lastIndexOf("/") + 1);

    const ext = fileName.split(".").pop();

    if (file?.size >= 250000) {
      setErrors("Logo size should be less than 250KB");
      return;
    }

    if (!allowedFileFormats.includes(ext.toLowerCase())) {
      setErrors("Unacceptable File Format");
      return;
    }

    const name = fileName.split(".")[0];

    const newFileName = `${name.slice(0, 5)}${Date.now()}.${ext}`;
    const pathToFile = `/livestock-dairy/${username}/companylogo/${newFileName}`;

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payLoad = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      gender: formData.gender,
      homeAddress: formData.homeAddress,
      occupation: formData.occupation,
      farmName: formData.farmName,
      workAddress: formData.farmAddress,
      phoneNumber: Number(phoneValue.split("+")[1]) ?? 234,
      birthday: birthDay.format("YYYY-MM-DD"),
    };
    try {
      if (!validEmail) return;
      if (localFile) {
        uploadImage(
          singleUserDetail?.username,
          localFile
        )(async (url) => {
          // console.log("Downloadurl", url);
          await doUpdate({ ...payLoad, companyLogo: url }).unwrap();
          setLocalFile(null);
          setErrors("");
        })((error) => {
          setNetworkError(error?.data?.message);
        });
      } else {
        await doUpdate(payLoad).unwrap();
      }
    } catch (error) {
      setNetworkError(error?.data?.message);
    }
  };

  const genderList = [
    { name: "Male" },
    { name: "Female" },
    { name: "Transgender" },
  ];

  const genderOptions = genderList.map((gender) => (
    <MenuItem value={gender.name} key={gender.name}>
      {gender.name}
    </MenuItem>
  ));

  return (
    <>
      {isUserDetailsSuccess && Object.keys(singleUserDetail).length ? (
        <UpdateUserPageExcerpt
          singleUserDetail={singleUserDetail}
          phoneValue={phoneValue}
          handleChange={handleChange}
          setPhoneValue={setPhoneValue}
          formData={formData}
          genderOptions={genderOptions}
          handleSubmit={handleSubmit}
          birthDay={birthDay}
          setBirthDay={setBirthDay}
          handleImageUploadChange={handleImageUploadChange}
          localFile={localFile}
          errors={errors}
          isLoading={isLoading}
          networkError={networkError}
          isUploading={isUploading}
          progress={progress}
          canSave={canSave}
          validEmail={validEmail}
        />
      ) : null}
      {isUserDetailsLoading ? <p> Loading...</p> : null}
      {!isUserDetailsLoading && isUserDetailsError ? (
        <p>{userDetailsError?.data?.message}</p>
      ) : null}
    </>
  );
};

export default UpdateUserPage;
