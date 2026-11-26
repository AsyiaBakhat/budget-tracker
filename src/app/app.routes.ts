import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { AddTransaction } from './add-transaction/add-transaction';
import { Transactions } from './transactions/transactions';
import { Summary } from './summary/summary';

export const routes: Routes = [
    { path: '', component: Dashboard },
    { path: 'add-transaction', component: AddTransaction },
    { path: 'transactions', component: Transactions },
    { path: 'summary', component: Summary }
];
