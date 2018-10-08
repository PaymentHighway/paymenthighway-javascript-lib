import { Response } from './Response';
import { CardResponse } from './CardResponse';
export interface TokenizationResponse extends Response {
    card_token: string;
    card: CardResponse;
}
