import { Card } from './Card';
import { Token } from '../Token';
import { Customer } from '../response/Customer';
import { Splitting } from '../Splitting';
import { StrongCustomerAuthentication } from './sca/StrongCustomerAuthentication';
import { Request } from './PhRequest';
export declare class ChargeCitRequest extends Request {
    amount: number;
    currency: string;
    order: string;
    strong_customer_authentication: StrongCustomerAuthentication;
    card?: Card;
    token?: Token;
    customer?: Customer;
    commit?: boolean;
    splitting?: Splitting;
    constructor(amount: number, currency: string, order: string, strong_customer_authentication: StrongCustomerAuthentication, card?: Card, token?: Token, customer?: Customer, commit?: boolean, splitting?: Splitting);
    static Builder(amount: number, currency: string, order: string, strongCustomerAuthentication: StrongCustomerAuthentication): ChargeCitBuilder.RequestBuilder;
}
export declare namespace ChargeCitBuilder {
    class RequestBuilder {
        private readonly amount;
        private readonly currency;
        private readonly order;
        private readonly strong_customer_authentication;
        private card;
        private token;
        private customer;
        private commit;
        private splitting;
        constructor(amount: number, currency: string, order: string, strongCustomerAuthentication: StrongCustomerAuthentication);
        setCard(card: Card): this;
        setToken(token: Token): this;
        setCustomer(customer: Customer): this;
        setCommit(commit: boolean): this;
        setSplitting(splitting: Splitting): this;
        build(): ChargeCitRequest;
    }
}
