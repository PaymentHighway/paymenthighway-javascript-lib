import { Request } from './PhRequest';
export declare class MasterpassTransactionRequest extends Request {
    amount: number;
    currency: string;
    commit: boolean;
    reference_number?: string;
    constructor(amount: number, currency: string, commit?: boolean, referenceNumber?: string);
}
