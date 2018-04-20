"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PaymentDataHeader {
    constructor(ephemeralPublicKey, publicKeyHash, transactionId, applicationData) {
        this.ephemeralPublicKey = ephemeralPublicKey;
        this.publicKeyHash = publicKeyHash;
        this.transactionId = transactionId;
        this.applicationData = applicationData;
    }
}
exports.PaymentDataHeader = PaymentDataHeader;
//# sourceMappingURL=PaymentDataHeader.js.map