import React from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import {Table} from "../components/table";
import { deleteItem, fetchData } from "../helpers";

interface ExpensesPageProps {
  expenses: any[]; // You should replace 'any' with the actual type of expenses.
}

async function expensesLoader() {
  const expenses = fetchData("expenses");
  return { expenses };
}

async function expensesAction({ request }: any) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

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

const ExpensesPage: React.FC = () => {
  const { expenses } = useLoaderData() as { expenses: any[] };

  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses} />
        </div>
      ) : (
        <p>No Expenses to show</p>
      )}
    </div>
  );
};

export { ExpensesPage, expensesLoader, expensesAction };