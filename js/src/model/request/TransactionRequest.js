"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = require("./Card");
class TransactionRequest {
    constructor(cardOrToken, amount, currency, order, customer, commit) {
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
    }
}
exports.TransactionRequest = TransactionRequest;
//# sourceMappingURL=TransactionRequest.js.map