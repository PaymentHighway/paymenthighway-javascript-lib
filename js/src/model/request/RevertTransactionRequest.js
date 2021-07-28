"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RevertTransactionRequest = void 0;
const PhRequest_1 = require("./PhRequest");
/**
 * When reverting without amount,
 * entire amount will be reverted
 */
class RevertTransactionRequest extends PhRequest_1.Request {
    constructor(amount) {
        super();
        this.amount = amount;
    }
}
exports.RevertTransactionRequest = RevertTransactionRequest;
//# sourceMappingURL=RevertTransactionRequest.js.map