"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PhRequest_1 = require("./PhRequest");
/**
 * When reverting without amount,
 * entire amount will be reverted
 */
class RevertSiirtoTransactionRequest extends PhRequest_1.Request {
    constructor(reference_number, amount) {
        super();
        this.reference_number = reference_number;
        this.amount = amount;
    }
}
exports.RevertSiirtoTransactionRequest = RevertSiirtoTransactionRequest;
//# sourceMappingURL=RevertSiirtoTransactionRequest.js.map