import { Button, Grid, Typography } from "@mui/material";
import { GridValueFormatterParams } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { getAllAdmins } from "../../../../endpoints/admins";
import { useStore } from "src/store";

type IData = {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const AdminTable = () => {
  const { adminData } = useStore();
  const { data, isLoading, error, isError } = useQuery<IData[]>(
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
      {
        field: "role",
        headerName: "Role",
        width: 130,
        type: "singleSelect",
        editable:
          adminData.role === "SuperAdmin" ||
          (adminData.role === "Editor" && true),
        valueOptions: ["Author", "Editor", "SuperAdmin"],
      },
      {
        field: "active",
        headerName: "Active",
        width: 130,
        type: "boolean",
        editable:
          (adminData.role === "SuperAdmin" || adminData.role === "Editor") &&
          true,
      },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 250,
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
        width: 250,
        valueFormatter: (params: GridValueFormatterParams<Date>) => {
          if (params.value == null) {
            return "";
          }
          return moment(params.value as Date).format("MMMM Do YYYY, h:mm:ss A");
        },
      },
    ],
    [adminData.role]
  );

  const processRowUpdate = useCallback((newRow: IData, oldRow: IData) => {
    console.log({ newRow, oldRow });
    return newRow;
  }, []);

  const rows = useMemo(
    () => data?.filter((item) => item.id !== adminData.id) ?? [],
    [data, adminData.id]
  );
  return (
    <motion.div
      style={{
        height: "50vh",
        position: "relative",
        width: "100%",
        overflowX: "scroll" as const,
      }}
      key="user"
      initial={{ opacity: 0, x: -2 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -2 }}
    >
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3">Admins</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            Add new user
          </Button>
        </Grid>
      </Grid>
      <Typography>List of admins</Typography>

      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
          columns: {
            columnVisibilityModel: {
              id: false,
            },
          },
        }}
        processRowUpdate={processRowUpdate}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection={
          adminData.role === "SuperAdmin" || adminData.role === "Editor"
            ? true
            : false
        }
        disableRowSelectionOnClick
        loading={isLoading}
        autoHeight
        slots={{
          noRowsOverlay: () => <Typography>No roles found</Typography>,
        }}
        sx={(theme) => ({
          bgcolor:
            theme.palette.mode === "light" ? "background.paper" : "#1f2228",
          width: "100%",
          borderRadius: 0,
          fontFamily: "Abel",
        })}
      />
    </motion.div>
  );
};

export default AdminTable;
