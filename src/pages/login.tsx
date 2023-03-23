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
import { useEffect } from "react";
import { Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { authLogin } from "src/endpoints/auth";
import useFormMutation from "src/hooks/useFormMutation";
import { useStore } from "../store";

const Login = () => {
  const token = localStorage.getItem("auth_token");
  const navigate = useNavigate();
  const theme = useTheme();
  const { setAdminData } = useStore();
  const {
    mutate,
    isLoading,
    validationErrors,
    handleSubmit,
    control,
    register,
    reset,
    toastId,
    toast,
  } = useFormMutation({
    mutationFn: authLogin,
    queryKeys: ["auth"],
    successMessage: "Logged in successfully!",
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
    navigate,
    path: "/email/verification",
  });

  useEffect(() => {
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate, token]);

  const onSubmit = ({ email }: { email: string }) => {
    toastId.current = toast.loading("Logging in...");
    setAdminData({
      email,
    });
    mutate(email);
    reset();
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
                        {...register("email", {
                          required: "Email is required",
                        })}
                        helperText={validationErrors?.email?.message}
                        error={!!validationErrors.email}
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
