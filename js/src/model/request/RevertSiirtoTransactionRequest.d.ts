/**
 * When reverting without amount,
 * entire amount will be reverted
 */
export declare class RevertSiirtoTransactionRequest {
    reference_number: string;
    amount?: number;
    constructor(reference_number: string, amount?: number);
}
