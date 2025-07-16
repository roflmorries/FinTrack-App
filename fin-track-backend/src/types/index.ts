
export interface Transaction {
  id: string;
  userId: string;
  type: string;
  amount: number;
  category: string;
  date: string;
  comment?: string;
  goalId?: string;
}

export interface Category {
  id: string,
  userId: string,
  name: string,
  color: string
}

export interface Goal {
  id: string,
  userId: string,
  name: string,
  amount: number,
  deadline: string
}

export interface User {
  uid: string,
  email: string,
  fullName: string,
  avatar: string,
  monthlyBudget?: number
}

export type Notification = {
  id: string;
  userId: string;
  date: string;
  message: string;
  severity: "info" | "warning" | "error";
  read?: boolean;
};