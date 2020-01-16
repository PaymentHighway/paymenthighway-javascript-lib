"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PhRequest_1 = require("./PhRequest");
class MasterpassTransactionRequest extends PhRequest_1.Request {
    constructor(amount, currency, commit, referenceNumber) {
        super();
        this.amount = amount;
        this.currency = currency;
        this.commit = commit;
        this.reference_number = referenceNumber;
    }
}
exports.MasterpassTransactionRequest = MasterpassTransactionRequest;
//# sourceMappingURL=MasterpassTransactionRequest.js.map