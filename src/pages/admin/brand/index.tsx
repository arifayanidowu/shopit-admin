import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Close, DeleteForeverOutlined, Edit, Save } from "@mui/icons-material";
import { Box, Button, useMediaQuery } from "@mui/material";
import {
  GridEventListener,
  GridRowId,
  GridRowModes,
  MuiEvent,
} from "@mui/x-data-grid";
import { GridRowModel } from "@mui/x-data-grid";
import { GridRowParams } from "@mui/x-data-grid";
import {
  GridActionsCellItem,
  GridRenderEditCellParams,
  GridRowModesModel,
  GridValueFormatterParams,
} from "@mui/x-data-grid";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { Id, toast } from "react-toastify";
import CustomTable from "src/components/CustomTable";
import PageLoader from "src/components/PageLoader";
import AnimateContainer from "src/components/shared/AnimateContainer";
import { getAllBrands, updateBrand } from "src/endpoints/brands";
import type { Brand as IBrand } from "src/types";
import AddBrandModal from "./_components/AddBrandModal";

const Brand = () => {
  const queryClient = new QueryClient();
  let toastId: Id;
  const matches = useMediaQuery("(min-width:600px)");
  const [open, setOpen] = useState(false);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const { data, isLoading, error } = useQuery<IBrand[]>(
    ["brands"],
    getAllBrands
  );

  const { mutateAsync } = useMutation(updateBrand, {
    onSuccess: () => {
      queryClient.invalidateQueries(["brands"]);
      toast.update(toastId, {
        render: "Brand updated successfully!",
        type: "success",
        closeOnClick: true,
        autoClose: 2000,
        closeButton: true,
      });

      setTimeout(() => {
        toast.dismiss(toastId);
      }, 2000);
    },
    onError: (error) => {
      let err = error as Error;
      toast.update(toastId, {
        render: err.message,
        type: "error",
        closeOnClick: true,
        autoClose: 2000,
        closeButton: true,
      });

      setTimeout(() => {
        toast.dismiss(toastId);
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
    const handleEditClick = (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleCancelClick = (id: GridRowId) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
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
        field: "action",
        type: "actions",
        headerName: "Action",
        width: 130,
        cellClassName: "actions",
        flex: matches ? 1 : 0,
        sortable: false,
        filterable: false,
        getActions: ({ id }: { id: string }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<Save fontSize="large" />}
                label="Save"
                onClick={handleSaveClick(id)}
                color="info"
              />,
              <GridActionsCellItem
                icon={<Close fontSize="large" />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="secondary"
              />,
            ];
          }
          return [
            <GridActionsCellItem
              icon={<Edit color="info" fontSize="large" />}
              label="Edit"
              onClick={handleEditClick(id)}
              className="textPrimary"
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteForeverOutlined color="error" fontSize="large" />}
              label="Delete"
              onClick={() => {
                console.log(id);
              }}
              className="textPrimary"
              color="error"
            />,
          ];
        },
      },
    ];
  }, [matches, rowModesModel]);

  const processRowUpdate = async (
    newRow: GridRowModel,
    oldRow: GridRowModel
  ) => {
    const updatedRow = { ...newRow };

    toastId = toast.loading("Updating Brand...");
    const data = await mutateAsync(updatedRow);
    if (!data) return oldRow;

    return data;
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  const handleRowEditStart = (
    params: GridRowParams,
    event: MuiEvent<React.SyntheticEvent>
  ) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    event.defaultMuiPrevented = true;
  };

  if (isLoading) return <PageLoader />;

  return (
    <>
      <AddBrandModal {...{ open, handleClose }} />
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
          />
        </Box>
      </AnimateContainer>
    </>
  );
};

export default Brand;
