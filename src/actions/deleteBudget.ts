import {  redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../helpers";


export const deleteBudget = async ({ params } : {params:any}) => {
  try {
    const id = params.id; 

    deleteItem({
      key: "budgets",
      id,
    });

    const associatedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: id,
    });

    associatedExpenses.forEach((expense:any) => {
      deleteItem({
        key: "expenses",
        id: expense.id,
      });
    });

    toast.success("Budget deleted successfully!");
  } catch (e) {
    throw new Error("There was a problem deleting your budget.");
  }
  return redirect("/");
};
