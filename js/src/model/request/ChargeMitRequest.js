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
            return new ChargeMitRequest(this.amount, this.currency, this.order, this.card, this.token, this.customer, this.commit, this.splitting);
        }
    }
    ChargeMitBuilder.RequestBuilder = RequestBuilder;
})(ChargeMitBuilder = exports.ChargeMitBuilder || (exports.ChargeMitBuilder = {}));
//# sourceMappingURL=ChargeMitRequest.js.map