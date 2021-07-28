"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AfterPayCommitTransactionRequest = void 0;
const PhRequest_1 = require("./PhRequest");
class AfterPayCommitTransactionRequest extends PhRequest_1.Request {
    constructor(amount) {
        super();
        this.amount = amount;
    }
}
exports.AfterPayCommitTransactionRequest = AfterPayCommitTransactionRequest;
//# sourceMappingURL=AfterPayCommitTransactionRequest.js.map