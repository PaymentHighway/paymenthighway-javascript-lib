import {Response} from './Response';

export interface PivoInitResponse extends Response {
    transaction_id: string;
    uri: string;
    valid_until: string;
}
