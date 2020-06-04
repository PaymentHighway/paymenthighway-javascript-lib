import { Response } from './Response';
import { CardResponse } from './CardResponse';
import { Customer } from './Customer';
import { AcquirerInfoResponse } from './AcquirerInfoResponse';
export interface TokenizationResponse extends Response, AcquirerInfoResponse {
    card_token: string;
    card: CardResponse;
    customer: Customer;
    cardholder_authentication: string;
    recurring: boolean;
}
