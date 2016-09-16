import { Token } from '../Token';
import { CardResponse } from './CardResponse';
export interface Response {
    result: Result;
    card?: CardResponse;
    token?: Token;
}
