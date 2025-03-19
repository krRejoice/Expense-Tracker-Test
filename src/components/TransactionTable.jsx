import React, { useState, useMemo } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

const TransactionTable = ({ data, setData }) => {
  const [editId, setEditId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [filterType, setFilterType] = useState("");
  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    localStorage.setItem("transaction", JSON.stringify(updatedData));
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setEditFormData(item);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditSave = () => {
    const updatedData = data.map((item) =>
      item.id === editId ? { ...editFormData } : item
    );
    setData(updatedData);
    localStorage.setItem("transaction", JSON.stringify(updatedData));
    setEditId(null);
    setEditFormData({});
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const filteredData = useMemo(() => {
    return filterType ? data.filter((item) => item.type === filterType) : data;
  }, [data, filterType]);

  return (
    <>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontSize: "35px",
          color: "#333",
        }}
      >
        Transactions
      </h2>
      <FormControl
        style={{
          marginBottom: "20px",
          minWidth: "200px",
        }}
      >
        <InputLabel>Filter by Type</InputLabel>
        <Select value={filterType} onChange={handleFilterChange}>
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Expense">Expense</MenuItem>
          <MenuItem value="Income">Income</MenuItem>
        </Select>
      </FormControl>
      <TableContainer
        component={Paper}
        style={{
          maxWidth: "90%",
          margin: "0 auto",
          borderRadius: "10px",
        }}
      >
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#f5f5f5" }}>
              {[
                "Type",
                "Category",
                "Amount",
                "Date",
                "Reference",
                "Description",
                "Actions",
              ].map((header) => (
                <TableCell
                  key={header}
                  style={{ fontWeight: "bold", color: "#555" }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRow key={item.id}>
                  {editId === item.id
                    ? [
                        "type",
                        "category",
                        "amount",
                        "date",
                        "reference",
                        "description",
                      ].map((field, index) => (
                        <TableCell key={index}>
                          {field === "type" ? (
                            <TextField
                              select
                              label="Type"
                              name={field}
                              value={editFormData[field]}
                              onChange={handleEditChange}
                              size="small"
                            >
                              <MenuItem value="Expense">Expense</MenuItem>
                              <MenuItem value="Income">Income</MenuItem>
                            </TextField>
                          ) : (
                            <TextField
                              name={field}
                              type={
                                field === "amount"
                                  ? "number"
                                  : field === "date"
                                  ? "date"
                                  : "text"
                              }
                              value={editFormData[field]}
                              onChange={handleEditChange}
                              size="small"
                            />
                          )}
                        </TableCell>
                      ))
                    : [
                        "type",
                        "category",
                        "amount",
                        "date",
                        "reference",
                        "description",
                      ].map((field, index) => (
                        <TableCell key={index}>{item[field]}</TableCell>
                      ))}
                  <TableCell>
                    {editId === item.id ? (
                      <>
                        <Button
                          color="primary"
                          onClick={handleEditSave}
                          style={{ textTransform: "none", marginRight: "10px" }}
                        >
                          Save
                        </Button>
                        <Button
                          color="secondary"
                          onClick={() => setEditId(null)}
                          style={{ textTransform: "none" }}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          color="primary"
                          onClick={() => handleEdit(item)}
                          style={{ textTransform: "none", marginRight: "10px" }}
                        >
                          Edit
                        </Button>
                        <Button
                          color="error"
                          onClick={() => handleDelete(item.id)}
                          style={{ textTransform: "none" }}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  style={{ textAlign: "center", color: "#999" }}
                >
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TransactionTable;
