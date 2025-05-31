import { Category } from "./types";

export const defaultCategories: Omit<Category, "id" | "userId">[] = [
  {name: 'Salary', color: '#4CAF50'},
  {name: 'Food', color: '#FF9800'},
  {name: 'Transport', color: '	#2196F3'},
  {name: 'Entertainment', color: '	#9C27B0'},
  {name: 'Goals', color: '	#FFC106'}
]