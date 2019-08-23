import { Request } from "./PhRequest";

/**
 * When reverting without amount,
 * entire amount will be reverted
 */
export class AfterPayRevertTransactionRequest extends Request {
    constructor(public amount?: number) {
        super();
    }
}
