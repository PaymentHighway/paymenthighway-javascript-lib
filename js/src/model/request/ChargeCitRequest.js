"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PhRequest_1 = require("./PhRequest");
class ChargeCitRequest extends PhRequest_1.Request {
    constructor(amount, currency, order, strong_customer_authentication, card, token, customer, commit, splitting) {
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
    }
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
        setCard(card) {
            this.card = card;
            return this;
        }
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
            return new ChargeCitRequest(this.amount, this.currency, this.order, this.strong_customer_authentication, this.card, this.token, this.customer, this.commit, this.splitting);
        }
    }
    ChargeCitBuilder.RequestBuilder = RequestBuilder;
})(ChargeCitBuilder = exports.ChargeCitBuilder || (exports.ChargeCitBuilder = {}));
//# sourceMappingURL=ChargeCitRequest.js.map