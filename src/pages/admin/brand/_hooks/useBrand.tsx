import { Button } from "@mui/material";
import {
  GridRowModel,
  GridValueFormatterParams,
  GridRenderEditCellParams,
} from "@mui/x-data-grid";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useMemo, useCallback, useRef } from "react";
import { toast, Id } from "react-toastify";
import { getActions } from "src/components/shared/getActions";
import { deleteBrand, getAllBrands, updateBrand } from "src/endpoints/brands";
import useTableEdit from "src/hooks/useTableEdit";
import { useStore } from "src/store";
import type { Brand as IBrand } from "src/types";
import { toastOptions } from "src/utils";

const useBrand = () => {
  const queryClient = new QueryClient();
  let toastId = useRef<Id | null>(null);
  const {
    rowModesModel,
    setRowModesModel,
    handleRowModesModelChange,
    handleRowEditStart,
    handleRowEditStop,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    open,
    setOpen,
    openConfirm,
    setOpenConfirm,
    itemId,
    setItemId,
  } = useTableEdit();
  const { adminData } = useStore();
  const { data, isLoading } = useQuery<IBrand[]>(["brands"], getAllBrands);

  const { mutateAsync } = useMutation(updateBrand, {
    onSuccess: () => {
      queryClient.invalidateQueries(["brands"]);
      toast.update(toastId.current!, {
        ...toastOptions({
          render: "Brand updated successfully",
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

  const { mutateAsync: deleteMutateAsync } = useMutation(deleteBrand, {
    onSuccess: () => {
      queryClient.invalidateQueries(["brands"]);
      toast.update(toastId.current!, {
        ...toastOptions({
          render: "Brand deleted successfully!",
          type: "success",
        }),
      });

      setTimeout(() => {
        toast.dismiss(toastId.current!);
      }, 2000);
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
      setItemId(id);
    };

    return [
      { field: "id", headerName: "ID", width: 130, hide: true },
      {
        field: "name",
        headerName: "Name",
        width: 200,
        sortable: false,
        editable: true,
      },
      {
        field: "logo",
        headerName: "Image",
        width: 200,
        sortable: false,
        filterable: false,
        renderCell: (params: GridRenderEditCellParams<IBrand>) => (
          <img
            src={params.row?.logo}
            style={{
              width: 50,
              height: 50,
              backgroundColor: "white",
              objectFit: "contain",
            }}
            alt="logo"
          />
        ),
      },
      {
        field: "products",
        headerName: "Products",
        width: 200,
        sortable: false,
        renderCell: (params: GridRenderEditCellParams<IBrand>) => (
          <Button
            color="inherit"
            variant="outlined"
            disabled={params.row?.products?.length === 0}
          >
            Product {params.row?.products?.length}
          </Button>
        ),
      },
      {
        field: "createdAt",
        headerName: "CreatedAt",
        width: 200,
        valueFormatter: (params: GridValueFormatterParams<Date>) => {
          if (params.value == null) {
            return "";
          }
          return moment(params.value).format("MMMM Do YYYY, h:mm:ss A");
        },
      },
      {
        field: "updatedAt",
        headerName: "UpdatedAt",
        width: 200,
        valueFormatter: (params: GridValueFormatterParams<Date>) => {
          if (params.value == null) {
            return "";
          }
          return moment(params.value).format("MMMM Do YYYY, h:mm:ss A");
        },
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Action",
        width: 130,
        cellClassName: "actions",
        sortable: false,
        filterable: false,
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
    rowModesModel,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    setItemId,
    setOpenConfirm,
  ]);

  const processRowUpdate = useCallback(
    async (newRow: GridRowModel, oldRow: GridRowModel) => {
      const updatedRow = { ...newRow };

      toastId.current = toast.loading("Updating Brand...");
      const data = await mutateAsync(updatedRow);
      if (!data) return oldRow;

      return data;
    },
    [mutateAsync]
  );

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleCloseConfirm = useCallback(() => {
    setOpenConfirm(false);
  }, [setOpenConfirm]);

  const handleConfirm = useCallback(async () => {
    toastId.current = toast.loading("Deleting brand...");
    setOpenConfirm(false);
    await deleteMutateAsync(itemId!);
    setItemId(null);
  }, [deleteMutateAsync, itemId, setItemId, setOpenConfirm]);

  return {
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
    brandId: itemId,
    processRowUpdate,
    isLoading,
    handleConfirm,
    rowModesModel,
    setRowModesModel,
    adminData,
  };
};

export default useBrand;
