import { CardContent, Typography } from "@mui/material";
import { Card } from "@mui/material";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store";

const EmailVerify = () => {
  const { adminData } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  return (
    <Box
      sx={{
        p: 10,
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          margin: "10px auto",
        }}
      >
        <CardContent
          sx={{
            textAlign: "center",
          }}
        >
          <Typography variant="h1">
            <span role="img" aria-label="email">
              📧
            </span>
          </Typography>
          <Typography variant="h3">An email has been sent to</Typography>
          <Typography variant="h6">{adminData.email}!</Typography>
          <Typography sx={{ mt: 5 }}>
            Go to your email address and click the link to login to your account
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EmailVerify;
