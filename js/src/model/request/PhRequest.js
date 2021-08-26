"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const PaymentHighwayUtility_1 = require("../../PaymentHighwayUtility");
class Request {
    constructor() {
        this.requestId = PaymentHighwayUtility_1.PaymentHighwayUtility.createRequestId();
    }
}
exports.Request = Request;
//# sourceMappingURL=PhRequest.js.map