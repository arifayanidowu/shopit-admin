import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button } from "@mui/material";

import CustomTable from "src/components/CustomTable";
import PageLoader from "src/components/PageLoader";
import AnimateContainer from "src/components/shared/AnimateContainer";
import ConfirmDialog from "src/components/shared/ComfirmDialog";
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
    <>
      <AddBrandModal {...{ open, handleClose }} />
      <ConfirmDialog
        open={openConfirm}
        handleClose={handleCloseConfirm}
        message={`Are you sure you want to delete brand with ID: ${brandId}`}
        onConfirm={handleConfirm}
      />
      <AnimateContainer
        title="Brands"
        subtitle="List of Brands"
        ActionButton={
          <Button
            variant="contained"
            color="primary"
            startIcon={
              <FontAwesomeIcon
                icon={faPlus}
                style={{
                  fontSize: "1rem",
                }}
                aria-hidden="true"
                opacity={0.5}
              />
            }
            onClick={handleOpen}
          >
            Add Brand
          </Button>
        }
      >
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
          />
        </Box>
      </AnimateContainer>
    </>
  );
};

export default Brand;
