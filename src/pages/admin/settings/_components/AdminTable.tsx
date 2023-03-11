import { Delete } from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { AnimatePresence, motion } from "framer-motion";

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
    handleOnProcessRowUpdateError,
    setEntries,
    entriesText,
    entries,
  } = useMutate();

  const mutation = computeMutation(
    updatedArguments?.newRow,
    updatedArguments?.oldRow
  );

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, marginBottom: 2 }}
          exit={{ opacity: 0 }}
          key={entries.length}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography>
              {entries.length ? entriesText : "List of admins"}
            </Typography>
            {entries.length ? (
              <Button
                color="error"
                variant="contained"
                size="small"
                startIcon={<Delete />}
              >
                Delete
              </Button>
            ) : null}
          </Stack>
        </motion.div>
      </AnimatePresence>
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
            setEntries(newSelection);
          }}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleOnProcessRowUpdateError}
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
          hideFooterSelectedRowCount
        />
      </Box>
    </>
  );
};

export default AdminTable;
