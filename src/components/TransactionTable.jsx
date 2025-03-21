import React, { useState, useMemo, useCallback } from "react";
import { toast } from "react-toastify";
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
  const [sortOrder, setSortOrder] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [searchTitle, setSearchTitle] = useState("");
  const [debouncedSearchTitle, setDebouncedSearchTitle] = useState("");

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
    localStorage.setItem("transaction", JSON.stringify(updatedData));
    toast.success("Transaction deleted successfully!");
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setEditFormData(item);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!editFormData.type) errors.type = "Type is required.";
    if (!editFormData.title) errors.title = "Title is required.";
    if (!editFormData.category) errors.category = "Category is required.";
    if (!editFormData.amount || editFormData.amount <= 0)
      errors.amount = "Amount must be greater than 0.";
    if (!editFormData.date || isNaN(new Date(editFormData.date).getTime())) {
      errors.date = "A valid date is required.";
    }
    if (!editFormData.paymentMode)
      errors.paymentMode = "Payment mode is required.";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleEditSave = () => {
    if (!validateForm()) return;
    const updatedData = data.map((item) =>
      item.id === editId ? { ...editFormData } : item
    );
    setData(updatedData);
    localStorage.setItem("transaction", JSON.stringify(updatedData));
    setEditId(null);
    setEditFormData({});
    setFormErrors({});
    toast.success("Transaction updated successfully!");
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const debounce = useCallback((func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTitle(value);
    debounce((val) => setDebouncedSearchTitle(val), 300)(value);
  };

  const filteredData = useMemo(() => {
    let result = filterType
      ? data.filter((item) => item.type === filterType)
      : data;

    if (debouncedSearchTitle) {
      result = result.filter((item) =>
        item.title.toLowerCase().includes(debouncedSearchTitle.toLowerCase())
      );
    }

    if (sortOrder === "asc") {
      result = [...result].sort((a, b) => a.amount - b.amount);
    } else if (sortOrder === "desc") {
      result = [...result].sort((a, b) => b.amount - a.amount);
    }

    return result;
  }, [data, filterType, sortOrder, debouncedSearchTitle]);

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
      <TextField
        label="Search by Title"
        value={searchTitle}
        onChange={handleSearchChange}
        style={{
          marginBottom: "20px",
          minWidth: "300px",
          display: "block",
          margin: "0 auto",
        }}
      />
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
      <FormControl
        style={{
          marginBottom: "20px",
          minWidth: "200px",
          marginLeft: "20px",
        }}
      >
        <InputLabel>Sort by Amount</InputLabel>
        <Select value={sortOrder} onChange={handleSortChange}>
          <MenuItem value="">None</MenuItem>
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
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
                "Title",
                "Category",
                "Amount",
                "Date",
                "Reference",
                "Description",
                "Payment Mode",
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
                        "title",
                        "category",
                        "amount",
                        "date",
                        "reference",
                        "description",
                        "paymentMode",
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
                              error={!!formErrors[field]}
                              helperText={formErrors[field]}
                            >
                              <MenuItem value="Expense">Expense</MenuItem>
                              <MenuItem value="Income">Income</MenuItem>
                            </TextField>
                          ) : field === "paymentMode" ? (
                            <TextField
                              select
                              label="Payment Mode"
                              name={field}
                              value={editFormData[field]}
                              onChange={handleEditChange}
                              size="small"
                              error={!!formErrors[field]}
                              helperText={formErrors[field]}
                            >
                              <MenuItem value="Cash">Cash</MenuItem>
                              <MenuItem value="Card">Card</MenuItem>
                              <MenuItem value="Online">Online</MenuItem>
                              <MenuItem value="Bank Transfer">
                                Bank Transfer
                              </MenuItem>
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
                              error={!!formErrors[field]}
                              helperText={formErrors[field]}
                            />
                          )}
                        </TableCell>
                      ))
                    : [
                        "type",
                        "title",
                        "category",
                        "amount",
                        "date",
                        "reference",
                        "description",
                        "paymentMode",
                      ].map((field, index) => (
                        <TableCell key={index}>
                          {editId === item.id ? (
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
                              error={!!formErrors[field]}
                              helperText={formErrors[field]}
                            />
                          ) : (
                            item[field]
                          )}
                        </TableCell>
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
                  colSpan={8}
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
