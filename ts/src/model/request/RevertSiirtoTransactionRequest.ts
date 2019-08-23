import { Request } from "./PhRequest";

/**
 * When reverting without amount,
 * entire amount will be reverted
 */
export class RevertSiirtoTransactionRequest extends Request {
    constructor(public reference_number: string, public amount?: number) {
        super();
    }
}
