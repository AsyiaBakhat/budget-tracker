import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BudgetService, Transaction } from '../services/budget';

@Component({
  imports: [CommonModule, RouterLink],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  budget = inject(BudgetService);

  // Sirf latest 4 transactions dashboard par dikhane ke liye
  get recentTransactions(): Transaction[] {
    return this.budget.transactions.slice(0, 4);
  }

  // Expense transactions ki total ginti
  get expenseCount(): number {
    return this.budget.transactions.filter((tx) => tx.type === 'expense').length;
  }

  // Category ke mutabiq icon dene ke liye helper
  getCategoryIcon(category: string, type: 'income' | 'expense'): string {
    if (type === 'income') return 'payments';

    const map: Record<string, string> = {
      Groceries: 'shopping_cart',
      'Food & Dining': 'restaurant',
      Utilities: 'bolt',
      'House Rent': 'home',
      Transport: 'local_gas_station',
    };
    return map[category] || 'receipt_long';
  }
}
