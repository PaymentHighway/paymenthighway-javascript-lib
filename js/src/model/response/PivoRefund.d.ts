import { Status } from './Status';
export interface PivoRefund {
    refundRequestequestId: string;
    amount: Status;
    timestamp: string;
    referenceNumber: string;
}
