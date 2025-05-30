import { createSelector } from "@reduxjs/toolkit";
import { SelectAllTransactions } from "./transactionsSelectors";


export const selectSortedTransactions = createSelector(
  [
    SelectAllTransactions,
    (_: any, sortType: "none" | "date" | "category" | "type") => sortType
  ],
  (transactions, sortType) => {
    let sorted = [...transactions];
    if (sortType === "date") {
      sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortType === "category") {
      sorted.sort((a, b) => a.category.localeCompare(b.category));
    } else if (sortType === "type") {
      sorted.sort((a, b) => a.type.localeCompare(b.type));
    }
    return sorted;
  }
);