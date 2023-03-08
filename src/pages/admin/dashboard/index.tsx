import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useStore } from "../../../store";

const Dashboard = () => {
  const { adminData } = useStore();
  return (
    <Box>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Welcome Back, {adminData.name}
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <Typography variant="h6" gutterBottom fontWeight="medium">
            Overview
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  bgcolor: "pink",
                  height: "200px",
                  p: 1,
                }}
              >
                <Stack direction={"row"} spacing={1}>
                  <Typography>Total Users</Typography>
                  <Chip
                    label={`27.8%`}
                    size="small"
                    color="primary"
                    icon={<ArrowUpward />}
                  />
                </Stack>
                <Typography variant="h2">999.2k</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  bgcolor: "#b9d8d8",
                  height: "200px",
                  p: 1,
                }}
              >
                <Stack direction={"row"} spacing={1}>
                  <Typography>Total Orders</Typography>
                  <Chip
                    label={`11.6%`}
                    size="small"
                    color="error"
                    icon={<ArrowDownward />}
                  />
                </Stack>
                <Typography variant="h2">3999.2k</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  bgcolor: "#cccce3",
                  height: "200px",
                  p: 1,
                }}
              >
                <Stack direction={"row"} spacing={1}>
                  <Typography>Total Sales</Typography>
                  <Chip
                    label={`10.2%`}
                    size="small"
                    color="warning"
                    icon={<ArrowDownward />}
                  />
                </Stack>
                <Typography variant="h2">99.2k</Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              sx={(theme) => ({
                height: "400px",
                // mt: 10,
                [theme.breakpoints.down("md")]: {
                  width: 300,
                },
              })}
            >
              <Card
                sx={{
                  maxHeight: 405,
                  position: "relative",
                }}
                square
                elevation={0}
              >
                <Box
                  sx={{
                    position: "absolute",
                    zIndex: 1,
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "#000",
                    opacity: 0.6,
                  }}
                />
                <CardMedia
                  height={300}
                  component="img"
                  image="/adidas-sport.jpeg"
                  title="Cover Image"
                />
                <CardContent
                  sx={{ position: "absolute", bottom: 10, zIndex: 2 }}
                >
                  <Typography
                    sx={(theme) => ({ color: theme.palette.common.white })}
                    variant="h4"
                    gutterBottom
                  >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quos, officiis?
                  </Typography>
                  <Button variant="contained" size="large">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom fontWeight="medium">
            Popular Listings
          </Typography>
          <Box
            sx={{
              bgcolor: "#ffb6c3",
              height: "60vh",
              overflowY: "scroll",
              p: 1,
            }}
          >
            <Typography>Order 1</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
