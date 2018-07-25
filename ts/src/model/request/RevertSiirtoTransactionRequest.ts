/**
 * When reverting without amount,
 * entire amount will be reverted
 */
export class RevertSiirtoTransactionRequest {
    constructor(public reference_number: string, public amount?: number) {
    }
}
