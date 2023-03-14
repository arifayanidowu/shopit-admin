import { Delete } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { deleteAdmins } from "src/endpoints/admins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast, Id } from "react-toastify";
import ConfirmDialog from "src/components/shared/ComfirmDialog";


const DeleteManyAdmins = ({
  entries,
  entriesText,
}: {
  entries: any[];
  entriesText: string;
}) => {
  const toastId = useRef<Id | null>(null);
  const queryClient = useQueryClient();
  const [openConfirm, setOpenConfirm] = useState(false);

  const { mutate } = useMutation(deleteAdmins, {
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
    }
  })

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  }
  return (
    <>
      <ConfirmDialog
        open={openConfirm}
        handleClose={handleCloseConfirm}
        message="Are you sure you want to perform this action, this action cannot be undone?"
        onConfirm={() => {
          toastId.current = toast.loading("Deleting admins...");
          mutate(entries);
          setOpenConfirm(false);
        }}
      />
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, marginBottom: 2 }}
          exit={{ opacity: 0 }}
          key={entries.length}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography>
              {entries.length ? entriesText : "List of admins"}
            </Typography>
            {entries.length ? (
              <Button
                color="error"
                variant="contained"
                size="small"
                startIcon={<Delete />}
                onClick={() => {
                  setOpenConfirm(true);
                }}
              >
                Delete
              </Button>
            ) : null}
          </Stack>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default DeleteManyAdmins;
