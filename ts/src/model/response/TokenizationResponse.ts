import {Response} from './Response';
import {CardResponse} from './CardResponse';
import {Customer} from './Customer';

export interface TokenizationResponse extends Response {
    card_token: string;
    card: CardResponse;
    customer: Customer;
    cardholder_authentication: string;
    recurring: boolean;
}
