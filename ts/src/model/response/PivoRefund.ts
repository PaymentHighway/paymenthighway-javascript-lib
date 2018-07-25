import {Status} from './Status';

export interface PivoRefund {
    refund_requestequest_id: string;
    amount: Status;
    timestamp: string;
    reference_number: string;
}
