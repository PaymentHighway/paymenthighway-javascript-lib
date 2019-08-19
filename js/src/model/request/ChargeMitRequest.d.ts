import { Card } from './Card';
import { Token } from '../Token';
import { Customer } from '../response/Customer';
import { Splitting } from '../Splitting';
export declare class ChargeMitRequest {
    card: Card;
    amount: number;
    currency: string;
    token: Token;
    order: string;
    customer: Customer;
    commit: boolean;
    splitting: Splitting;
    constructor(cardOrToken: Card | Token, amount: number, currency: string, order?: string, customer?: Customer, commit?: boolean, splitting?: Splitting);
}
