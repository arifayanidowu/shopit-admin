import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function createData(name: string, orders: number) {
  return { name, orders };
}

const rows = [
  createData("Nike Air Force 1", 59),
  createData("Adidas motion", 20),
  createData("New Balance jumper", 22),
  createData("Ben Sherman striped beach shirt", 5),
  createData("RayBan Sunglasses", 22),
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

const ProductTable = () => {
  return (
    <TableContainer component={Paper} sx={{ pb: 3 }} square elevation={0}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ fontWeight: "bold" }}>
              Product
            </StyledTableCell>
            <StyledTableCell sx={{ fontWeight: "bold" }}>
              Orders
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.orders}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography
        component={Link}
        to={"/admin/dashboard"}
        sx={{ ml: 1, mt: 2, display: "block", color: "inherit" }}
      >
        View All Products
      </Typography>
    </TableContainer>
  );
};

export default ProductTable;
