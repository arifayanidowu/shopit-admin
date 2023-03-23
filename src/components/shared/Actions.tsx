import { Close, DeleteForeverOutlined, Edit, Save } from "@mui/icons-material";
import {
  GridActionsCellItem,
  GridRowModes,
  GridRowModesModel,
} from "@mui/x-data-grid";

interface IActions {
  rowModesModel: GridRowModesModel;
  id: string;
  handleEditClick: (id: string) => () => void;
  handleOpenConfirm: (id: string) => void;
  handleSaveClick: (id: string) => () => void;
  handleCancelClick: (id: string) => () => void;
}

const Actions = ({
  handleEditClick,
  handleOpenConfirm,
  handleSaveClick,
  handleCancelClick,
  rowModesModel,
  id,
}: IActions) => {
  const isEditing = rowModesModel[id]?.mode === GridRowModes.Edit;

  return (
    <>
      {isEditing
        ? [
            <>
              <GridActionsCellItem
                icon={<Save fontSize="large" />}
                label="Save"
                onClick={handleSaveClick(id)}
                color="info"
              />
              <GridActionsCellItem
                icon={<Close fontSize="large" />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="secondary"
              />
            </>,
          ]
        : [
            <>
              <GridActionsCellItem
                icon={<Edit color="info" fontSize="large" />}
                label="Edit"
                onClick={handleEditClick(id)}
                className="textPrimary"
                color="inherit"
              />
              ,
              <GridActionsCellItem
                icon={<DeleteForeverOutlined color="error" fontSize="large" />}
                label="Delete"
                onClick={() => handleOpenConfirm(id)}
                className="textPrimary"
                color="error"
              />
              ,
            </>,
          ]}
    </>
  );
};

export default Actions;
