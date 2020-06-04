import { Status } from './Status';
import { Customer } from './Customer';
import { PivoRefund } from './PivoRefund';
import { Splitting } from '../Splitting';
export interface PivoTransactionStatus {
    id: string;
    type: string;
    amount: string;
    current_amount: string;
    currency: string;
    timestamp: string;
    status: Status;
    reference_number: string;
    customer: Customer;
    order: string;
    pivo_payment_id: string;
    phone: string;
    payment_type: string;
    archive_id: string;
    modified: string;
    refunds: PivoRefund[];
    splitting?: Splitting;
}
