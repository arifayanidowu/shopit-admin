import React from "react";

import CustomTable from "src/components/CustomTable";
import ConfirmDialog from "src/components/shared/ComfirmDialog";
import useMutate from "../_hooks/useMutate";
import DeleteManyAdmins from "./DeleteManyAdmins";


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
    updatedArguments?.newRow!,
    updatedArguments?.oldRow!
  );

  return (
    <>
      <DeleteManyAdmins {...{ entries, entriesText }} />
      <ConfirmDialog
        open={!!updatedArguments}
        handleClose={handleClose}
        message={`Are you sure you want to update ${mutation}`}
        onConfirm={handleConfirm}
      />
      <CustomTable
        rows={rows}
        columns={columns}
        onRowSelectionModelChange={(newSelection) => {
          setEntries(newSelection);
        }}
        loading={isLoading}
        rowSelectionModel={entries}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleOnProcessRowUpdateError}
        checkboxSelection={adminData.role === "SuperAdmin"}
        onOpenModal={() => setOpenModal(true)}
      />
    </>
  );
};

export default AdminTable;
