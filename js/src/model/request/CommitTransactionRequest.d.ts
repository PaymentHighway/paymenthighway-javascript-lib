import { Request } from "./PhRequest";
export declare class CommitTransactionRequest extends Request {
    amount: number;
    currency: string;
    constructor(amount: number, currency: string);
}
