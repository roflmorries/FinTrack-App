
export interface Transaction {
  id: string;
  userId: string;
  type: string;
  amount: number;
  category: string; // category id
  date: string;
  comment?: string;
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