import { Card } from './Card';
import { Token } from '../Token';
import { Customer } from '../response/Customer';
import { Splitting } from '../Splitting';
import { Request } from './PhRequest';
export declare class TransactionRequest extends Request {
    card: Card;
    amount: number;
    currency: string;
    token: Token;
    order: string;
    customer: Customer;
    commit: boolean;
    splitting: Splitting;
    reference_number?: string;
    constructor(cardOrToken: Card | Token, amount: number, currency: string, order?: string, customer?: Customer, commit?: boolean, splitting?: Splitting, referenceNumber?: string);
}
