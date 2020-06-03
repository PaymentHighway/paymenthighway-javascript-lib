import { Request } from './PhRequest';
/**
 * When reverting without amount,
 * entire amount will be reverted
 */
export declare class RevertTransactionRequest extends Request {
    amount?: number;
    constructor(amount?: number);
}
