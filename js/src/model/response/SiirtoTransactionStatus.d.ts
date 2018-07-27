import { Status } from './Status';
import { Customer } from './Customer';
import { SiirtoRefund } from './SiirtoRefund';
export interface SiirtoTransactionStatus {
    id: string;
    type: string;
    amount: string;
    current_amount: string;
    currency: string;
    timestamp: string;
    status: Status;
    reference_number: string;
    message: string;
    customer: Customer;
    recipient: string;
    order: string;
    refunds: SiirtoRefund[];
}
