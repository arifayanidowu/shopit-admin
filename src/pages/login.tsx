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
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Id, toast } from "react-toastify";
import { ColorModeContext } from "../App";
import { authLogin } from "../endpoints/authLogin";
import { useStore } from "../store";

const Login = () => {
  const navigate = useNavigate();
  const { toggleColorMode } = useContext(ColorModeContext);
  const theme = useTheme();
  const { setAdminData } = useStore();
  const [email, setEmail] = useState("");
  let toastId: Id;
  const token = localStorage.getItem("auth_token");

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
      setAdminData({
        email,
      });

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

  return (
    <Box>
      <Box
        sx={{
          margin: "60px",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Typography
            align="center"
            variant="h6"
            sx={{
              textDecoration: "underline",
              width: "fit-content",
              mx: "auto",
            }}
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
        </Link>
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
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  toastId = toast.loading("Logging in...");
                  mutate(email);
                }}
              >
                <Box sx={{ p: 3 }}>
                  <InputLabel
                    sx={{ fontWeight: "bold", textTransform: "uppercase" }}
                  >
                    Email Address
                  </InputLabel>
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button
                    sx={{ textTransform: "uppercase", p: 2, mt: 3 }}
                    variant="contained"
                    fullWidth
                    endIcon={
                      isLoading ? (
                        <CircularProgress color="inherit" size={20} />
                      ) : null
                    }
                    type="submit"
                  >
                    {isLoading ? "Verifying..." : "Sign In"}
                  </Button>
                </Box>
              </form>
              <Button onClick={toggleColorMode} color="inherit">
                Toggle color mode
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Login;
