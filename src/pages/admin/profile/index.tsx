import { Check, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast, Id } from "react-toastify";

import AnimateContainer from "src/components/shared/AnimateContainer";
import DropzoneContent from "src/components/shared/DropzoneContent";
import EllipsisAnim from "src/components/shared/EllipsisAnim";
import { updateProfile } from "src/endpoints/admins";
import useFileHandler from "src/hooks/useFileHandler";
import { useStore } from "src/store";
import { toastOptions, toCapitalize } from "src/utils";

interface IProfile {
  name: string;
  email: string;
  username: string;
}

const Profile = () => {
  let toastId: Id;
  const queryClient = useQueryClient();
  const { adminData } = useStore();
  const { file, image, getInputProps, getRootProps, isDragActive } =
    useFileHandler();
  const { setValue, control, handleSubmit } = useForm<IProfile>({
    defaultValues: {
      name: "",
      email: "",
      username: "",
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(["profile"]);
      toast.update(toastId, {
        ...toastOptions({
          render: "Profile updated successfully!",
          type: "success",
        }),
      });
    },
    onError: (error) => {
      const err = error as Error;
      toast.update(toastId as Id, {
        ...toastOptions({
          render: err.message,
          type: "error",
        }),
      });
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
      toastId = toast.loading("Updating profile...");
      mutate(formData);
    })();
  };

  return (
    <AnimateContainer
      subtitle={toCapitalize(adminData?.username) ?? adminData?.name}
      ActionButton={
        <Button
          variant="contained"
          startIcon={
            isLoading ? (
              <CircularProgress size={14} color="inherit" />
            ) : (
              <Check />
            )
          }
          onClick={onSave}
        >
          {isLoading ? (
            <>
              Processing
              <EllipsisAnim />
            </>
          ) : (
            "Save"
          )}
        </Button>
      }
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
                        variant="outlined"
                        sx={{ mb: 4 }}
                        {...field}
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
                        variant="outlined"
                        sx={{ mb: 4 }}
                        {...field}
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
