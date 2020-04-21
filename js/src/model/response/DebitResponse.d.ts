import { Result } from './Result';
import { AcquirerInfoResponse } from './AcquirerInfoResponse';
export interface DebitResponse extends AcquirerInfoResponse {
    result: Result;
    filing_code?: string;
}
