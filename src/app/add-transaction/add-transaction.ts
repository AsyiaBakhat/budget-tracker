import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BudgetService } from '../services/budget';

@Component({
  selector: 'app-add-transaction',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './add-transaction.html',
  styleUrl: './add-transaction.css',
})
export class AddTransaction {
  private budgetService = inject(BudgetService);
  private router = inject(Router);

  type: 'income' | 'expense' = 'expense';
  amount: number | null = null;
  category = 'Groceries';
  date = new Date().toISOString().split('T')[0];
  note = '';
  errorMessage = '';

  setType(selectedType: 'income' | 'expense'): void {
    this.type = selectedType;
  }

  saveTransaction(): void {
    this.errorMessage = '';

    if (!this.amount || this.amount <= 0) {
      this.errorMessage = 'Please enter a valid positive amount.';
      return;
    }

    if (!this.date) {
      this.errorMessage = 'Please select a valid date.';
      return;
    }

    this.budgetService.addTransaction({
      type: this.type,
      amount: Number(this.amount),
      title: this.note.trim() || this.category,
      category: this.category,
      date: this.date,
      note: this.note.trim(),
    });

    this.router.navigate(['/transactions']);
  }
}