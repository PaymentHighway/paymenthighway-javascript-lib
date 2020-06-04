"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PhRequest_1 = require("./PhRequest");
class ApplePayTransactionRequest extends PhRequest_1.Request {
    constructor(payment_data, amount, currency, commit, order, customer, reference_number, splitting) {
        super();
        this.payment_data = payment_data;
        this.amount = amount;
        this.currency = currency;
        this.commit = commit;
        this.order = order;
        this.customer = customer;
        this.reference_number = reference_number;
        this.splitting = splitting;
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
            return new ApplePayTransactionRequest(this.payment_data, this.amount, this.currency, this.commit, this.order, this.customer, this.reference_number, this.splitting);
        }
    }
    ApplePayTransaction.RequestBuilder = RequestBuilder;
})(ApplePayTransaction = exports.ApplePayTransaction || (exports.ApplePayTransaction = {}));
//# sourceMappingURL=ApplePayTransactionRequest.js.map