import {Token} from '../Token';
import {CardResponse} from './CardResponse';
import {Result} from './Result';

export interface Response {
    result: Result;
    card?: CardResponse;
    token?: Token;
}
