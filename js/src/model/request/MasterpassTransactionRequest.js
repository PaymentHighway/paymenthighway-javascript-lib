"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PhRequest_1 = require("./PhRequest");
class MasterpassTransactionRequest extends PhRequest_1.Request {
    constructor(amount, currency, commit) {
        super();
        this.amount = amount;
        this.currency = currency;
        this.commit = commit;
    }
}
exports.MasterpassTransactionRequest = MasterpassTransactionRequest;
//# sourceMappingURL=MasterpassTransactionRequest.js.map