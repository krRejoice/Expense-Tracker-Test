import React from "react";
import { useState } from "react";
import { TextField, MenuItem, Button, Box } from "@mui/material";

const ExpenseForm = () => {
  const [formData, setFormData] = useState({
    type: "Expense",
    amount: "",
    category: "",
    date: "",
    reference: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("transaction")) || []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.amount) {
      newErrors.amount = "Please enter Amount of income/expense";
    }
    if (!formData.category) {
      newErrors.category = "Please enter a Category";
    }
    if (!formData.reference) {
      newErrors.reference = "Please enter a Reference";
    }
    if (!formData.description) {
      newErrors.description = "Please enter a Description";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const updatedData = [
        ...data,
        {
          ...formData,
          id: Date.now(),
        },
      ];
      setData(updatedData);
      localStorage.setItem("transaction", JSON.stringify(updatedData));
      setFormData({
        type: "Expense",
        amount: "",
        category: "",
        date: "",
        reference: "",
        description: "",
      });
      setErrors({});
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 4,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#f9f9f9",
      }}
    >
      <TextField
        select
        label="Type"
        name="type"
        value={formData.type}
        onChange={handleChange}
        fullWidth
        margin="normal"
        sx={{ mb: 2 }}
      >
        <MenuItem value="Expense">Expense</MenuItem>
        <MenuItem value="Income">Income</MenuItem>
      </TextField>
      <TextField
        label="Amount"
        name="amount"
        type="number"
        value={formData.amount}
        onChange={handleChange}
        error={!!errors.amount}
        helperText={errors.amount}
        fullWidth
        margin="normal"
        sx={{ mb: 2 }}
      />
      <TextField
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        error={!!errors.category}
        helperText={errors.category}
        fullWidth
        margin="normal"
        sx={{ mb: 2 }}
      />
      <TextField
        type="date"
        name="date"
        fullWidth
        value={formData.date}
        onChange={handleChange}
        error={!!errors.date}
        helperText={errors.date}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Reference"
        name="reference"
        value={formData.reference}
        onChange={handleChange}
        error={!!errors.reference}
        helperText={errors.reference}
        fullWidth
        margin="normal"
        sx={{ mb: 2 }}
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        error={!!errors.description}
        helperText={errors.description}
        fullWidth
        margin="normal"
        multiline
        rows={4}
        sx={{ mb: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          mt: 2,
          py: 1.5,
          fontWeight: "bold",
          backgroundColor: "#1976d2",
          "&:hover": {
            backgroundColor: "#115293",
          },
        }}
      >
        Add Transactions
      </Button>
    </Box>
  );
};

export default ExpenseForm;
