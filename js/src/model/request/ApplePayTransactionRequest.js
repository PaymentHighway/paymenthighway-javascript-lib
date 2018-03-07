"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApplePayTransactionRequest {
    constructor(payment_data, amount, currency, commit, order, customer) {
        this.payment_data = payment_data;
        this.amount = amount;
        this.currency = currency;
        this.commit = commit;
        this.order = order;
        this.customer = customer;
    }
    static Builder(payment_data, amount, currency) {
        return new ApplePayTransaction.RequestBuilder(payment_data, amount, currency);
    }
}
exports.ApplePayTransactionRequest = ApplePayTransactionRequest;
var ApplePayTransaction;
(function (ApplePayTransaction) {
    class RequestBuilder {
        constructor(payment_data, amount, currency) {
            this.payment_data = payment_data;
            this.amount = amount;
            this.currency = currency;
        }
        setCommit(commit) {
            this.commit = commit;
            return this;
        }
        setOrder(order) {
            this.order = order;
            return this;
        }
        setCustomer(customer) {
            this.customer = customer;
            return this;
        }
        build() {
            return new ApplePayTransactionRequest(this.payment_data, this.amount, this.currency, this.commit, this.order, this.customer);
        }
    }
    ApplePayTransaction.RequestBuilder = RequestBuilder;
})(ApplePayTransaction = exports.ApplePayTransaction || (exports.ApplePayTransaction = {}));
//# sourceMappingURL=ApplePayTransactionRequest.js.map