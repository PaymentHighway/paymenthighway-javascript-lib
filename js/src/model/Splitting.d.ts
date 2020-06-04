/**
 * Class Splitting
 * Splits the payment into sub-merchant settlement and the main merchant commission. Requires separate activation.
 */
export declare class Splitting {
    merchant_id: string;
    amount: number;
    /**
    * @param merchant_id Sub-merchant ID from the settlements provider. Not to be confused with the sph-merchant value.
    * @param amount The amount settled to the sub-merchant's account. The rest will be considered as the main merchant's commission. In the smallest currency unit. E.g. 99.99 € = 9999.
    */
    constructor(merchant_id: string, amount: number);
}
