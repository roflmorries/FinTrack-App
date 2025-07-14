export type Notification = {
  id: string;
  userId: string;
  date: string;
  message: string;
  severity: "info" | "warning" | "error";
  read?: boolean;
};