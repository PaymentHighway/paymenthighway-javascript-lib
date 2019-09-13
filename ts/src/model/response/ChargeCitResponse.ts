import {Result} from './Result';
export interface ChargeCitResponse {
    result: Result;
    filing_code?: string;
    three_d_secure_url?: string;
}
