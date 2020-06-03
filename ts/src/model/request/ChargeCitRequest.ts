import {Card} from './Card';
import {Token} from '../Token';
import {Customer} from '../response/Customer';
import {Splitting} from '../Splitting';
import {StrongCustomerAuthentication} from './sca/StrongCustomerAuthentication';
import {Request} from './PhRequest';

export class ChargeCitRequest extends Request {

    constructor(
        public amount: number,
        public currency: string,
        public order: string,
        public strong_customer_authentication: StrongCustomerAuthentication,
        public card?: Card,
        public token?: Token,
        public customer?: Customer,
        public commit?: boolean,
        public splitting?: Splitting,
        public reference_number?: string
    ) {
        super();
    }

    /**
     * Payment using a card token when the customer is participating in the payment flow.
     * @param amount Payment amount
     * @param currency Payment currency
     * @param order Merchant-provided order ID for the purchase. Alphanumeric with dashes and underscores. Max length 254.
     * @param strongCustomerAuthentication Information provided for the SCA in case of a soft decline response from the issuer
     * @return Builder
     */
    public static Builder(amount: number, currency: string, order: string, strongCustomerAuthentication: StrongCustomerAuthentication): ChargeCitBuilder.RequestBuilder {
        return new ChargeCitBuilder.RequestBuilder(amount, currency, order, strongCustomerAuthentication);
    }
}

export namespace ChargeCitBuilder {

    export class RequestBuilder {
        private readonly amount: number;
        private readonly currency: string;
        private readonly order: string;
        private readonly strong_customer_authentication: StrongCustomerAuthentication;
        private card: Card;
        private token: Token;
        private customer: Customer;
        private commit: boolean;
        private splitting: Splitting;
        private reference_number: string;

        constructor(amount: number, currency: string, order: string, strongCustomerAuthentication: StrongCustomerAuthentication) {
            this.amount = amount;
            this.currency = currency;
            this.order = order;
            this.strong_customer_authentication = strongCustomerAuthentication;
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

        /**
         * Reference number used when settling the transaction to the merchant account.
         * Only used if one-by-ony transaction settling is configured.
         * @param referenceNumber In RF or Finnish reference number format.
         */
        public setReferenceNumber(referenceNumber: string) {
            this.reference_number = referenceNumber;
            return this;
        }

        public build(): ChargeCitRequest {

            if (!(this.card || this.token)) {
                throw new Error('Either card or token must be defined');
            }

            return new ChargeCitRequest(
                this.amount,
                this.currency,
                this.order,
                this.strong_customer_authentication,
                this.card,
                this.token,
                this.customer,
                this.commit,
                this.splitting,
                this.reference_number
            );
        }
    }
}