import {Status} from './Status';
import {Customer} from './Customer';
import {PivoRefund} from './PivoRefund';

export interface PivoTransactionStatus {
    id: string;
    type: string;
    amount: string;
    currentAmount: string;
    currency: string;
    timestamp: string;
    status: Status;
    referenceNumber: string;
    customer: Customer;
    order: string;
    pivoPaymentId: string;
    phone: string;
    paymentType: string;
    archiveId: string;
    modified: string;
    refunds: PivoRefund;
}
