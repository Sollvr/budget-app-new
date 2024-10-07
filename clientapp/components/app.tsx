'use client'

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Edit } from 'lucide-react'

type Dependent = {
  id: number;
  name: string;
  budget: number;
};

type Expense = {
  id: number;
  description: string;
  amount: number;
};

export function App() {
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [savingsPercentage, setSavingsPercentage] = useState<number>(0);
  const [dependents, setDependents] = useState<Dependent[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newDependentName, setNewDependentName] = useState<string>('');
  const [newDependentBudget, setNewDependentBudget] = useState<number>(0);
  const [newExpenseDescription, setNewExpenseDescription] = useState<string>('');
  const [newExpenseAmount, setNewExpenseAmount] = useState<number>(0);
  const [editingExpenseId, setEditingExpenseId] = useState<number | null>(null);
  const [editingDependentId, setEditingDependentId] = useState<number | null>(null);

  const [currentBudget, setCurrentBudget] = useState<number>(0);
  const [savingsBudget, setSavingsBudget] = useState<number>(0);

  useEffect(() => {
    const savingsAmount = (totalBudget * savingsPercentage) / 100;
    setSavingsBudget(savingsAmount);
    setCurrentBudget(totalBudget - savingsAmount);
  }, [totalBudget, savingsPercentage]);

  const addOrUpdateDependent = () => {
    if (newDependentName && newDependentBudget > 0) {
      if (editingDependentId) {
        setDependents(dependents.map(dep => 
          dep.id === editingDependentId 
            ? { ...dep, name: newDependentName, budget: newDependentBudget }
            : dep
        ));
        setEditingDependentId(null);
      } else {
        setDependents([...dependents, { id: Date.now(), name: newDependentName, budget: newDependentBudget }]);
      }
      setNewDependentName('');
      setNewDependentBudget(0);
    }
  };

  const editDependent = (dependent: Dependent) => {
    setNewDependentName(dependent.name);
    setNewDependentBudget(dependent.budget);
    setEditingDependentId(dependent.id);
  };

  const deleteDependent = (id: number) => {
    setDependents(dependents.filter(dep => dep.id !== id));
  };

  const addOrUpdateExpense = () => {
    if (newExpenseDescription && newExpenseAmount > 0) {
      if (editingExpenseId) {
        setExpenses(expenses.map(exp => 
          exp.id === editingExpenseId 
            ? { ...exp, description: newExpenseDescription, amount: newExpenseAmount }
            : exp
        ));
        setEditingExpenseId(null);
      } else {
        setExpenses([...expenses, { id: Date.now(), description: newExpenseDescription, amount: newExpenseAmount }]);
      }
      setNewExpenseDescription('');
      setNewExpenseAmount(0);
    }
  };

  const editExpense = (expense: Expense) => {
    setNewExpenseDescription(expense.description);
    setNewExpenseAmount(expense.amount);
    setEditingExpenseId(expense.id);
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const totalDependentsBudget = dependents.reduce((sum, dep) => sum + dep.budget, 0);
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const remainingBudget = currentBudget - totalDependentsBudget - totalExpenses;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Budget App</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Set Total Budget and Savings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <Input
              type="number"
              value={totalBudget}
              onChange={(e) => setTotalBudget(Number(e.target.value))}
              placeholder="Enter total budget"
            />
            <Button onClick={() => setTotalBudget(totalBudget)}>Update Budget</Button>
          </div>
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              value={savingsPercentage}
              onChange={(e) => setSavingsPercentage(Number(e.target.value))}
              placeholder="Enter savings percentage"
            />
            <Button onClick={() => setSavingsPercentage(savingsPercentage)}>Set Savings %</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add/Edit Dependent</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-2">
            <Input
              type="text"
              value={newDependentName}
              onChange={(e) => setNewDependentName(e.target.value)}
              placeholder="Dependent name"
            />
            <Input
              type="number"
              value={newDependentBudget}
              onChange={(e) => setNewDependentBudget(Number(e.target.value))}
              placeholder="Dependent budget"
            />
            <Button onClick={addOrUpdateDependent}>
              {editingDependentId ? 'Update Dependent' : 'Add Dependent'}
            </Button>
          </div>
          <ul>
            {dependents.map((dep) => (
              <li key={dep.id} className="mb-1 flex items-center justify-between">
                <span>{dep.name}: ${dep.budget}</span>
                <div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editDependent(dep)}
                    className="mr-2"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteDependent(dep.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add/Edit Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-2">
            <Input
              type="text"
              value={newExpenseDescription}
              onChange={(e) => setNewExpenseDescription(e.target.value)}
              placeholder="Expense description"
            />
            <Input
              type="number"
              value={newExpenseAmount}
              onChange={(e) => setNewExpenseAmount(Number(e.target.value))}
              placeholder="Expense amount"
            />
            <Button onClick={addOrUpdateExpense}>
              {editingExpenseId ? 'Update Expense' : 'Add Expense'}
            </Button>
          </div>
          <ul>
            {expenses.map((exp) => (
              <li key={exp.id} className="mb-1 flex items-center justify-between">
                <span>{exp.description}: ${exp.amount}</span>
                <div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => editExpense(exp)}
                    className="mr-2"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteExpense(exp.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Budget Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Total Budget: ${totalBudget}</p>
          <p>Current Budget: ${currentBudget}</p>
          <p>Savings Budget: ${savingsBudget}</p>
          <p>Total Dependents Budget: ${totalDependentsBudget}</p>
          <p>Total Expenses: ${totalExpenses}</p>
          <p>Remaining Current Budget: ${remainingBudget}</p>
        </CardContent>
      </Card>
    </div>
  );
}