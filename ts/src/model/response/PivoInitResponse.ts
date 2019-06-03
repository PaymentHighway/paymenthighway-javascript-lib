import {Response} from './Response';

export interface PivoInitResponse extends Response {
    uri: string;
    valid_until: string;
}