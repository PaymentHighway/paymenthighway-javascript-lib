"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PhRequest_1 = require("./PhRequest");
class ChargeCitRequest extends PhRequest_1.Request {
    constructor(amount, currency, order, strong_customer_authentication, card, token, customer, commit, splitting, reference_number) {
        super();
        this.amount = amount;
        this.currency = currency;
        this.order = order;
        this.strong_customer_authentication = strong_customer_authentication;
        this.card = card;
        this.token = token;
        this.customer = customer;
        this.commit = commit;
        this.splitting = splitting;
        this.reference_number = reference_number;
    }
    /**
     * Payment using a card token when the customer is participating in the payment flow.
     * @param amount Payment amount
     * @param currency Payment currency
     * @param order Merchant-provided order ID for the purchase. Alphanumeric with dashes and underscores. Max length 254.
     * @param strongCustomerAuthentication Information provided for the SCA in case of a soft decline response from the issuer
     * @return Builder
     */
    static Builder(amount, currency, order, strongCustomerAuthentication) {
        return new ChargeCitBuilder.RequestBuilder(amount, currency, order, strongCustomerAuthentication);
    }
}
exports.ChargeCitRequest = ChargeCitRequest;
var ChargeCitBuilder;
(function (ChargeCitBuilder) {
    class RequestBuilder {
        constructor(amount, currency, order, strongCustomerAuthentication) {
            this.amount = amount;
            this.currency = currency;
            this.order = order;
            this.strong_customer_authentication = strongCustomerAuthentication;
        }
        /**
         * @param card Card to charge (Only for PCI DSS certified parties!)
         */
        setCard(card) {
            this.card = card;
            return this;
        }
        /**
         * @param token Card token to charge
         */
        setToken(token) {
            this.token = token;
            return this;
        }
        setCustomer(customer) {
            this.customer = customer;
            return this;
        }
        setCommit(commit) {
            this.commit = commit;
            return this;
        }
        setSplitting(splitting) {
            this.splitting = splitting;
            return this;
        }
        /**
         * Reference number used when settling the transaction to the merchant account.
         * Only used if one-by-ony transaction settling is configured.
         * @param referenceNumber In RF or Finnish reference number format.
         */
        setReferenceNumber(referenceNumber) {
            this.reference_number = referenceNumber;
            return this;
        }
        build() {
            if (!(this.card || this.token)) {
                throw new Error('Either card or token must be defined');
            }
            return new ChargeCitRequest(this.amount, this.currency, this.order, this.strong_customer_authentication, this.card, this.token, this.customer, this.commit, this.splitting, this.reference_number);
        }
    }
    ChargeCitBuilder.RequestBuilder = RequestBuilder;
})(ChargeCitBuilder = exports.ChargeCitBuilder || (exports.ChargeCitBuilder = {}));
//# sourceMappingURL=ChargeCitRequest.js.map