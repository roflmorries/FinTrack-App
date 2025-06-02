import { Transaction } from "../../../entities/transactions/model/types";
import Papa from 'papaparse';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';



export const exportTransactionsToCSV = (transactions: Transaction[]) => {
  const csv = Papa.unparse(
    transactions.map(tx => ({
      Data: tx.date,
      Type: tx.type,
      Amount: tx.amount,
      Category: tx.category,
      Comment: tx.comment || ''
    }))
  );
  const blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'})
  saveAs(blob, 'transactions.csv')
};

export const exportTransactionsToPDF = (transactions: Transaction[]) => {
  const doc = new jsPDF();
  doc.text('Transactions', 14, 16);
  autoTable(doc, {
    head: [['Date', 'Amount', 'Type', 'Category', 'Comment']],
    body: transactions.map(tx => [
      tx.date,
      tx.amount,
      tx.type,
      tx.category,
      tx.comment || ''
    ]),
    startY: 20,
  })
  doc.save('transactions.pdf')
}