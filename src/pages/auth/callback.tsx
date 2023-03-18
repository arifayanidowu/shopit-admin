import { Box, Button, Card, CardContent, SvgIcon, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageLoader from "src/components/PageLoader";
import { getMagicToken } from "src/endpoints/auth";
import { ReactComponent as UnauthorizedIcon } from './_svgs/unauthorized.svg'



const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const { isLoading, isSuccess, isError } = useQuery(["magicToken"], () =>
    getMagicToken(token!),
    {
      enabled: !!token,
      retry: false,
    }
  );

  useEffect(() => {
    if (!isLoading && isSuccess) {
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 2000);
    }
  }, [isLoading, isSuccess, navigate]);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate])

  if (isLoading) return <PageLoader />

  if (isError) {
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
            <SvgIcon component={UnauthorizedIcon} inheritViewBox fontSize="large" sx={{
              fontSize: '8rem',
            }} />
            <Typography variant="h3">Token has expired/broken</Typography>
            <Button onClick={() => {
              navigate("/");
            }}>
              Login Again
            </Button>
          </CardContent>
        </Card>
      </Box>
    )
  }

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
