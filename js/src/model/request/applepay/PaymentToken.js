"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PaymentToken {
    constructor(data, header, signature, version) {
        this.data = data;
        this.header = header;
        this.signature = signature;
        this.version = version;
    }
}
exports.PaymentToken = PaymentToken;
//# sourceMappingURL=PaymentToken.js.map