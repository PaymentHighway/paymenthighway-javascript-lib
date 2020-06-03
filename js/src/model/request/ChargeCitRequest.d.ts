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
    reference_number?: string;
    constructor(amount: number, currency: string, order: string, strong_customer_authentication: StrongCustomerAuthentication, card?: Card, token?: Token, customer?: Customer, commit?: boolean, splitting?: Splitting, reference_number?: string);
    /**
     * Payment using a card token when the customer is participating in the payment flow.
     * @param amount Payment amount
     * @param currency Payment currency
     * @param order Merchant-provided order ID for the purchase. Alphanumeric with dashes and underscores. Max length 254.
     * @param strongCustomerAuthentication Information provided for the SCA in case of a soft decline response from the issuer
     * @return Builder
     */
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
        private reference_number;
        constructor(amount: number, currency: string, order: string, strongCustomerAuthentication: StrongCustomerAuthentication);
        /**
         * @param card Card to charge (Only for PCI DSS certified parties!)
         */
        setCard(card: Card): this;
        /**
         * @param token Card token to charge
         */
        setToken(token: Token): this;
        setCustomer(customer: Customer): this;
        setCommit(commit: boolean): this;
        setSplitting(splitting: Splitting): this;
        /**
         * Reference number used when settling the transaction to the merchant account.
         * Only used if one-by-ony transaction settling is configured.
         * @param referenceNumber In RF or Finnish reference number format.
         */
        setReferenceNumber(referenceNumber: string): this;
        build(): ChargeCitRequest;
    }
}
