import {Response} from './Response';
import { Status } from './Status';
export interface FormSessionStatusResponse extends Response {
    status: Status;
    transaction_id?: String;
    operation: String;
    created: String;
    valid_until: String;
}
