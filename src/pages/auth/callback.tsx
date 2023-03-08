import { Box, Card, CardContent, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getMagicToken } from "../../endpoints/getMagicToken";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const { isLoading, isSuccess } = useQuery(["magicToken"], () =>
    getMagicToken(token!)
  );

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 2000);
    }
  }, [isLoading, isSuccess, navigate]);

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
          <Typography variant="h1">🎉</Typography>
          <Typography variant="h3">Logged in successfully!</Typography>
          <Typography sx={{ mt: 5 }}>Redirecting...</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AuthCallback;
