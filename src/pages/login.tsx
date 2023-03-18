import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  InputLabel,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Id, toast } from "react-toastify";
import { authLogin } from "src/endpoints/auth";
import { useStore } from "../store";

const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { setAdminData } = useStore();
  let toastId: Id;
  const token = localStorage.getItem("auth_token");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: (data) => {
      const errors: Record<string, any> = {};
      if (!data.email) {
        errors.email = { message: "Email is required" };
      }

      if (!data.email.includes("@")) {
        errors.email = { message: "Not a valid email address" };
      }

      return {
        values: data,
        errors,
      };
    },
  });

  useEffect(() => {
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate, token]);

  const { mutate, isLoading } = useMutation(authLogin, {
    onSuccess: (data) => {
      toast.update(toastId, {
        render: "Logged in successfully!",
        type: "success",
        autoClose: 2000,
        closeOnClick: true,
        closeButton: true,
      });
      navigate("/email/verification");

      setTimeout(() => {
        toast.dismiss(toastId);
      }, 2000);
    },
    onError: (error) => {
      const err = error as any;
      toast.update(toastId, {
        render: err.message,
        type: "error",
        autoClose: 2000,
        isLoading: false,
        closeOnClick: true,
        closeButton: true,
      });
      setTimeout(() => {
        toast.dismiss(toastId);
      }, 2000);
    },
  });

  const onSubmit = ({ email }: { email: string }) => {
    toastId = toast.loading("Logging in...");
    setAdminData({
      email,
    });
    mutate(email);
  };

  return (
    <Box>
      <Box
        sx={{
          margin: "60px",
        }}
      >
        <Typography
          align="center"
          variant="h6"
          to="/"
          sx={{
            textDecoration: "underline",
            width: "fit-content",
            mx: "auto",
            color: "inherit",
            display: "block",
          }}
          component={Link}
        >
          <Typography
            sx={{
              bgcolor: theme.palette.mode === "dark" ? "#fff" : "#000",
              color: theme.palette.mode === "dark" ? "#000" : "#fff",
              fontSize: 16,
              p: 1,
              pl: 1.5,
              pr: 1.5,
              fontWeight: "bold",
            }}
            variant="overline"
          >
            S
          </Typography>
          hopiT.
        </Typography>
        <Card
          square
          sx={{
            maxWidth: 600,
            margin: "10px auto",
          }}
          elevation={0}
        >
          <CardContent sx={{ p: 3 }}>
            <Box>
              <Typography
                align="center"
                fontWeight="bold"
                sx={{ textTransform: "uppercase" }}
              >
                Sign In
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box sx={{ p: 3 }}>
                  <InputLabel
                    sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                  >
                    Email Address
                  </InputLabel>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        {...field}
                        helperText={errors?.email?.message}
                        error={!!errors.email}
                      />
                    )}
                  />

                  <Button
                    sx={{ textTransform: "uppercase", p: 2, mt: 3 }}
                    variant="contained"
                    fullWidth
                    endIcon={
                      isLoading ? (
                        <CircularProgress color="inherit" size={14} />
                      ) : null
                    }
                    type="submit"
                  >
                    {isLoading ? "Processing..." : "Sign In"}
                  </Button>
                </Box>
              </form>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Login;
