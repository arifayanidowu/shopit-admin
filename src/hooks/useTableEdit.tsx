import { useMediaQuery } from "@mui/material";
import { GridRowId, GridRowParams } from "@mui/x-data-grid";
import { GridEventListener } from "@mui/x-data-grid";
import { GridRowModes } from "@mui/x-data-grid";
import { MuiEvent } from "@mui/x-data-grid";
import { GridRowModesModel } from "@mui/x-data-grid";
import React, { useCallback, useState } from "react";

const useTableEdit = () => {
  const matches = useMediaQuery("(min-width:600px)");
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [itemId, setItemId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleRowModesModelChange = useCallback(
    (newRowModesModel: GridRowModesModel) => {
      setRowModesModel(newRowModesModel);
    },
    []
  );

  const handleRowEditStart = useCallback(
    (params: GridRowParams, event: MuiEvent<React.SyntheticEvent>) => {
      event.defaultMuiPrevented = true;
    },
    []
  );

  const handleRowEditStop: GridEventListener<"rowEditStop"> = useCallback(
    (params, event) => {
      event.defaultMuiPrevented = true;
    },
    []
  );
  const handleEditClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    },
    [rowModesModel]
  );

  const handleSaveClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    },
    [rowModesModel]
  );

  const handleCancelClick = useCallback(
    (id: GridRowId) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
    },
    [rowModesModel]
  );

  return {
    rowModesModel,
    itemId,
    open,
    openConfirm,
    setOpen,
    setOpenConfirm,
    setItemId,
    setRowModesModel,
    handleRowModesModelChange,
    handleRowEditStart,
    handleRowEditStop,
    handleEditClick,
    handleSaveClick,
    handleCancelClick,
    matches,
  };
};

export default useTableEdit;
