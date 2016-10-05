import { Card } from './Card';
import { Token } from '../Token';
import { Customer } from '../response/Customer';
export declare class TransactionRequest {
    card: Card;
    amount: number;
    currency: string;
    token: Token;
    order: string;
    customer: Customer;
    commit: boolean;
    constructor(cardOrToken: Card | Token, amount: number, currency: string, order?: string, customer?: Customer, commit?: boolean);
}
