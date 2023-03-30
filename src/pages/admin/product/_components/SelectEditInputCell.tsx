import {
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { GridRenderCellParams, useGridApiContext } from "@mui/x-data-grid";

interface SelectEditProps extends GridRenderCellParams {
  options: any[];
  multiple?: boolean;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    elevation: 0,
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const SelectEditInputCell = (props: SelectEditProps) => {
  const { id, value, field, options } = props;
  const apiRef = useGridApiContext();

  const handleChange = async (event: SelectChangeEvent) => {
    await apiRef.current.setEditCellValue({
      id,
      field,
      value:
        props.multiple && Array.isArray(event.target.value)
          ? event.target.value?.join(",")
          : event.target.value,
    });
    apiRef.current.stopCellEditMode({ id, field });
  };
  return (
    <Select
      value={props.multiple ? value?.split(",") || [] : value ?? ""}
      onChange={handleChange}
      multiple={props.multiple}
      size="small"
      input={<OutlinedInput />}
      MenuProps={MenuProps}
      autoFocus
    >
      <MenuItem disabled value="">
        <em>--Select Item--</em>
      </MenuItem>
      {options.map((option, idx) => (
        <MenuItem key={idx} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectEditInputCell;
