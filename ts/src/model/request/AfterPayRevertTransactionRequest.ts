/**
 * When reverting without amount,
 * entire amount will be reverted
 */
export class AfterPayRevertTransactionRequest {
    constructor(public amount?: number) {
    }
}
