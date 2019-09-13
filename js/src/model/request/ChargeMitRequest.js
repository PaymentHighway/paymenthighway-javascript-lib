"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PhRequest_1 = require("./PhRequest");
class ChargeMitRequest extends PhRequest_1.Request {
    constructor(amount, currency, order, card, token, customer, commit, splitting) {
        super();
        this.amount = amount;
        this.currency = currency;
        this.order = order;
        this.card = card;
        this.token = token;
        this.customer = customer;
        this.commit = commit;
        this.splitting = splitting;
    }
    /**
     * Payment using a card token when the customer is not participating in the payment flow.
     * A contract and understanding between the merchant and the customer must be established, allowing this kind of payments.
     * @param amount Payment amount
     * @param currency Payment currency
     * @param order Merchant-provided order ID for the purchase. Alphanumeric with dashes and underscores. Max length 254.
     * @return Builder
     */
    static Builder(amount, currency, order) {
        return new ChargeMitBuilder.RequestBuilder(amount, currency, order);
    }
}
exports.ChargeMitRequest = ChargeMitRequest;
var ChargeMitBuilder;
(function (ChargeMitBuilder) {
    class RequestBuilder {
        constructor(amount, currency, order) {
            this.amount = amount;
            this.currency = currency;
            this.order = order;
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
        build() {
            if (!(this.card || this.token)) {
                throw new Error('Either card or token must be defined');
            }
            return new ChargeMitRequest(this.amount, this.currency, this.order, this.card, this.token, this.customer, this.commit, this.splitting);
        }
    }
    ChargeMitBuilder.RequestBuilder = RequestBuilder;
})(ChargeMitBuilder = exports.ChargeMitBuilder || (exports.ChargeMitBuilder = {}));
//# sourceMappingURL=ChargeMitRequest.js.map