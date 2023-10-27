export const wait = (): Promise<void> =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

// colors
const generateRandomColor = (): string => {
  const existingBudgetData = fetchData<any[]>("budgets") ?? [];
  const existingBudgetLength = existingBudgetData.length;
  return `${existingBudgetLength * 34} 65% 50%`;
};

// Local storage
export const fetchData = <T>(key: string): T | null => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

// Get all items from local storage
export const getAllMatchingItems = <T>({
  category,
  key,
  value,
}: {
  category: string;
  key: string;
  value: any;
}): T[] => {
  const data = fetchData<T[]>(category) ?? [];

  // Type assertion for 'item' to inform TypeScript about its type
  return data.filter((item) => (item as Record<string, any>)[key] === value);
};


// delete item from local storage
export const deleteItem = ({
  key,
  id,
}: {
  key: string;
  id?: string | null;
}): void => {
  const existingData = fetchData<any[]>(key);
  if (id) {
    const newData = existingData?.filter((item) => item.id !== id);
    localStorage.setItem(key, JSON.stringify(newData));
  } else {
    localStorage.removeItem(key);
  }
};

// create budget
export const createBudget = ({
  name,
  amount,
}: {
  name: string;
  amount: number;
}): void => {
  const newItem = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount,
    color: generateRandomColor(),
  };
  const existingBudgets = fetchData<any[]>("budgets") ?? [];
  localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]));
};

// create expense
export const createExpense = ({
  name,
  amount,
  budgetId,
}: {
  name: string;
  amount: number;
  budgetId: string;
}): void => {
  const newItem = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount,
    budgetId,
  };
  const existingExpenses = fetchData<any[]>("expenses") ?? [];
  localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]));
};

// total spent by budget
export const calculateSpentByBudget = (budgetId: string): number => {
  const expenses = fetchData<any[]>("expenses") ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    // check if expense.id === budgetId I passed in
    if (expense.budgetId !== budgetId) return acc;

    // add the current amount to my total
    return (acc += expense.amount);
  }, 0);
  return budgetSpent;
};

// FORMATTING
export const formatDateToLocaleString = (epoch: number): string =>
  new Date(epoch).toLocaleDateString();

// Formating percentages
export const formatPercentage = (amt: number): string => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

// Format currency
export const formatCurrency = (amt: number): string => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};
