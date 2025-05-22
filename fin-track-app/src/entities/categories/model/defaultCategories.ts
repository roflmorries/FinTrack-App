import { Category } from "./types";

export const defaultCategories: Omit<Category, "id" | "userId">[] = [
  {name: 'Salary'},
  {name: 'Food'},
  {name: 'Transport'},
  {name: 'Entertainment'},
]