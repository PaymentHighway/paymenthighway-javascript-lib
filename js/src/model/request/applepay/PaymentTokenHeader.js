"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PaymentTokenHeader {
    constructor(ephemeralPublicKey, publicKeyHash, transactionId, applicationData) {
        this.ephemeralPublicKey = ephemeralPublicKey;
        this.publicKeyHash = publicKeyHash;
        this.transactionId = transactionId;
        this.applicationData = applicationData;
    }
}
exports.PaymentTokenHeader = PaymentTokenHeader;
//# sourceMappingURL=PaymentTokenHeader.js.map