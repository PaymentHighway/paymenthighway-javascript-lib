import {CardResponse} from './CardResponse';
import {Result} from './Result';
import {Customer} from './Customer';
export interface TransactionResultResponse {
    card_token?: string;
    card?: CardResponse;
    customer?: Customer;
    cardholder_authentication: string;
    result: Result;
    committed: boolean;
    committed_amount?: number;
    filing_code: string;
    recurring: boolean;
}
