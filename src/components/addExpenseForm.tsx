import React, { useEffect, useRef } from "react";
import { Form, useFetcher } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

export interface Budget {
  id: string;
  name: string;
  createdAt: number;
}

interface AddExpenseFormProps {
  budgets: Budget[];
}

const AddExpenseForm: React.FC<AddExpenseFormProps> = ({ budgets }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef<HTMLFormElement | null>(null);
  const focusRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isSubmitting && formRef.current) {
      formRef.current.reset();
    }

    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Add New{" "}
        <span className="accent">
          {budgets.length === 1 && budgets.map((budg) => budg.name)}
        </span>{" "}
        Expense
      </h2>
      <Form method="post" className="grid-sm" ref={formRef}>
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense Name</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g., Coffee"
              ref={(input) => (focusRef.current = input)}
              required
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Amount</label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="e.g., 3.50"
              required
            />
          </div>
        </div>
        <div className="grid-xs" hidden={budgets.length === 1}>
          <label htmlFor="newExpenseBudget">Budget Category</label>
          <select name="newExpenseBudget" id="newExpenseBudget" required>
            {budgets
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
          </select>
        </div>
        <input type="hidden" name="_action" value="createExpense" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting…</span>
          ) : (
            <>
              <span>Add Expense</span>
              <PlusCircleIcon width={20} />
            </>
          )}
        </button>
      </Form>
    </div>
  );
};

export { AddExpenseForm };
