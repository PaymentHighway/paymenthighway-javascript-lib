"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PhRequest_1 = require("./PhRequest");
/**
 * When reverting without amount,
 * entire amount will be reverted
 */
class AfterPayRevertTransactionRequest extends PhRequest_1.Request {
    constructor(amount) {
        super();
        this.amount = amount;
    }
}
exports.AfterPayRevertTransactionRequest = AfterPayRevertTransactionRequest;
//# sourceMappingURL=AfterPayRevertTransactionRequest.js.map