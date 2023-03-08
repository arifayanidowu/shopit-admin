import { Paper, Typography, useMediaQuery } from "@mui/material";
import { DataGrid, GridColumnHeaders, GridRow } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect, useMemo, memo } from "react";
import { toast } from "react-toastify";
import { getAdminCounts } from "../../../../endpoints/getAdminCounts";

const MemoizedRow = memo(GridRow);
const MemoizedColumnHeaders = memo(GridColumnHeaders);

const RoleTable = () => {
  const matches = useMediaQuery("(max-width: 600px)");
  const { data, isLoading, error, isError } = useQuery(
    ["adminCounts"],
    getAdminCounts
  );

  useEffect(() => {
    if (isError) {
      const err = error as Error;
      toast.error(err.message);
    }
  }, [isError, error]);

  const rows = useMemo(
    () => [
      {
        id: 1,
        name: "Author",
        description: "Authors can manage only contents they create",
        users: data?.authors,
      },
      {
        id: 2,
        name: "Editor",
        description:
          "Editors can manage and publish contents including those of other admins.",
        users: data?.editors,
      },
      {
        id: 3,
        name: "SuperAdmin",
        description:
          "SuperAdmin's can access and manage all features and settings.",
        users: data?.superAdmins,
      },
    ],
    [data?.authors, data?.editors, data?.superAdmins]
  );

  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", flexGrow: 1 },
      {
        field: "name",
        headerName: "Name",
        minWidth: 150,
        // maxWidth: 200,
        // width: 300,
        sortable: false,
        filterable: false,
        flex: 1,
        // flexGrow: matches ? 1 : 0,
      },
      {
        field: "description",
        headerName: "Description",
        minWidth: 350,
        maxWidth: 200,
        width: matches ? 100 : 300,
        sortable: false,
        filterable: false,
        flex: 1,
      },
      {
        field: "users",
        headerName: "Users",
        minWidth: 150,
        maxWidth: 200,
        width: 300,
        sortable: false,
        filterable: false,
        flex: 1,
        // flexGrow: matches ? 1 : 0,
      },
    ],
    [matches]
  );

  return (
    <motion.div
      style={{
        width: "100%",
        position: "relative",
        overflowX: "scroll" as const,
      }}
      key="role"
      initial={{ opacity: 0, x: -2 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -2 }}
    >
      <Typography variant="h3">Roles</Typography>
      <Typography>List of roles</Typography>
      <Paper sx={{ width: "fit-content", minWidth: 300 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          slots={{
            noRowsOverlay: () => <Typography>No roles found</Typography>,
            row: MemoizedRow,
            columnHeaders: MemoizedColumnHeaders,
          }}
          sx={(theme) => ({
            bgcolor:
              theme.palette.mode === "light" ? "background.paper" : "#1f2228",
            width: "fit-content",
            borderRadius: 0,
          })}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
          autoHeight
          disableColumnMenu
          loading={isLoading}
        />
      </Paper>
    </motion.div>
  );
};

export default RoleTable;
