import {Customer} from './Customer';
import {PaymentToken} from './applepay/PaymentToken';

export class ApplePayTransactionRequest {
    constructor(public payment_data: PaymentToken,
                public amount: number,
                public currency: string,
                public commit?: boolean,
                public order?: string,
                public customer?: Customer) {
    }

    public static Builder(payment_data: PaymentToken, amount: number, currency: string) {
        return new ApplePayTransaction.RequestBuilder(payment_data, amount, currency);
    }
}

export namespace ApplePayTransaction {
    export class RequestBuilder {
        private payment_data: PaymentToken;
        private amount: number;
        private currency: string;
        private commit?: boolean;
        private order?: string;
        private customer?: Customer;

        constructor(payment_data: PaymentToken, amount: number, currency: string) {
            this.payment_data = payment_data;
            this.amount = amount;
            this.currency = currency;
        }

        public setCommit(commit: boolean): RequestBuilder {
            this.commit = commit;
            return this;
        }
        public setOrder(order: string): RequestBuilder {
            this.order = order;
            return this;
        }
        public setCustomer(customer: Customer): RequestBuilder {
            this.customer = customer;
            return this;
        }

        public build(): ApplePayTransactionRequest {
            return new ApplePayTransactionRequest(
                this.payment_data,
                this.amount,
                this.currency,
                this.commit,
                this.order,
                this.customer
            );
        }
    }
}
