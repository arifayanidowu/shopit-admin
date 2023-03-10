import { Button, Grid, Switch, Typography } from "@mui/material";
import {
  GridValueFormatterParams,
  GridRenderCellParams,
  DataGrid,
} from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { getAllAdmins } from "../../../../endpoints/admins";
import { useStore } from "src/store";
import AddUserModal from "./AddUserModal";
import DeleteAdmin from "./DeleteAdmin";

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
  const [openModal, setOpenModal] = useState(false);

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
        disableClickEventBubbling: true,
        renderCell: (params: GridRenderCellParams<IData>) => (
          <Switch
            checked={params.row.active as boolean}
            onChange={(e) => {
              console.log({ e, params });
              params.row.active = e.target.checked;
              params.value = e.target.checked;
            }}
            color="secondary"
          />
        ),
      },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 250,
        type: "dateTime",
        editable: true,
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
      {
        field: "actions",
        headerName: "Actions",
        width: 130,
        renderCell: (params: GridRenderCellParams<IData>) => (
          <DeleteAdmin id={params.row.id} />
        ),
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

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <motion.div
      style={{
        position: "relative",
        width: "100%",
        overflowX: "scroll" as const,
      }}
      key="user"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.2, easings: ["easeIn", "easeInOut"] }}
    >
      <AddUserModal open={openModal} handleClose={handleCloseModal} />
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3">Admins</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenModal(true)}
            disableElevation
          >
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
          "& .MuiDataGrid-row": {
            overflowY: "scroll" as const,
          },
        })}
      />
    </motion.div>
  );
};

export default AdminTable;
