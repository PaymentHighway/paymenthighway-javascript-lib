import { Status } from './Status';
export interface Transaction {
    id: string;
    timestamp: string;
    type: string;
    partial_pan: string;
    amount: string;
    currency: string;
    filing_code: string;
    authorization_code: string;
    status: Status;
    cardholder_authentication: string;
    order: string;
}
