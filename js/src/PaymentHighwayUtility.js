"use strict";
const Uuid = require('node-uuid');
class PaymentHighwayUtility {
    /**
     * Cryptographically strong pseudo random number generator.
     *
     * @return String UUID.
     */
    static createRequestId() {
        return Uuid.v4();
    }
    /**
     * Request timestamp in ISO 8601 combined date and time in UTC.
     *
     * @return String timestamp Example: 2014-09-18T10:32:59Z
     */
    static getUtcTimestamp() {
        const date = new Date();
        return date.toISOString().replace(/\.[0-9]{3}/, '');
    }
}
exports.PaymentHighwayUtility = PaymentHighwayUtility;
//# sourceMappingURL=PaymentHighwayUtility.js.map