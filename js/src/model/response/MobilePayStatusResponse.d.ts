import { Response } from './Response';
export interface MobilePayStatusResponse extends Response {
    status: string;
    transaction_id?: string;
    valid_until?: string;
}
