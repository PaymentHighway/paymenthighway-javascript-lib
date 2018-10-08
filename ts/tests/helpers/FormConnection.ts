import * as requestPromise from 'request-promise';
import {RequestPromise} from 'request-promise';
import {PaymentAPI} from '../..';
import {FormContainer} from '../..';
import {Pair} from '../../src/util/Pair';

export class FormConnection {

    public static postForm(container: FormContainer): RequestPromise {
        const options = {
            simple: false,
            resolveWithFullResponse: true,
            method: 'POST',
            uri: container.getAction(),
            form: container.nameValuePairs.reduce((prev: any, cur: Pair<string, string>) => {
                prev[cur.first] = cur.second;
                return prev;
            }, {}),
            headers: {
                'User-Agent': PaymentAPI.USER_AGENT
            }
        };
        return requestPromise(options);
    }

}
