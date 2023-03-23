import { useEffect, useMemo, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, useMediaQuery } from "@mui/material";
import {
  GridActionsCellItem,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
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
import { DeleteForever } from "@mui/icons-material";

const Category = () => {
  const matches = useMediaQuery("(min-width:600px)");
  const { adminData } = useStore();
  const [open, setOpen] = useState(false);

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
        getActions: (params: GridValueFormatterParams) => {
          return [
            <GridActionsCellItem
              icon={<DeleteForever color="error" fontSize="large" />}
              label="Delete"
              size="large"
            />,
          ];
        },
      },
    ];
  }, [matches]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      <CustomTable
        rows={data!}
        columns={columns}
        editMode="row"
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
    </AnimateContainer>
  );
};

export default Category;
