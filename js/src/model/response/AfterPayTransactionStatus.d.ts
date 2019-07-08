import { Status } from './Status';
import { Customer } from './Customer';
import { AfterPayRevert } from './AfterPayRevert';
export interface AfterPayTransactionStatus {
    id: string;
    type: string;
    amount: number;
    current_amount: number;
    currency: string;
    timestamp: string;
    modified: string;
    status: Status;
    reverts?: AfterPayRevert[];
    customer?: Customer;
    order?: string;
    committed: boolean;
    committed_amount?: string;
    afterpay_payment_type: string;
    afterpay_checkout_id?: string;
    afterpay_reservation_id?: string;
    afterpay_customer_number?: string;
    afterpay_capture_number?: string;
    afterpay_outcome?: string;
}
