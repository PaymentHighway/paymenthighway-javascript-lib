"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommitTransactionRequest = void 0;
const PhRequest_1 = require("./PhRequest");
class CommitTransactionRequest extends PhRequest_1.Request {
    constructor(amount, currency) {
        super();
        this.amount = amount;
        this.currency = currency;
    }
}
exports.CommitTransactionRequest = CommitTransactionRequest;
//# sourceMappingURL=CommitTransactionRequest.js.map