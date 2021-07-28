"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Splitting = void 0;
/**
 * Class Splitting
 * Splits the payment into sub-merchant settlement and the main merchant commission. Requires separate activation.
 */
class Splitting {
    /**
    * @param merchant_id Sub-merchant ID from the settlements provider. Not to be confused with the sph-merchant value.
    * @param amount The amount settled to the sub-merchant's account. The rest will be considered as the main merchant's commission. In the smallest currency unit. E.g. 99.99 € = 9999.
    */
    constructor(merchant_id, amount) {
        this.merchant_id = merchant_id;
        this.amount = amount;
    }
}
exports.Splitting = Splitting;
//# sourceMappingURL=Splitting.js.map