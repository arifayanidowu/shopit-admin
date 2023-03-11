import { useMemo, useCallback, useState, useRef, useEffect } from "react";
import { Id, toast } from "react-toastify";
import {
  GridValueFormatterParams,
  GridRenderCellParams,
} from "@mui/x-data-grid";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllAdmins, updateAdmin } from "../../../../endpoints/admins";
import { useStore } from "src/store";
import DeleteAdmin from "../_components/DeleteAdmin";

export type IData = {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const useMutate = () => {
  const { adminData } = useStore();
  const queryClient = useQueryClient();
  const toastId = useRef<Id | null>(null);
  const [updatedArguments, setUpdatedArguments] = useState<any>(null);

  const { data, isLoading, error, isError } = useQuery<IData[]>(
    ["admins"],
    getAllAdmins
  );

  const { mutate } = useMutation({
    mutationFn: updateAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admins"],
      });
      toast.update(toastId.current as Id, {
        render: "Admin updated successfully!",
        type: "success",
        autoClose: 2000,
        closeOnClick: true,
        closeButton: true,
      });
      setTimeout(() => {
        toast.dismiss(toastId.current as Id);
      }, 2000);
    },
    onError: (error) => {
      const err = error as Error;
      toast.update(toastId.current as Id, {
        render: err.message,
        type: "error",
        autoClose: 2000,
        isLoading: false,
        closeOnClick: true,
        closeButton: true,
      });
      setTimeout(() => {
        toast.dismiss(toastId.current as Id);
      }, 2000);
    },
  });

  useEffect(() => {
    if (isError) {
      const err = error as Error;
      toast.error(err.message);
    }
  }, [isError, error]);

  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 130, hide: true },
      { field: "name", headerName: "Name", width: 130 },
      { field: "email", headerName: "Email", width: 200 },
      {
        field: "role",
        headerName: "Role",
        width: 130,
        type: "singleSelect",
        editable:
          adminData.role === "SuperAdmin" ||
          (adminData.role === "Editor" && true),
        valueOptions: ["Author", "Editor", "SuperAdmin"],
      },
      {
        field: "active",
        headerName: "Active",
        width: 130,
        type: "boolean",
        editable:
          (adminData.role === "SuperAdmin" || adminData.role === "Editor") &&
          true,
      },
      {
        field: "createdAt",
        headerName: "Created At",
        width: 250,
        type: "dateTime",
        valueFormatter: (params: GridValueFormatterParams<Date>) => {
          if (params.value == null) {
            return "";
          }
          return moment(params.value as Date).format("MMMM Do YYYY, h:mm:ss A");
        },
      },
      {
        field: "updatedAt",
        headerName: "Updated At",
        width: 250,
        valueFormatter: (params: GridValueFormatterParams<Date>) => {
          if (params.value == null) {
            return "";
          }
          return moment(params.value as Date).format("MMMM Do YYYY, h:mm:ss A");
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        width: 130,
        renderCell: (params: GridRenderCellParams<IData>) => (
          <DeleteAdmin id={params.row.id} />
        ),
      },
    ],
    [adminData.role]
  );

  const computeMutation = useCallback((newRow: IData, oldRow: IData) => {
    if (newRow?.role !== oldRow?.role) {
      return `${oldRow?.name}'s Role from '${oldRow?.role}' to '${newRow?.role}'`;
    }
    if (newRow?.active !== oldRow?.active) {
      return `${oldRow?.name}'s Active state from '${oldRow?.active}' to '${newRow?.active}'`;
    }
    return null;
  }, []);

  const processRowUpdate = useCallback(
    (newRow: IData, oldRow: IData): Promise<IData> => {
      return new Promise((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setUpdatedArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow);
        }
      });
    },
    [computeMutation]
  );

  const handleConfirm = useCallback(() => {
    const { resolve, newRow } = updatedArguments;
    toastId.current = toast.loading("Updating admin...");
    mutate(newRow);
    setUpdatedArguments(null);
    resolve(newRow);
  }, [updatedArguments, setUpdatedArguments, mutate]);

  const handleClose = useCallback(() => {
    const { reject, oldRow } = updatedArguments;
    setUpdatedArguments(null);
    reject(oldRow);
  }, [updatedArguments, setUpdatedArguments]);

  const rows = useMemo(
    () => data?.filter((item) => item.id !== adminData.id) ?? [],
    [data, adminData.id]
  );

  return {
    computeMutation,
    processRowUpdate,
    updatedArguments,
    mutate,
    rows,
    columns,
    isLoading,
    adminData,
    toastId,
    setUpdatedArguments,
    handleConfirm,
    handleClose,
  };
};

export default useMutate;
