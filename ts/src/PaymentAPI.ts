import * as requestPromise from 'request-promise';
import {PaymentHighwayUtility} from './PaymentHighwayUtility';
import {SecureSigner} from './security/SecureSigner';
import {Pair} from './util/Pair';
import {RequestPromise} from 'request-promise';
import {TransactionResponse} from './model/response/TransactionResponse';

type Method = 'POST' | 'GET';

export class PaymentAPI {

    /* Payment API headers */
    public static USER_AGENT: string = 'PaymentHighway Javascript Library';

    constructor(public serviceUrl: string,
                public signatureKeyId: string,
                public signatureSecret: string,
                public account: string,
                public merchant: string,
                public apiVersion: string = '20150605') {
    }

    public initTransaction(): Promise<TransactionResponse> {
        const paymentUri = '/transaction';
        return this.makeRequest('POST',  paymentUri);
    }

    public debitTransaction(transactionId: string, request: Object): Promise<TransactionResponse> {
        const debitUri = '/transaction/' + transactionId + '/debit';
        return this.makeRequest('POST',  debitUri, request);
    }

    public revertTransaction(transactionId: string, request: any): void {
        const revertUri = '/transaction/' + transactionId + '/revert';
        this.executeRequest('POST',  revertUri, this.createNameValuePairs(), request);
    }

    public commitTransaction(transactionId: string, request: any): void {
        const commitUri = '/transaction/' + transactionId + '/commit';
        this.executeRequest('POST',  commitUri, this.createNameValuePairs(), request);
    }

    public transactionResult(transactionId: string): void {
        const transactionResultUrl = '/transaction/' + transactionId + '/result';
        this.executeRequest('GET',  transactionResultUrl, this.createNameValuePairs());
    }

    public transactionStatus(transactionId: string): void {
        const statusUri = '/transaction/' + transactionId;
        this.executeRequest('GET',  statusUri, this.createNameValuePairs());
    }

    public searchOrders(order: string): void {
        const searchUri = '/transactions/?order=' + order;
        this.executeRequest('GET',  searchUri, this.createNameValuePairs());

    }

    public tokenization(tokenizationId: string): void {
        const tokenUri = '/tokenization/' + tokenizationId;
        this.executeRequest('GET',  tokenUri, this.createNameValuePairs());
    }

    public fetchReport(date: string): void {
        const fetchUri = '/report/batch/' + date;
        this.executeRequest('GET', fetchUri, this.createNameValuePairs());
    }

    /*

     public revertTransaction(UUID transactionId) throws IOException {}

     public transactionStatus(UUID transactionId) throws IOException {}

     public searchOrders(String order) throws IOException {}

     public commitTransaction(UUID transactionId, String amount, String currency) throws IOException {}

     public transactionResult(UUID transactionId) throws IOException {}

     public tokenize(UUID tokenizationId) throws IOException {}

     public fetchDailyReport(String date) throws IOException {}

     public fetchReconciliationReport(String date) throws IOException {}
     */

    private handleError(err: any): any {
        return err;
    }

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

    private makeRequest(method: Method, paymentUri: string, requestBody?: Object): Promise<TransactionResponse> {
        return this.executeRequest('POST',  paymentUri, this.createNameValuePairs(), requestBody)
            .then((body: TransactionResponse) => {
                return body;
            })
            .catch((err: any) => {
                return this.handleError(err);
            });
    }

    private executeRequest(method: Method, path: string, nameValuePairs: Pair<string, string>[], requestBody?: Object): RequestPromise {
        const ss = new SecureSigner(this.signatureKeyId, this.signatureSecret);
        let bodyString = '';
        if (requestBody) {
            bodyString = JSON.stringify(requestBody);
        }
        const signature = ss.createSignature(method, path, nameValuePairs, bodyString);
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
