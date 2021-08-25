import got, {CancelableRequest, Response as GotResponse} from 'got';
import {Method} from '../../src/util/Method';
import {PaymentAPI} from '../../src/PaymentAPI';
import {FormContainer} from '../../src/FormContainer';
import {Pair} from '../../src/util/Pair';

export class FormConnection {

    public static postForm(container: FormContainer): CancelableRequest<GotResponse<string>> {
        let method: Method = 'POST';

        const options = {
            method: method,
            url: container.getAction(),
            followRedirect: false,
            form: container.nameValuePairs.reduce((prev: any, cur: Pair<string, string>) => {
                prev[cur.first] = cur.second;
                return prev;
            }, {}),
            headers: {
                'User-Agent': PaymentAPI.USER_AGENT
            },
            timeout: {
                request: 30000
            }
        };

        return got(options);
    }
}
