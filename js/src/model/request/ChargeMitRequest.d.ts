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
    reference_number?: string;
    constructor(amount: number, currency: string, order: string, card?: Card, token?: Token, customer?: Customer, commit?: boolean, splitting?: Splitting, reference_number?: string);
    /**
     * Payment using a card token when the customer is not participating in the payment flow.
     * A contract and understanding between the merchant and the customer must be established, allowing this kind of payments.
     * @param amount Payment amount
     * @param currency Payment currency
     * @param order Merchant-provided order ID for the purchase. Alphanumeric with dashes and underscores. Max length 254.
     * @return Builder
     */
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
        private reference_number;
        constructor(amount: number, currency: string, order: string);
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
        build(): ChargeMitRequest;
    }
}
