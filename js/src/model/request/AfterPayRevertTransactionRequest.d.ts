import { Request } from './PhRequest';
/**
 * When reverting without amount,
 * entire amount will be reverted
 */
export declare class AfterPayRevertTransactionRequest extends Request {
    amount?: number;
    constructor(amount?: number);
}
