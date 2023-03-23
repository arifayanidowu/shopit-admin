import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Grid, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { useStore } from "src/store";
import { adminActions } from "src/utils/adminActions";

import AddUserModal from "../AddUserModal";
import AdminTable from "../AdminTable";

const Admin = () => {
  const [openModal, setOpenModal] = useState(false);
  const { adminData } = useStore();

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <motion.div
      style={{
        position: "relative",
        width: "100%",
      }}
      key="user"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.2, easings: ["easeIn", "easeInOut"] }}
    >
      <AddUserModal open={openModal} handleClose={handleCloseModal} />

      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h4">Admins</Typography>
        </Grid>
        <Grid item>
          {adminActions(adminData, "Create") ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenModal(true)}
              disableElevation
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
              aria-label="Add new user"
            >
              Add new user
            </Button>
          ) : null}
        </Grid>
      </Grid>
      <AdminTable setOpenModal={setOpenModal} />
    </motion.div>
  );
};

export default Admin;
