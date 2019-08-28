import { Request } from './PhRequest';
export declare class MasterpassTransactionRequest extends Request {
    amount: number;
    currency: string;
    commit: boolean;
    constructor(amount: number, currency: string, commit?: boolean);
}
