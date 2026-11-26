import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BudgetService, Transaction } from '../services/budget';

@Component({
  imports: [CommonModule, FormsModule, RouterLink],
  selector: 'app-transactions',
  styleUrl: './transactions.css',
  templateUrl: './transactions.html',
})
export class Transactions {
  private budgetService = inject(BudgetService);

  searchQuery = '';
  selectedFilter: 'all' | 'income' | 'expense' = 'all';

  get filteredTransactions(): Transaction[] {
    return this.budgetService.transactions.filter((tx) => {
      const matchesType =
        this.selectedFilter === 'all' || tx.type === this.selectedFilter;

      const q = this.searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tx.title.toLowerCase().includes(q) ||
        tx.category.toLowerCase().includes(q) ||
        (tx.note && tx.note.toLowerCase().includes(q));

      return matchesType && matchesSearch;
    });
  }

  setFilter(filter: 'all' | 'income' | 'expense'): void {
    this.selectedFilter = filter;
  }

  onDelete(id: string): void {
    this.budgetService.deleteTransaction(id);
  }
  private router = inject(Router);

onEdit(id: string): void {
  this.router.navigate(['/add-transaction'], { queryParams: { id } });
}
}
