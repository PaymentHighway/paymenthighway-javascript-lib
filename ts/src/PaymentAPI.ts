import * as request from 'request';
import {PaymentHighwayUtility} from './PaymentHighwayUtility';
import {SecureSigner} from './security/SecureSigner';
import {Pair} from './util/Pair';

type Method = 'POST' | 'GET';

export class PaymentAPI {

    /* Payment API headers */
    public static USER_AGENT: string = 'PaymentHighway Javascript Library';
    public static METHOD_POST: string = 'POST';
    public static METHOD_GET: string = 'GET';
    public static CT_HEADER: string = 'Content-type';
    public static CT_HEADER_INFO: string = 'application/json; charset=utf-8';
    public static API_VERSION_INFO: string = '';

    constructor(public serviceUrl: string,
                public signatureKeyId: string,
                public signatureSecret: string,
                public account: string,
                public merchant: string,
                public apiVersion: string = '20150605') {
    }

    public initTransaction(callback: any): void {
        const paymentUri: string = '/transaction';
        this.executeRequest('POST', callback, paymentUri, this.createNameValuePairs());

    }

    /*
     public debitTransaction(transactionId, request){}

     public revertTransaction(UUID transactionId) throws IOException {}

     public transactionStatus(UUID transactionId) throws IOException {}

     public searchOrders(String order) throws IOException {}

     public commitTransaction(UUID transactionId, String amount, String currency) throws IOException {}

     public transactionResult(UUID transactionId) throws IOException {}

     public tokenize(UUID tokenizationId) throws IOException {}

     public fetchDailyReport(String date) throws IOException {}

     public fetchReconciliationReport(String date) throws IOException {}
     */

    /**
     * Create name value pairs
     *
     * @return
     */
    private createNameValuePairs(): Pair<string, string>[] {
        return [
            new Pair('sph-api-version', this.apiVersion),
            new Pair('sph-account', this.account),
            new Pair('sph-merchant', this.merchant),
            new Pair('sph-timestamp', PaymentHighwayUtility.getUtcTimestamp()),
            new Pair('sph-request-id', PaymentHighwayUtility.createRequestId())
        ];
    }

    private executeRequest(method: Method, callback: any,
                           path: string, nameValuePairs: Pair<string, string>[], requestBody?: Object): void {
        const ss = new SecureSigner(this.signatureKeyId, this.signatureSecret);
        let bodyString = '';
        if (requestBody) {
            bodyString = JSON.stringify(requestBody);
        }
        const signature = this.createSignature(ss, method, path, nameValuePairs, bodyString);
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
            headers: headers
        };

        if (requestBody) {
            headers['Content-Length'] = Buffer.byteLength(bodyString);
            options = Object.assign(options, {
                json: true,
                body: bodyString
            });
        }
        request(options, (error: any, response: any, body: any) => {
            if (error) {
                console.log(error);
            }
            callback(JSON.parse(body));
        });

    }

    private createSignature(ss: SecureSigner, method: Method, uri: string,
                            nameValuePairs: Pair<string, string>[], requestBody: string): string {

        return ss.createSignature(method, uri, nameValuePairs, requestBody);
    }

}
