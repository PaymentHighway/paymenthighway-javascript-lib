import { Request } from "./PhRequest";

/**
 * When reverting without amount,
 * entire amount will be reverted
 */
export class RevertTransactionRequest extends Request {
    constructor(public amount?: number) {
        super();
    }
}
