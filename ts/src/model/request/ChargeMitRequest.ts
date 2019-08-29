import {Card} from './Card';
import {Token} from '../Token';
import {Customer} from '../response/Customer';
import {Splitting} from '../Splitting';
import {Request} from './PhRequest';

export class ChargeMitRequest extends Request {
    constructor(
        public amount: number,
        public currency: string,
        public order: string,
        public card?: Card,
        public token?: Token,
        public customer?: Customer,
        public commit?: boolean,
        public splitting?: Splitting
    ) {
        super();
    }

    /**
     * Payment using a card token when the customer is not participating in the payment flow.
     * A contract and understanding between the merchant and the customer must be established, allowing this kind of payments.
     * @param amount Payment amount
     * @param currency Payment currency
     * @param order Merchant-provided order ID for the purchase. Alphanumeric with dashes and underscores. Max length 254.
     * @return Builder
     */
    public static Builder(amount: number, currency: string, order: string): ChargeMitBuilder.RequestBuilder {
        return new ChargeMitBuilder.RequestBuilder(amount, currency, order);
    }
}

export namespace ChargeMitBuilder {
    export class RequestBuilder {
        private readonly amount: number;
        private readonly currency: string;
        private readonly order: string;
        private card: Card;
        private token: Token;
        private customer: Customer;
        private commit: boolean;
        private splitting: Splitting;

        constructor(amount: number, currency: string, order: string) {
            this.amount = amount;
            this.currency = currency;
            this.order = order;
        }

        /**
         * @param card Card to charge (Only for PCI DSS certified parties!)
         */
        public setCard(card: Card) {
            this.card = card;
            return this;
        }

        /**
         * @param token Card token to charge
         */
        public setToken(token: Token) {
            this.token = token;
            return this;
        }

        public setCustomer(customer: Customer) {
            this.customer = customer;
            return this;
        }

        public setCommit(commit: boolean) {
            this.commit = commit;
            return this;
        }

        public setSplitting(splitting: Splitting) {
            this.splitting = splitting;
            return this;
        }

        public build(): ChargeMitRequest {

            if (!(this.card || this.token)) {
                throw new Error('Either card or token must be defined');
            }

            return new ChargeMitRequest(
                this.amount,
                this.currency,
                this.order,
                this.card,
                this.token,
                this.customer,
                this.commit,
                this.splitting
            );
        }
    }
}
