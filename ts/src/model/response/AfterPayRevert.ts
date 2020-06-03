import {Status} from './Status';

export interface AfterPayRevert {
    type: string;
    status: Status;
    amount: string;
    timestamp: string;
    afterpay_refund_type?: string;
    afterpay_refund_number?: string;
}
