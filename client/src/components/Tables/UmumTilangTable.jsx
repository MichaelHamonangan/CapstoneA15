import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import useFetch from "../../hooks/useFetch";

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

export default function UmumTilangTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, loading, error, reFetch } = useFetch(
    "http://localhost:5000/api/tilang",
    searchTerm
  );

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = () => {
    reFetch();
  };

  const onClickCheck = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <div className="flex justify-center items-center max-w-[1256px] mx-auto px-4 py-7 rounded-[30px]">
        
        <input
          className="bg-gray-50 border border-gray-300 text-center text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black"
          type="text"
          placeholder="Silahkan masukkan nomor kendaraan Anda"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      
      </div>

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
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === 'keterangan' ? (
                        <button
                        onClick={() => onClickCheck(row[column.id])}
                        className="outline outline-2 outline-red-800 w-[100px] h-[30px] bg-red-800 text-white rounded-[10px]"
                      >
                        <p className="inline">Cek Bukti</p>
                      </button>
                      ) : (
                        column.format &&
                        (typeof row[column.id] === "number" ||
                          typeof row[column.id] === "boolean")
                          ? column.format(row[column.id])
                          : row[column.id]
                      )}
                    </TableCell>
                  ))}
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
    </Paper>
  );
}
