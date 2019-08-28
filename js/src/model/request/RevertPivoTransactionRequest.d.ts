import { Request } from './PhRequest';
/**
 * When reverting without amount,
 * entire amount will be reverted.
 */
export declare class RevertPivoTransactionRequest extends Request {
    reference_number?: string;
    amount?: number;
    constructor(reference_number?: string, amount?: number);
}
