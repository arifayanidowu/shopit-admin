import { Box } from "@mui/material";
import { DataGrid, GridCallbackDetails, GridColDef, GridInputRowSelectionModel, GridRowSelectionModel } from "@mui/x-data-grid";
import NoEntry from "./shared/NoEntry";

interface ICustomTable {
    rows: any[]
    columns: GridColDef[]
    onRowSelectionModelChange?: ((rowSelectionModel: GridRowSelectionModel, details: GridCallbackDetails<any>) => void) | undefined
    rowSelectionModel?: GridInputRowSelectionModel
    processRowUpdate?: ((newRow: any, oldRow: any) => any) | undefined
    onProcessRowUpdateError?: ((error: any) => void) | undefined
    checkboxSelection?: boolean
    loading?: boolean
    onOpenModal?: () => void
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
}: ICustomTable) => {
    return (
        <Box
            component="div"
            sx={{ width: "100%", height: 350, overflowY: "hidden" }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                    columns: {
                        columnVisibilityModel: {
                            id: false,
                        },
                    },
                }}
                onRowSelectionModelChange={onRowSelectionModelChange}
                rowSelectionModel={rowSelectionModel}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={onProcessRowUpdateError}
                pageSizeOptions={[5, 10, 25]}
                checkboxSelection={checkboxSelection}
                disableRowSelectionOnClick
                loading={loading}
                slots={{
                    noRowsOverlay: () => <NoEntry onClick={onOpenModal} />,
                }}
                sx={(theme) => ({
                    bgcolor:
                        theme.palette.mode === "light" ? "background.paper" : "#1f2228",
                    borderRadius: 0,
                    fontFamily: "Abel",
                })}
                hideFooterSelectedRowCount
            />
        </Box>
    )
}

export default CustomTable