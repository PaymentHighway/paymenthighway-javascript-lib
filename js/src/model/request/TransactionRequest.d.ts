import { Card } from './Card';
import { Token } from '../Token';
export declare class TransactionRequest {
    card: Card;
    amount: number;
    currency: string;
    token: Token;
    order: string;
    customer: string;
    commit: boolean;
    constructor(cardOrToken: Card | Token, amount: number, currency: string, order?: string, customer?: string, commit?: boolean);
}
