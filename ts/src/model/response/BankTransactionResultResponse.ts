import {Result} from './Result';
import {Customer} from './Customer';
export interface BankTransactionResultResponse {
    customer?: Customer;
    result: Result;
    status: string;
    amount: number;
}
