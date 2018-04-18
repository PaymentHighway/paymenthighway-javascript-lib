import {Response} from './Response';

export interface MobilePayInitResponse extends Response {
    session_token: string;
    uri: string;
    valid_until: string;
}
