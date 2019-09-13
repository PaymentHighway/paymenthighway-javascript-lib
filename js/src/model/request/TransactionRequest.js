"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = require("./Card");
const PhRequest_1 = require("./PhRequest");
class TransactionRequest extends PhRequest_1.Request {
    constructor(cardOrToken, amount, currency, order, customer, commit, splitting) {
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
    }
}
exports.TransactionRequest = TransactionRequest;
//# sourceMappingURL=TransactionRequest.js.map