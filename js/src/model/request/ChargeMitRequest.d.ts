import { Card } from './Card';
import { Token } from '../Token';
import { Customer } from '../response/Customer';
import { Splitting } from '../Splitting';
import { Request } from './PhRequest';
export declare class ChargeMitRequest extends Request {
    amount: number;
    currency: string;
    order: string;
    card?: Card;
    token?: Token;
    customer?: Customer;
    commit?: boolean;
    splitting?: Splitting;
    constructor(amount: number, currency: string, order: string, card?: Card, token?: Token, customer?: Customer, commit?: boolean, splitting?: Splitting);
    static Builder(amount: number, currency: string, order: string): ChargeMitBuilder.RequestBuilder;
}
export declare namespace ChargeMitBuilder {
    class RequestBuilder {
        private readonly amount;
        private readonly currency;
        private readonly order;
        private card;
        private token;
        private customer;
        private commit;
        private splitting;
        constructor(amount: number, currency: string, order: string);
        setCard(card: Card): this;
        setToken(token: Token): this;
        setCustomer(customer: Customer): this;
        setCommit(commit: boolean): this;
        setSplitting(splitting: Splitting): this;
        build(): ChargeMitRequest;
    }
}
