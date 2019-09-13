import { Customer } from './Customer';
import { PaymentData } from './applepay/PaymentData';
import { Request } from './PhRequest';
export declare class ApplePayTransactionRequest extends Request {
    payment_data: PaymentData;
    amount: number;
    currency: string;
    commit?: boolean;
    order?: string;
    customer?: Customer;
    constructor(payment_data: PaymentData, amount: number, currency: string, commit?: boolean, order?: string, customer?: Customer);
    static Builder(payment_data: PaymentData, amount: number, currency: string): ApplePayTransaction.RequestBuilder;
}
export declare namespace ApplePayTransaction {
    class RequestBuilder {
        private payment_data;
        private amount;
        private currency;
        private commit?;
        private order?;
        private customer?;
        constructor(payment_data: PaymentData, amount: number, currency: string);
        setCommit(commit: boolean): RequestBuilder;
        setOrder(order: string): RequestBuilder;
        setCustomer(customer: Customer): RequestBuilder;
        build(): ApplePayTransactionRequest;
    }
}
