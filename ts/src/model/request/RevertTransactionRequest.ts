/**
 * When reverting without amount,
 * entire amount will be reverted
 */
export class RevertTransactionRequest {
    constructor(public amount?: number) {
    }
}
