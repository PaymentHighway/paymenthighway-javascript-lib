import {CardResponse} from './CardResponse';
import {Result} from './Result';
import {Customer} from './Customer';
import {AcquirerInfoResponse} from './AcquirerInfoResponse';
export interface TransactionResultResponse extends AcquirerInfoResponse {
    card_token?: string;
    card?: CardResponse;
    customer?: Customer;
    cardholder_authentication: string;
    result: Result;
    committed: boolean;
    committed_amount?: number;
    filing_code: string;
    recurring: boolean;
    reference_number?: string;
}
