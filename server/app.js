const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock Data (Temporary for now; replace with DB in the future)
let totalBudget = 0;
let savingsPercentage = 0;
let dependents = [];
let expenses = [];

// Routes
app.get('/', (req, res) => {
  res.send('Budget App API is running');
});

// Get total budget
app.get('/budget', (req, res) => {
  res.json({ totalBudget, savingsPercentage });
});

// Update total budget and savings percentage
app.post('/budget', (req, res) => {
  const { newTotalBudget, newSavingsPercentage } = req.body;
  totalBudget = newTotalBudget;
  savingsPercentage = newSavingsPercentage;
  res.json({ message: 'Budget updated', totalBudget, savingsPercentage });
});

// Get dependents
app.get('/dependents', (req, res) => {
  res.json(dependents);
});

// Add or update a dependent
app.post('/dependents', (req, res) => {
  const { id, name, budget } = req.body;
  if (id) {
    dependents = dependents.map(dep => dep.id === id ? { id, name, budget } : dep);
    res.json({ message: 'Dependent updated', dependents });
  } else {
    const newDependent = { id: Date.now(), name, budget };
    dependents.push(newDependent);
    res.json({ message: 'Dependent added', dependents });
  }
});

// Delete dependent
app.delete('/dependents/:id', (req, res) => {
  const id = parseInt(req.params.id);
  dependents = dependents.filter(dep => dep.id !== id);
  res.json({ message: 'Dependent deleted', dependents });
});

// Get expenses
app.get('/expenses', (req, res) => {
  res.json(expenses);
});

// Add or update an expense
app.post('/expenses', (req, res) => {
  const { id, description, amount } = req.body;
  if (id) {
    expenses = expenses.map(exp => exp.id === id ? { id, description, amount } : exp);
    res.json({ message: 'Expense updated', expenses });
  } else {
    const newExpense = { id: Date.now(), description, amount };
    expenses.push(newExpense);
    res.json({ message: 'Expense added', expenses });
  }
});

// Delete expense
app.delete('/expenses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  expenses = expenses.filter(exp => exp.id !== id);
  res.json({ message: 'Expense deleted', expenses });
});

// Start the server
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
