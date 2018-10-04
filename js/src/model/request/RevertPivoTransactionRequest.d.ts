/**
 * When reverting without amount,
 * entire amount will be reverted.
 */
export declare class RevertPivoTransactionRequest {
    reference_number?: string;
    amount?: number;
    constructor(reference_number?: string, amount?: number);
}
