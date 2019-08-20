"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = require("./Card");
class ChargeCitRequest {
    constructor(cardOrToken, amount, currency, strong_customer_authentication, order, customer, commit, splitting) {
        if (cardOrToken instanceof Card_1.Card) {
            this.card = cardOrToken;
        }
        else {
            this.token = cardOrToken;
        }
        this.amount = amount;
        this.currency = currency;
        this.strong_customer_authentication = strong_customer_authentication;
        this.order = order;
        this.customer = customer;
        this.commit = commit;
        this.splitting = splitting;
    }
}
exports.ChargeCitRequest = ChargeCitRequest;
//# sourceMappingURL=ChargeCitRequest.js.map