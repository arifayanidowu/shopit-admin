import { Typography } from "@mui/material";
import { GridValueFormatterParams } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { getAllAdmins } from "../../../../endpoints/admins";

const AdminTable = () => {
  const { data, isLoading, error, isError } = useQuery(
    ["admins"],
    getAllAdmins
  );

  useEffect(() => {
    if (isError) {
      const err = error as Error;
      toast.error(err.message);
    }
  }, [isError, error]);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 130, hide: true },
      { field: "name", headerName: "Name", width: 130 },
      { field: "email", headerName: "Email", width: 200 },
      { field: "role", headerName: "Role", width: 130 },
      { field: "active", headerName: "Active", width: 130 },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 200,
        valueFormatter: (params: GridValueFormatterParams<Date>) => {
          if (params.value == null) {
            return "";
          }
          return moment(params.value as Date).format("MMMM Do YYYY, h:mm:ss A");
        },
      },
      {
        field: "updatedAt",
        headerName: "Updated At",
        width: 200,
        valueFormatter: (params: GridValueFormatterParams<Date>) => {
          if (params.value == null) {
            return "";
          }
          return moment(params.value as Date).format("MMMM Do YYYY, h:mm:ss A");
        },
      },
    ],
    []
  );

  return (
    <motion.div
      style={{
        height: "50vh",
        position: "relative",
        width: "100%",
        overflow: "scroll",
      }}
      key="user"
      initial={{ opacity: 0, x: -2 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -2 }}
    >
      <Typography variant="h3">Admins</Typography>
      <Typography>List of admins</Typography>

      <DataGrid
        rows={data! ?? []}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
        loading={isLoading}
        autoHeight
        slots={{
          noRowsOverlay: () => <Typography>No roles found</Typography>,
        }}
        sx={(theme) => ({
          bgcolor:
            theme.palette.mode === "light" ? "background.paper" : "#1f2228",
          width: "fit-content",
          borderRadius: 0,
        })}
      />
    </motion.div>
  );
};

export default AdminTable;
