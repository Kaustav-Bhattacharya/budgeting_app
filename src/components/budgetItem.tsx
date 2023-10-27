import React from "react";
import { Form, Link } from "react-router-dom";
import { BanknotesIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from "../helpers";

interface BudgetItemProps {
  budget: {
    id: string;
    name: string;
    amount?: number;
    color: string;
  };
  showDelete?: boolean;
}

const BudgetItem: React.FC<BudgetItemProps> = ({
  budget,
  showDelete = false,
}) => {
  const { id, name, amount = 0, color } = budget;
  const spent = calculateSpentByBudget(id);

  const deleteBudgetConfirmation = (event: React.FormEvent) => {
    if (!confirm("Are you sure you want to permanently delete this budget?")) {
      event.preventDefault();
    }
  };

  const style: any = {
    "--accent": color,
  };

  return (
    <div className="budget" style={style}>
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amount - spent)} remaining</small>
      </div>
      {showDelete ? (
        <div className="flex-sm">
          <Form
            method="post"
            action="delete"
            onSubmit={deleteBudgetConfirmation}
          >
            <button type="submit" className="btn">
              <span>Delete Budget</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link to={`/budget/${id}`} className="btn">
            <span>View Details</span>
            <BanknotesIcon width={20} />
          </Link>
        </div>
      )}
    </div>
  );
};

export { BudgetItem };
