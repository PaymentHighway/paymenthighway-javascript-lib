import { Response } from './Response';
import { Status } from './Status';
export interface FormSessionStatusResponse extends Response {
    status: Status;
    transactionId?: String;
    operation: String;
    created: String;
    valid_until: String;
}
