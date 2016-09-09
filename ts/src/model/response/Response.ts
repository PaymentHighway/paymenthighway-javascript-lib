import {Card} from '../request/Card';
import {Token} from '../Token';

export interface Response {
    result: Result;
    card?: Card;
    token?: Token;
}
