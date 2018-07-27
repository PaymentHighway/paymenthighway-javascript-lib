import {Status} from './Status';

export interface Revert {
    type: string;
    status: Status;
    amount: string;
    timestamp: string;
    modified: string;
    filing_code?: string;
}
