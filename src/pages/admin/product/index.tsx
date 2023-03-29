import { Button } from "@mui/material";
import { GridToolbar } from "@mui/x-data-grid";
import CustomTable from "src/components/CustomTable";
import PageLoader from "src/components/PageLoader";
import AnimateContainer from "src/components/shared/AnimateContainer";
import ConfirmDialog from "src/components/shared/ConfirmDialog";
import { adminActions } from "src/utils/adminActions";
import AddProductModal from "./_components/AddProductModal";
import useProduct from "./_hooks/useProduct";

const Products = () => {
  const {
    data,
    isLoading,
    columns,
    processRowUpdate,
    productId,
    handleOpen,
    handleClose,
    handleCloseConfirm,
    handleRowModesModelChange,
    handleRowEditStart,
    handleRowEditStop,
    open,
    openConfirm,
    handleConfirm,
    rowModesModel,
    adminData,
    onProcessRowUpdateError,
  } = useProduct();

  if (isLoading) return <PageLoader />;

  return (
    <AnimateContainer
      title="Products"
      subtitle="List of Products"
      ActionButton={
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Product
        </Button>
      }
    >
      <AddProductModal {...{ open, handleClose }} />
      <ConfirmDialog
        open={openConfirm}
        handleClose={handleCloseConfirm}
        message={`Are you sure you want to delete product with ID: ${productId}`}
        onConfirm={handleConfirm}
      />
      <CustomTable
        rows={data! ?? []}
        columns={columns}
        loading={isLoading}
        checkboxSelection={false}
        editMode="row"
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={onProcessRowUpdateError}
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
          columns: {
            columnVisibilityModel: {
              id: false,
              actions: adminActions(adminData, "Create"),
            },
          },
        }}
        onOpenModal={handleOpen}
      />
    </AnimateContainer>
  );
};

export default Products;
