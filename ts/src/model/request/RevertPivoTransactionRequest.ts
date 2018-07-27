/**
 * When reverting without amount,
 * entire amount will be reverted.
 */
export class RevertPivoTransactionRequest {
    constructor(public reference_number?: string, public amount?: number) {
    }
}
