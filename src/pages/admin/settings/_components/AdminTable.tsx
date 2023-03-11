import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import ConfirmDialog from "src/components/shared/ComfirmDialog";
import useMutate from "../_hooks/useMutate";

const AdminTable = () => {
  const {
    rows,
    columns,
    isLoading,
    updatedArguments,
    processRowUpdate,
    adminData,
    computeMutation,
    handleClose,
    handleConfirm,
  } = useMutate();

  const mutation = computeMutation(
    updatedArguments?.newRow,
    updatedArguments?.oldRow
  );

  return (
    <Box
      component="div"
      sx={{ width: "100%", height: 350, overflowY: "hidden" }}
    >
      <ConfirmDialog
        open={!!updatedArguments}
        handleClose={handleClose}
        message={`Are you sure you want to update ${mutation}`}
        onConfirm={handleConfirm}
      />
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
        onRowSelectionModelChange={(newSelection) => {
          console.log(newSelection);
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
        // autoHeight
        slots={{
          noRowsOverlay: () => <Typography>No roles found</Typography>,
        }}
        sx={(theme) => ({
          bgcolor:
            theme.palette.mode === "light" ? "background.paper" : "#1f2228",
          borderRadius: 0,
          fontFamily: "Abel",
        })}
      />
    </Box>
  );
};

export default AdminTable;
