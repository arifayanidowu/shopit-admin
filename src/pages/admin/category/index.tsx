import { useEffect, useMemo, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, useMediaQuery } from "@mui/material";
import { GridValueFormatterParams } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { toast } from "react-toastify";

import CustomTable from "src/components/CustomTable";
import AnimateContainer from "src/components/shared/AnimateContainer";
import { getCategories } from "src/endpoints/category";
import { useStore } from "src/store";
import { adminActions } from "src/utils/adminActions";
import { Category as ICategory } from "src/types";
import PageLoader from "src/components/PageLoader";
import CreateCategoryModal from "./CreateCategoryModal";
import { getActions } from "src/components/shared/getActions";
import useTableEdit from "src/hooks/useTableEdit";
import { GridRowModel } from "@mui/x-data-grid";
import ConfirmDialog from "src/components/shared/ConfirmDialog";

const Category = () => {
  const matches = useMediaQuery("(min-width:600px)");
  const { adminData } = useStore();
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const {
    rowModesModel,
    setRowModesModel,
    handleRowModesModelChange,
    handleRowEditStart,
    handleRowEditStop,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
  } = useTableEdit();

  const { data, isLoading, error } = useQuery<ICategory[]>(
    ["category"],
    getCategories
  );

  useEffect(() => {
    if (error) {
      let err = error as Error;
      toast.error(err.message);
    }
  }, [error]);

  const columns = useMemo(() => {
    const handleOpenConfirm = (id: string) => {
      setOpenConfirm(true);
      setCategoryId(id);
    };
    return [
      { field: "id", headerName: "ID", width: 130, hide: true },
      {
        field: "name",
        headerName: "Name",
        width: 130,
        flex: matches ? 1 : 0,
        editable: true,
      },
      {
        field: "createdAt",
        headerName: "CreatedAt",
        width: 130,
        flex: matches ? 1 : 0,
        valueFormatter: (params: GridValueFormatterParams<Date>) => {
          if (params.value == null) {
            return "";
          }
          return moment(params.value as Date).format("MMMM Do YYYY, h:mm:ss A");
        },
      },
      {
        field: "updatedAt",
        headerName: "UpdatedAt",
        width: 130,
        flex: matches ? 1 : 0,
        valueFormatter: (params: GridValueFormatterParams<Date>) => {
          if (params.value == null) {
            return "";
          }
          return moment(params.value as Date).format("MMMM Do YYYY, h:mm:ss A");
        },
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 130,
        getActions: ({ id }: { id: string }) =>
          getActions({
            id,
            handleEditClick,
            handleSaveClick,
            handleCancelClick,
            handleOpenConfirm,
            rowModesModel,
          }),
      },
    ];
  }, [
    matches,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    rowModesModel,
  ]);

  const handleOpen = () => {
    setOpen(true);
  };
  const processRowUpdate = async (
    newRow: GridRowModel,
    oldRow: GridRowModel
  ) => {
    const updatedRow = { ...newRow };
    return updatedRow;

    // toastId.current = toast.loading("Updating Brand...");
    // const data = await mutateAsync(updatedRow);
    // if (!data) return oldRow;

    // return data;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleConfirm = async () => {
    // toastId.current = toast.loading("Deleting brand...");
    setOpenConfirm(false);
    // await deleteMutateAsync(brandId!);
    setCategoryId(null);
  };

  if (isLoading) return <PageLoader />;

  return (
    <AnimateContainer
      title="Category"
      subtitle="List of Categories"
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
          Add Category
        </Button>
      }
    >
      <CreateCategoryModal open={open} handleClose={handleClose} />
      <ConfirmDialog
        open={openConfirm}
        handleClose={handleCloseConfirm}
        message={`Are you sure you want to delete category with ID: ${categoryId}`}
        onConfirm={handleConfirm}
      />
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
    </AnimateContainer>
  );
};

export default Category;
