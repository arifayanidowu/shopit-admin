import { Box } from "@mui/material";
import {
  DataGrid,
  GridCallbackDetails,
  GridColDef,
  GridEditMode,
  GridEventListener,
  GridInputRowSelectionModel,
  GridRowModesModel,
  GridRowSelectionModel,
  GridSlotsComponent,
  GridSlotsComponentsProps,
} from "@mui/x-data-grid";
import { UncapitalizeObjectKeys } from "@mui/x-data-grid/internals";
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity";
import NoEntry from "./shared/NoEntry";

interface ICustomTable {
  rows: any[];
  columns: GridColDef[];
  onRowSelectionModelChange?:
    | ((
        rowSelectionModel: GridRowSelectionModel,
        details: GridCallbackDetails<any>
      ) => void)
    | undefined;
  rowSelectionModel?: GridInputRowSelectionModel;
  processRowUpdate?: ((newRow: any, oldRow: any) => any) | undefined;
  onProcessRowUpdateError?: ((error: any) => void) | undefined;
  checkboxSelection?: boolean;
  loading?: boolean;
  onOpenModal?: () => void;
  slots?: UncapitalizeObjectKeys<Partial<GridSlotsComponent>> | undefined;
  editMode?: GridEditMode | undefined;
  rowModesModel?: GridRowModesModel | undefined;
  onRowModesModelChange?:
    | ((
        rowModesModel: GridRowModesModel,
        details: GridCallbackDetails<any>
      ) => void)
    | undefined;
  slotProps?: GridSlotsComponentsProps | undefined;
  onRowEditStart?: GridEventListener<"rowEditStart"> | undefined;
  onRowEditStop?: GridEventListener<"rowEditStop"> | undefined;
  initialState?: GridInitialStateCommunity | undefined;
}

const CustomTable = ({
  rows,
  columns,
  onRowSelectionModelChange,
  rowSelectionModel,
  processRowUpdate,
  onProcessRowUpdateError,
  checkboxSelection,
  loading,
  onOpenModal,
  slots,
  editMode,
  rowModesModel,
  onRowModesModelChange,
  slotProps,
  onRowEditStart,
  onRowEditStop,
  initialState,
}: ICustomTable) => {
  return (
    <Box
      component="div"
      sx={{ width: "100%", height: 350, overflowY: "hidden" }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={initialState}
        editMode={editMode}
        rowModesModel={rowModesModel}
        onRowModesModelChange={onRowModesModelChange}
        onRowSelectionModelChange={onRowSelectionModelChange}
        rowSelectionModel={rowSelectionModel}
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={onProcessRowUpdateError}
        onRowEditStart={onRowEditStart}
        onRowEditStop={onRowEditStop}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection={checkboxSelection}
        disableRowSelectionOnClick
        loading={loading}
        slots={{
          ...slots,
          noRowsOverlay: () => <NoEntry onClick={onOpenModal} />,
        }}
        slotProps={slotProps}
        sx={(theme) => ({
          bgcolor:
            theme.palette.mode === "light" ? "background.paper" : "#1f2228",
          borderRadius: 0,
          fontFamily: "Abel",
        })}
        hideFooterSelectedRowCount
      />
    </Box>
  );
};

export default CustomTable;
