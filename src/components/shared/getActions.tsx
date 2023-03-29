import { Close, DeleteForeverOutlined, Edit, Save } from "@mui/icons-material";
import { GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";
import { GridRowModesModel } from "@mui/x-data-grid";
import { CircularProgress } from "@mui/material";

interface IActions {
  rowModesModel: GridRowModesModel;
  id: string;
  handleEditClick: (id: string) => () => void;
  handleOpenConfirm: (id: string) => void;
  handleSaveClick: (id: string) => () => void;
  handleCancelClick: (id: string) => () => void;
  reset?: () => void;
  isLoading?: boolean;
}

export const getActions = ({
  id,
  rowModesModel,
  handleEditClick,
  handleSaveClick,
  handleOpenConfirm,
  handleCancelClick,
  reset,
  isLoading,
}: IActions) => {
  const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

  const handleCancel = () => {
    handleCancelClick(id)();
    reset && reset();
  };

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
        onClick={handleCancel}
        color="secondary"
      />,
    ];
  }
  return [
    <GridActionsCellItem
      icon={
        isLoading ? (
          <CircularProgress size={18} color="inherit" />
        ) : (
          <Edit color="info" fontSize="large" />
        )
      }
      label="Edit"
      onClick={handleEditClick(id)}
      className="textPrimary"
      color="inherit"
      disabled={isLoading}
    />,
    <GridActionsCellItem
      icon={<DeleteForeverOutlined color="error" fontSize="large" />}
      label="Delete"
      onClick={() => handleOpenConfirm(id)}
      className="textPrimary"
      color="error"
      disabled={isLoading}
    />,
  ];
};
