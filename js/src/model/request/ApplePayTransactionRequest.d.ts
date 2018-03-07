import { Customer } from './Customer';
import { PaymentToken } from './applepay/PaymentToken';
export declare class ApplePayTransactionRequest {
    payment_data: PaymentToken;
    amount: number;
    currency: string;
    commit: boolean;
    order: string;
    customer: Customer;
    constructor(payment_data: PaymentToken, amount: number, currency: string, commit?: boolean, order?: string, customer?: Customer);
    static Builder(payment_data: PaymentToken, amount: number, currency: string): ApplePayTransaction.RequestBuilder;
}
export declare namespace ApplePayTransaction {
    class RequestBuilder {
        private payment_data;
        private amount;
        private currency;
        private commit?;
        private order?;
        private customer?;
        constructor(payment_data: PaymentToken, amount: number, currency: string);
        setCommit(commit: boolean): RequestBuilder;
        setOrder(order: string): RequestBuilder;
        setCustomer(customer: Customer): RequestBuilder;
        build(): ApplePayTransactionRequest;
    }
}
