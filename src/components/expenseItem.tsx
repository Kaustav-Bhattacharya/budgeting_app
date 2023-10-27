import React from "react";
import { Link, useFetcher } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  formatCurrency,
  formatDateToLocaleString,
  getAllMatchingItems,
} from "../helpers";

type TExpenseItemProps = {
  expense: {
    id: string;
    name: string;
    amount: number;
    createdAt: number;
    budgetId: string;
  };
  showBudget: boolean;
};

type TBudget = { id: string; color: string; name: string };

const ExpenseItem: React.FC<TExpenseItemProps> = ({ expense, showBudget }) => {
  const fetcher = useFetcher();

  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0] as TBudget;

  const style: any = {
    "--accent": budget.color,
  };

  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      {showBudget && (
        <td>
          <Link to={`/budget/${budget.id}`} style={style}>
            {budget.name}
          </Link>
        </td>
      )}
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.name} expense`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export { ExpenseItem };
