import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import useFetch from "../../hooks/useFetch";
import ReactDOM from "react-dom";
import DeleteIcon from "../../assets/icon/delete-icon.svg";
import EditIcon from "../../assets/icon/edit-icon.svg";
import PlusIcon from "../../assets/icon/plus-icon.png";

import EditTilangModal from "../../components/Modal/EditTilangModal";
import DeleteTilangModal from "../../components/Modal/DeleteTilangModal";
import AddTilangModal from "../../components/Modal/AddTilangModal";

const columns = [
    {
      id: "nomorKendaraan",
      label: "Nomor Kendaraan",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "tanggal",
      label: "Waktu Pelanggaran",
      minWidth: 100,
      align: "center",
    },
    {
      id: "lokasi",
      label: "Lokasi Pelanggaran",
      minWidth: 170,
      align: "center",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "keterangan",
      label: "Keterangan",
      minWidth: 170,
      align: "center",
    },
];

// ... (Your imports and columns definition remain the same)

export default function StickyHeadTable() {
  const { data, loading, error } = useFetch("http://localhost:5000/api/tilang");
  console.log("data", data);
  let [parseData, setParseData] = useState();
  let [editModal, setEditModal] = useState(false);
  let [deleteModal, setDeleteModal] = useState(false);
  let [addModal, setAddModal] = useState(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onClickEdit = (data) => {
    setEditModal(true);
    setParseData(data);
  };
  const onClickDelete = (data) => {
    setDeleteModal(true);
    setParseData(data);
  };
  const onClickAdd = (data) => {
    setAddModal(true);
    setParseData(data);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.format &&
                      (typeof row[column.id] === "number" ||
                        typeof row[column.id] === "boolean")
                        ? column.format(row[column.id])
                        : row[column.id]}
                    </TableCell>
                  ))}
                  <TableCell>
                    <button onClick={() => onClickEdit(row)}>
                      <img src={EditIcon} alt="Edit" />
                    </button>
                    <button className="ml-1" onClick={() => onClickDelete(row)}>
                      <img src={DeleteIcon} alt="Delete" width="25px" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {editModal && (
        <EditTilangModal
          state={editModal}
          setState={setEditModal}
          data={parseData}
        />
      )}
      {deleteModal && (
        <DeleteTilangModal
          state={deleteModal}
          setState={setDeleteModal}
          data={parseData}
        />
      )}
    </Paper>
  );
}
