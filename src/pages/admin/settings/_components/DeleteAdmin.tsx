import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast, Id } from "react-toastify";
import { deleteAdmin } from "src/endpoints/admins";
import ConfirmDialog from "src/components/shared/ConfirmDialog";

interface IDeleteAdminProps {
  id: string;
}

const DeleteAdmin = ({ id }: IDeleteAdminProps) => {
  const toastId = useRef<Id | null>(null);
  const queryClient = useQueryClient();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [itemId, setItemId] = useState<string>("");

  const { mutate } = useMutation(deleteAdmin, {
    onSuccess: () => {
      queryClient.invalidateQueries(["admins"]);
      toast.update(toastId.current as Id, {
        render: "Admin deleted successfully!",
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

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <>
      <ConfirmDialog
        open={openConfirm}
        handleClose={handleCloseConfirm}
        message="Are you sure you want to delete this admin?"
        onConfirm={() => {
          toastId.current = toast.loading("Deleting admin...");
          mutate(itemId);
          setOpenConfirm(false);
        }}
      />
      <IconButton
        onClick={() => {
          setOpenConfirm(true);
          setItemId(id);
        }}
        color="error"
      >
        <Delete color="inherit" />
      </IconButton>
    </>
  );
};

export default DeleteAdmin;
