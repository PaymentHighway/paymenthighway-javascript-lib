import { Merchant } from './Merchant';
import { Acquirer } from './Acquirer';
import { Transaction } from './Transaction';
export interface Settlement {
    status: string;
    id: string;
    batch: string;
    timestamp: string;
    reference: string;
    merchant: Merchant;
    acquirer: Acquirer;
    transaction_count: string;
    net_amount: number;
    currency: string;
    transactions: Transaction[];
}
