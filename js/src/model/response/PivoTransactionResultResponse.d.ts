import { Result } from './Result';
import { Customer } from './Customer';
export interface PivoTransactionResultResponse {
    state: string;
    customer?: Customer;
    amount: number;
    current_amount: number;
    reference_number: string;
    archive_id: string;
    payment_type: string;
    result: Result;
}
