import React from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { AddExpenseForm } from "../components/addExpenseForm";
import { BudgetItem } from "../components/budgetItem";
import { Table } from "../components/table";
import { createExpense, deleteItem, getAllMatchingItems } from "../helpers";

interface BudgetPageProps {
  budget: any
  expenses: any[]; // Replace 'any' with the actual expense type.
}

async function budgetLoader({ params }: { params: { id: string } }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The budget you’re trying to find doesn’t exist");
  }

  return { budget, expenses };
}

async function budgetAction({ request }: { request: any }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "createExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: parseFloat(values.newExpenseAmount),
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e) {
      throw new Error("There was a problem creating your expense.");
    }
  }

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

const BudgetPage: React.FC = () => {
  const { budget, expenses } = useLoaderData() as BudgetPageProps;

  const style: any = {
    "--accent": budget.color,
  };

  return (
    <div className="grid-lg" style={style}>
      <h1 className="h2">
        <span className="accent">{budget.name}</span> Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={budget} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span> Expenses
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};

export { BudgetPage, budgetLoader, budgetAction };
