import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  IconButton
} from "@mui/material";
import "../customTable/customTable.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// Define the data type for table rows
interface TableRowData {
  id: number;
  name: string;
  value: number |string;
  country:string;
}

// Props for the custom table
interface CustomTableProps {
  rows: TableRowData[]; // Array of data rows
  columns: { id: string; label: string }[]; // Array of column definitions
  rowsPerPageOptions?: number[]; // Options for rows per page
  handleUserEdit: (row: any) => Promise<void>; // Correct type
  handleDeleteUser: (row: any) => Promise<void>; 

}

const CustomTable: React.FC<CustomTableProps> = ({
  rows,
  columns,
  rowsPerPageOptions = [5, 10, 25], // Default options
  handleUserEdit=(row: TableRowData)=>{},
  handleDeleteUser=(row: TableRowData)=>{},

}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page
  };

  return (
    <Paper>
      <TableContainer
        sx={{
          maxHeight: "500px", // Set the max height for scrolling
          overflowY: "auto", // Enable vertical scrolling
        }}
      >
        <Table stickyHeader>
          <TableHead >
            <TableRow                 
            >
              {columns.map((column) => (
                <TableCell 
                key={column.id}
                sx={{color:"white", backgroundColor:"#0d47a1", textAlign: "center", // Center the text
                }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody >
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.id} hover>
                <TableCell className="tableCell">{row.name}</TableCell>
                <TableCell className="tableCell">{row.value}</TableCell>
                <TableCell className="tableCell">{row.country}</TableCell>
                <TableCell className="tableCell">
                <IconButton
    onClick={() =>handleUserEdit(row)}
    color="primary"
    size="small"
    sx={{ marginLeft: 1 }}
  >
    <EditIcon />
  </IconButton>
  <IconButton
    onClick={() =>handleDeleteUser(row)}
    color="error"
    size="small"
    sx={{ marginLeft: 1 }}
  >
    <DeleteIcon />
  </IconButton>
                </TableCell>
              </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CustomTable;
