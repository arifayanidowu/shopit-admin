import { Box, Button, SvgIcon, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

import ConfirmDialog from "src/components/shared/ComfirmDialog";
import useMutate from "../_hooks/useMutate";
import DeleteManyAdmins from "./DeleteManyAdmins";
import { ReactComponent as NoContentIcon } from './svgs/no-content.svg'


const AdminTable = ({ setOpenModal }: { setOpenModal: (value: React.SetStateAction<boolean>) => void }) => {
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
      <DeleteManyAdmins {...{ entries, entriesText }} />
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
          rowSelectionModel={entries}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleOnProcessRowUpdateError}
          pageSizeOptions={[5, 10, 25]}
          checkboxSelection={adminData.role === "SuperAdmin"}
          disableRowSelectionOnClick
          loading={isLoading}
          slots={{
            noRowsOverlay: () => <Box sx={{
              justifyContent: 'center',
              display: 'flex',
              alignItems: 'center',
              height: '100%',
              flexDirection: 'column',
              py: 10
            }}>
              <SvgIcon component={NoContentIcon} inheritViewBox fontSize="large" sx={{
                fontSize: '8rem',
              }} />
              <Typography variant="h6" align="center">
                No admins found
              </Typography>
              <Button variant="contained" onClick={() => setOpenModal(true)}>
                Add New Entry
              </Button>

            </Box>,
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
