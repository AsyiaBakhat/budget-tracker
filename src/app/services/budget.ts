import { Injectable } from '@angular/core';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  title: string;
  category: string;
  date: string;
  note?: string;
}

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private readonly storageKey = 'budget_tracker_transactions_v1';

  transactions: Transaction[] = [
    {
      id: '1',
      type: 'expense',
      amount: 8500,
      title: 'Monthly Groceries',
      category: 'Groceries',
      date: '2026-11-23',
      note: 'Supermart Store',
    },
    {
      id: '2',
      type: 'income',
      amount: 45000,
      title: 'Web Project Milestone',
      category: 'Freelance',
      date: '2026-11-22',
      note: 'Client Payment',
    },
    {
      id: '3',
      type: 'expense',
      amount: 11000,
      title: 'Electricity & Fiber Internet',
      category: 'Utilities',
      date: '2026-11-10',
      note: 'Monthly bills',
    },
  ];

  constructor() {
    this.loadFromStorage();
  }

  // Nayi transaction add karna
  addTransaction(newTx: Omit<Transaction, 'id'>): void {
    const transaction: Transaction = {
      ...newTx,
      id: Date.now().toString(),
    };
    this.transactions = [transaction, ...this.transactions];
    this.saveToStorage();
  }

  // Transaction delete karna
  deleteTransaction(id: string): void {
    this.transactions = this.transactions.filter((tx) => tx.id !== id);
    this.saveToStorage();
  }

  // Totals dynamically calculate karna
  get totalIncome(): number {
    return this.transactions
      .filter((tx) => tx.type === 'income')
      .reduce((sum, tx) => sum + tx.amount, 0);
  }

  get totalExpense(): number {
    return this.transactions
      .filter((tx) => tx.type === 'expense')
      .reduce((sum, tx) => sum + tx.amount, 0);
  }

  get netBalance(): number {
    return this.totalIncome - this.totalExpense;
  }

  private saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.transactions));
  }

  private loadFromStorage(): void {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      this.transactions = JSON.parse(saved);
    }
  }
  // Kisi ek transaction ko ID se nikalna
getTransactionById(id: string): Transaction | undefined {
  return this.transactions.find((tx) => tx.id === id);
}

// Existing transaction ko update karna
updateTransaction(updatedTx: Transaction): void {
  this.transactions = this.transactions.map((tx) =>
    tx.id === updatedTx.id ? { ...updatedTx } : tx
  );
  this.saveToStorage();
}
}