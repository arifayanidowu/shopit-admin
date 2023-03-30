import { Box } from "@mui/material";

import CustomTable from "src/components/CustomTable";
import PageLoader from "src/components/PageLoader";
import AnimateContainer from "src/components/shared/AnimateContainer";
import ConfirmDialog from "src/components/shared/ConfirmDialog";
import { adminActions } from "src/utils/adminActions";
import AddBrandModal from "./_components/AddBrandModal";
import useBrand from "./_hooks/useBrand";

const Brand = () => {
  const {
    columns,
    data,
    handleOpen,
    handleClose,
    handleCloseConfirm,
    handleRowModesModelChange,
    handleRowEditStart,
    handleRowEditStop,
    open,
    openConfirm,
    brandId,
    processRowUpdate,
    isLoading,
    handleConfirm,
    rowModesModel,
    setRowModesModel,
    adminData,
  } = useBrand();

  if (isLoading) return <PageLoader />;

  return (
    <AnimateContainer
      title="Brands"
      subtitle="List of Brands"
      btnTitle="Add Brand"
      onClick={handleOpen}
    >
      <AddBrandModal {...{ open, handleClose }} />
      <ConfirmDialog
        open={openConfirm}
        handleClose={handleCloseConfirm}
        message={`Are you sure you want to delete brand with ID: ${brandId}`}
        onConfirm={handleConfirm}
      />
      <Box
        sx={{
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <CustomTable
          rows={data!}
          columns={columns}
          loading={isLoading}
          checkboxSelection={false}
          editMode="row"
          processRowUpdate={processRowUpdate}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          slotProps={{
            toolbar: { setRowModesModel },
          }}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
            columns: {
              columnVisibilityModel: {
                id: false,
                actions: adminActions(adminData, "Delete"),
              },
            },
          }}
          onOpenModal={handleOpen}
        />
      </Box>
    </AnimateContainer>
  );
};

export default Brand;
