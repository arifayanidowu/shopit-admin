import { useMemo, useRef, useState } from "react";
import { GridValueFormatterParams } from "@mui/x-data-grid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { Id, toast } from "react-toastify";

import CustomTable from "src/components/CustomTable";
import AnimateContainer from "src/components/shared/AnimateContainer";
import {
  deleteCategory,
  getCategories,
  updateCategory,
} from "src/endpoints/category";
import { useStore } from "src/store";
import { adminActions } from "src/utils/adminActions";
import { Category as ICategory } from "src/types";
import PageLoader from "src/components/PageLoader";
import CreateCategoryModal from "./CreateCategoryModal";
import { getActions } from "src/components/shared/getActions";
import useTableEdit from "src/hooks/useTableEdit";
import { GridRowModel } from "@mui/x-data-grid";
import ConfirmDialog from "src/components/shared/ConfirmDialog";
import { toastOptions } from "src/utils";

const Category = () => {
  const toastId = useRef<Id | null>(null);
  const queryClient = useQueryClient();
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

  const { data, isLoading } = useQuery<ICategory[]>(
    ["category"],
    getCategories
  );

  const { mutateAsync } = useMutation(updateCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(["category"]);
      toast.update(toastId.current!, {
        ...toastOptions({
          render: "Category updated successfully",
          type: "success",
        }),
      });
    },
    onError: (error) => {
      const err = error as Error;
      toast.update(toastId.current!, {
        ...toastOptions({
          render: err.message,
          type: "error",
        }),
      });
    },
  });

  const { mutateAsync: deleteCategoryAsync } = useMutation(deleteCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(["category"]);
      toast.update(toastId.current!, {
        ...toastOptions({
          render: "Category deleted successfully",
          type: "success",
        }),
      });
    },
    onError: (error) => {
      const err = error as Error;
      toast.update(toastId.current!, {
        ...toastOptions({
          render: err.message,
          type: "error",
        }),
      });
    },
  });

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
        width: 400,
        editable: true,
      },
      {
        field: "createdAt",
        headerName: "CreatedAt",
        width: 300,
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
        width: 300,
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
  }, [handleEditClick, handleSaveClick, handleCancelClick, rowModesModel]);

  const handleOpen = () => {
    setOpen(true);
  };
  const processRowUpdate = async (
    newRow: GridRowModel,
    oldRow: GridRowModel
  ) => {
    const updatedRow = { ...newRow };
    toastId.current = toast.loading("Updating Brand...");
    const data = await mutateAsync(updatedRow);
    if (!data) return oldRow;

    return data;
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleConfirm = async () => {
    toastId.current = toast.loading("Deleting category...");
    setOpenConfirm(false);
    await deleteCategoryAsync(categoryId!);
    setCategoryId(null);
  };

  if (isLoading) return <PageLoader />;

  return (
    <AnimateContainer
      title="Category"
      subtitle="List of Categories"
      btnTitle="Add Category"
      onClick={handleOpen}
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
        onProcessRowUpdateError={(err) => console.log(err)}
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
