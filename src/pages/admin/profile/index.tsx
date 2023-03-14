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
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useForm, Controller } from "react-hook-form";
import { toast, Id } from "react-toastify";

import AnimateContainer from "src/components/shared/AnimateContainer";
import { updateProfile } from "src/endpoints/admins";
import { useStore } from "src/store";
import { wrapperStyle } from "./_utils";

interface IProfile {
    name: string;
    email: string;
    username: string;
}

const Profile = () => {
    let toastId: Id;
    const queryClient = useQueryClient();
    const { adminData } = useStore();
    const [file, setFile] = useState<File | null>(null);
    const [image, setImage] = useState<string | null>();
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
                render: "Profile updated successfully!",
                type: "success",
                autoClose: 2000,
                closeOnClick: true,
                closeButton: true,
            });
            setTimeout(() => {
                toast.dismiss(toastId as Id);
            }, 2000);
        },
        onError: (error) => {
            const err = error as Error;
            toast.update(toastId as Id, {
                render: err.message,
                type: "error",
                autoClose: 2000,
                isLoading: false,
                closeOnClick: true,
                closeButton: true,
            });

            setTimeout(() => {
                toast.dismiss(toastId as Id);
            }, 2000);
        },
    });

    useEffect(() => {
        if (adminData) {
            setValue("name", adminData?.name || "");
            setValue("email", adminData?.email || "");
            setValue("username", adminData?.username || "");
        }
    }, [adminData, setValue]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");
            reader.onload = () => {
                setFile(file);
                setImage(URL.createObjectURL(file));
            };
            reader.readAsArrayBuffer(file);
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "image/jpeg": [],
            "image/png": [],
            "image/jpg": [],
            "image/svg+xml": [],
        },
    });

    const onSave = () => {
        handleSubmit((data) => {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("username", data.username);
            if (file) {
                formData.append("avatar", file);
            }
            mutate(formData);
            toastId = toast("Updating profile...", {
                type: "info",
                isLoading: true,
                closeOnClick: false,
                closeButton: false,
            });
        })();
    };

    return (
        <AnimateContainer>
            <Box>
                <Grid container justifyContent={"space-between"} alignItems="center">
                    <Grid item>
                        <Typography variant="h3">Profile</Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            startIcon={isLoading ? <CircularProgress size={14} color="inherit" /> : <Check />}
                            onClick={onSave}
                        >
                            {isLoading ? "Processing..." : "Save"}
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={3}>
                        <Paper
                            square
                            sx={(theme) => ({
                                height: "100%",
                                width: "100%",
                                overflow: "hidden",
                                position: "relative",
                                [theme.breakpoints.down("md")]: {
                                    height: 200,
                                },
                            })}
                            {...getRootProps()}
                            component="div"
                        >
                            <input {...getInputProps()} />
                            {isDragActive ? (
                                <Box
                                    sx={{
                                        ...wrapperStyle
                                    }}
                                >
                                    <Typography variant="h6">Drop the files here ...</Typography>
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        ...wrapperStyle,
                                        zIndex: 1,
                                        wordWrap: "break-word",
                                        textAlign: "center",
                                    }}
                                >
                                    {image || adminData.avatar ? (
                                        <img
                                            src={(image as string) ?? adminData.avatar}
                                            alt="profile"
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    ) : (
                                        <Typography variant="h6">
                                            Drag 'n' drop some files here, or click to select files
                                        </Typography>
                                    )}
                                </Box>
                            )}
                        </Paper>
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
