import { Result } from './Result';
import { Customer } from './Customer';
export interface SiirtoTransactionResultResponse {
    status: string;
    customer?: Customer;
    amount: number;
    reference_number: string;
    result: Result;
}
