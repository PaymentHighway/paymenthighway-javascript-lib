/**
 * Class Splitting
 * Splits the payment into sub-merchant settlement and the main merchant commission. Requires separate activation.
 */
export class Splitting {
    /**
    * @param merchant_id Sub-merchant ID from the settlements provider. Not to be confused with the sph-merchant value.
    * @param amount The amount settled to the sub-merchant's account. The rest will be considered as the main merchant's commission. In the smallest currency unit. E.g. 99.99 € = 9999.
    */
    constructor(public merchant_id: string, public amount: number) {
    }
}
