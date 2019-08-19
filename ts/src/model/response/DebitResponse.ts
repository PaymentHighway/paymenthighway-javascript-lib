import {Result} from './Result';
export interface DebitResponse {
    result: Result;
    filing_code?: string;
    three_d_secure_url?: string;
}
