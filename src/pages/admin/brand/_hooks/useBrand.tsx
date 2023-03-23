import { Button, useMediaQuery } from "@mui/material";
import {
  GridRowModel,
  GridValueFormatterParams,
  GridRenderEditCellParams,
} from "@mui/x-data-grid";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useMemo, useEffect, useState, useCallback, useRef } from "react";
import { toast, Id } from "react-toastify";
import { getActions } from "src/components/shared/getActions";
import { deleteBrand, getAllBrands, updateBrand } from "src/endpoints/brands";
import useTableEdit from "src/hooks/useTableEdit";
import { useStore } from "src/store";
import type { Brand as IBrand } from "src/types";

const useBrand = () => {
  const queryClient = new QueryClient();
  let toastId = useRef<Id | null>(null);
  const matches = useMediaQuery("(min-width:600px)");
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
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [brandId, setBrandId] = useState<string | null>(null);
  const { adminData } = useStore();
  const { data, isLoading, error } = useQuery<IBrand[]>(
    ["brands"],
    getAllBrands
  );

  const { mutateAsync } = useMutation(updateBrand, {
    onSuccess: () => {
      queryClient.invalidateQueries(["brands"]);
      toast.update(toastId.current!, {
        render: "Brand updated successfully!",
        type: "success",
        closeOnClick: true,
        autoClose: 2000,
        closeButton: true,
      });

      setTimeout(() => {
        toast.dismiss(toastId.current!);
      }, 2000);
    },
    onError: (error) => {
      let err = error as Error;
      toast.update(toastId.current!, {
        render: err.message,
        type: "error",
        closeOnClick: true,
        autoClose: 2000,
        closeButton: true,
      });

      setTimeout(() => {
        toast.dismiss(toastId.current!);
      }, 2000);
    },
  });

  const { mutateAsync: deleteMutateAsync } = useMutation(deleteBrand, {
    onSuccess: () => {
      queryClient.invalidateQueries(["brands"]);
      toast.update(toastId.current!, {
        render: "Brand deleted successfully!",
        type: "success",
        closeOnClick: true,
        autoClose: 2000,
        closeButton: true,
      });

      setTimeout(() => {
        toast.dismiss(toastId.current!);
      }, 2000);
    },
    onError: (error) => {
      let err = error as Error;
      toast.update(toastId.current!, {
        render: err.message,
        type: "error",
        closeOnClick: true,
        autoClose: 2000,
        closeButton: true,
      });

      setTimeout(() => {
        toast.dismiss(toastId.current!);
      }, 2000);
    },
  });

  useEffect(() => {
    let err = error as Error;
    if (error) {
      toast.error(err.message);
    }
  }, [error]);

  const columns = useMemo(() => {
    const handleOpenConfirm = (id: string) => {
      setOpenConfirm(true);
      setBrandId(id);
    };

    return [
      { field: "id", headerName: "ID", width: 130, hide: true },
      {
        field: "name",
        headerName: "Name",
        width: 130,
        sortable: false,
        editable: true,
      },
      {
        field: "logo",
        headerName: "Image",
        width: 130,
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
        width: 130,
        flex: matches ? 1 : 0,
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
        headerName: "Action",
        width: 130,
        cellClassName: "actions",
        flex: matches ? 1 : 0,
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
    matches,
    rowModesModel,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
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
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleCloseConfirm = useCallback(() => {
    setOpenConfirm(false);
  }, []);

  const handleConfirm = useCallback(async () => {
    toastId.current = toast.loading("Deleting brand...");
    setOpenConfirm(false);
    await deleteMutateAsync(brandId!);
    setBrandId(null);
  }, [deleteMutateAsync, brandId]);

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
    brandId,
    processRowUpdate,
    isLoading,
    handleConfirm,
    rowModesModel,
    setRowModesModel,
    adminData,
  };
};

export default useBrand;
