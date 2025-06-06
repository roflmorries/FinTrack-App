import fs from 'node:fs';
import path from 'node:path';
import { Category, Transaction } from '../types';

const DATA_FILE = path.join(process.cwd(), 'db.json');

interface DBData {
  transactions: Transaction[];
  categories: Category[];
}

export const read = (): DBData => {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ transactions: [],categories: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
}

export const write = (data: DBData): void => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
}