import * as requestPromise from 'request-promise';
import {PaymentHighwayUtility} from './PaymentHighwayUtility';
import {SecureSigner} from './security/SecureSigner';
import {Pair} from './util/Pair';
import {RequestPromise} from 'request-promise';
import {Method} from './util/Method';
import {TokenizationResponse} from './model/response/TokenizationResponse';
import {Response} from './model/response/Response';

/**
 * Payment Highway Payment API Service.
 */
export class PaymentAPI {

    private static API_VERSION: string = '20180927';

    // Payment API headers
    public static USER_AGENT: string = 'PaymentHighway Javascript Library';

    private secureSigner: SecureSigner;

    constructor(private serviceUrl: string,
                private signatureKeyId: string,
                private signatureSecret: string,
                private account: string,
                private merchant: string) {
        this.secureSigner = new SecureSigner(this.signatureKeyId, this.signatureSecret);
    }

    /**
     * Payment Highway Tokenize Request
     *
     * @param tokenizationId
     * @returns {PromiseLike<TokenizationResponse>}
     */
    public tokenization(tokenizationId: string): PromiseLike<TokenizationResponse> {
        const tokenUri = '/tokenization/' + tokenizationId;
        return this.makeRequest('GET', tokenUri);
    }

    /**
     * Create name value pairs
     *
     * @return
     */
    private createNameValuePairs(): Pair<string, string>[] {
        return [
            new Pair('sph-api-version', PaymentAPI.API_VERSION),
            new Pair('sph-account', this.account),
            new Pair('sph-merchant', this.merchant),
            new Pair('sph-timestamp', PaymentHighwayUtility.getUtcTimestamp()),
            new Pair('sph-request-id', PaymentHighwayUtility.createRequestId())
        ];
    }

    /**
     *
     * @param method
     * @param paymentUri
     * @param requestBody
     * @returns {PromiseLike<Response>}
     */
    private makeRequest(method: Method, paymentUri: string, requestBody?: Object): PromiseLike<any> {
        return this.executeRequest(method, paymentUri, this.createNameValuePairs(), requestBody)
            .then((body: Response) => body);
    }

    /**
     *
     * @param method
     * @param path
     * @param nameValuePairs
     * @param requestBody
     * @returns {requestPromise.RequestPromise}
     */
    private executeRequest(method: Method, path: string, nameValuePairs: Pair<string, string>[], requestBody?: Object): RequestPromise {
        let bodyString = '';
        if (requestBody) {
            bodyString = JSON.stringify(requestBody);
        }
        const signature = this.secureSigner.createSignature(method, path, nameValuePairs, bodyString);
        nameValuePairs.push(new Pair('signature', signature));
        let headers: Header = {
            'Content-Type': 'application/json; charset=utf-8',
            'User-Agent': PaymentAPI.USER_AGENT
        };
        nameValuePairs.forEach((pair) => {
            headers[pair.first] = pair.second;
        });
        let options = {
            baseUrl: this.serviceUrl,
            uri: path,
            method: method,
            headers: headers,
            json: true
        };

        if (requestBody) {
            headers['Content-Length'] = Buffer.byteLength(bodyString, 'utf-8');
            options = Object.assign(options, {
                body: requestBody
            });
        }
        return requestPromise(options);

    }
}
