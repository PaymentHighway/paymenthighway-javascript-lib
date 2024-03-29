"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRequest = void 0;
const Card_1 = require("./Card");
const PhRequest_1 = require("./PhRequest");
class TransactionRequest extends PhRequest_1.Request {
    constructor(cardOrToken, amount, currency, order, customer, commit, splitting, referenceNumber) {
        super();
        if (cardOrToken instanceof Card_1.Card) {
            this.card = cardOrToken;
        }
        else {
            this.token = cardOrToken;
        }
        this.amount = amount;
        this.currency = currency;
        this.order = order;
        this.customer = customer;
        this.commit = commit;
        this.splitting = splitting;
        this.reference_number = referenceNumber;
    }
}
exports.TransactionRequest = TransactionRequest;
//# sourceMappingURL=TransactionRequest.js.map