import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Delete } from "@mui/icons-material";
import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

import AnimateContainer from "src/components/shared/AnimateContainer";
import DropzoneContent from "src/components/shared/DropzoneContent";
import EllipsisAnim from "src/components/shared/EllipsisAnim";
import { updateProfile } from "src/endpoints/admins";
import useFileHandler from "src/hooks/useFileHandler";
import useFormMutation from "src/hooks/useFormMutation";
import { useStore } from "src/store";
import { toCapitalize } from "src/utils";

interface IProfile {
  name: string;
  email: string;
  username: string;
}

const Profile = () => {
  const { adminData } = useStore();
  const { file, image, getInputProps, getRootProps, isDragActive } =
    useFileHandler();
  const {
    mutate,
    isLoading,
    validationErrors,
    handleSubmit,
    control,
    register,
    toastId,
    toast,
    setValue,
  } = useFormMutation<IProfile>({
    mutationFn: updateProfile,
    queryKeys: ["profile"],
    successMessage: "Profile updated successfully!",
    defaultValues: {
      name: "",
      email: "",
      username: "",
    },
  });

  useEffect(() => {
    if (adminData) {
      setValue("name", adminData?.name || "");
      setValue("email", adminData?.email || "");
      setValue("username", adminData?.username || "");
    }
  }, [adminData, setValue]);

  const onSave = () => {
    handleSubmit((data) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("username", data.username);
      if (file) {
        formData.append("avatar", file);
      }
      toastId.current = toast.loading("Updating profile...");
      mutate(formData);
    })();
  };

  return (
    <AnimateContainer
      subtitle={toCapitalize(adminData?.username) ?? adminData?.name}
      btnTitle={
        isLoading ? (
          <>
            Processing
            <EllipsisAnim />
          </>
        ) : (
          "Save"
        )
      }
      onClick={onSave}
      btnIcon={faCheck}
      isLoading={isLoading}
    >
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={12} md={3}>
            <DropzoneContent
              getRootProps={getRootProps}
              getInputProps={getInputProps}
              isDragActive={isDragActive}
              image={image || adminData.avatar}
              src={(image as string) ?? adminData.avatar}
              containerStyle={(theme) => ({
                height: "100%",
                width: "100%",
                overflow: "hidden",
                position: "relative",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                [theme.breakpoints.down("md")]: {
                  height: 200,
                },
                "&:hover": {
                  backgroundColor:
                    theme.palette.mode === "light"
                      ? theme.palette.grey[100]
                      : theme.palette.grey[900],
                },
              })}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <Paper square sx={{ p: 2 }}>
              <Box sx={{ p: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
                <Box>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Name"
                        required
                        variant="outlined"
                        sx={{ mb: 4 }}
                        {...field}
                        {...register("name", {
                          required: "Name is required",
                        })}
                        error={!!validationErrors?.name}
                        helperText={validationErrors?.name?.message}
                      />
                    )}
                  />

                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Email"
                        required
                        variant="outlined"
                        sx={{ mb: 4 }}
                        {...field}
                        {...register("email", {
                          required: "Email is required",
                        })}
                        error={!!validationErrors?.email}
                        helperText={validationErrors?.email?.message}
                      />
                    )}
                  />

                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        sx={{ mb: 4 }}
                        {...field}
                        {...register("username")}
                        error={!!validationErrors?.username}
                        helperText={validationErrors?.username?.message}
                      />
                    )}
                  />
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Box sx={{ mt: 12, mb: 10, display: "grid", placeItems: "center" }}>
          <Button
            startIcon={<Delete />}
            color="error"
            variant="contained"
            disableElevation
            size="large"
          >
            Delete Account
          </Button>
        </Box>
      </Box>
    </AnimateContainer>
  );
};

export default Profile;
