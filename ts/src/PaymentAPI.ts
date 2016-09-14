import * as requestPromise from 'request-promise';
import {PaymentHighwayUtility} from './PaymentHighwayUtility';
import {SecureSigner} from './security/SecureSigner';
import {Pair} from './util/Pair';
import {RequestPromise} from 'request-promise';
import {TransactionResponse} from './model/response/TransactionResponse';
import {TransactionStatusResponse} from './model/response/TransactionStatusResponse';
import {OrderSearchResponse} from './model/response/OrderSearchResponse';
import {ReportResponse} from './model/response/ReportResponse';
import {ReconciliationReportResponse} from './model/response/ReconciliationReportResponse';
import {Method} from './util/Method';
import {TokenizationResponse} from './model/response/TokenizationResponse';

export class PaymentAPI {

    /* Payment API headers */
    public static USER_AGENT: string = 'PaymentHighway Javascript Library';

    constructor(private serviceUrl: string,
                private signatureKeyId: string,
                private signatureSecret: string,
                private account: string,
                private merchant: string,
                private apiVersion: string = '20160630') {
    }

    public initTransaction(): Promise<TransactionResponse> {
        const paymentUri = '/transaction';
        return this.makeRequest('POST', paymentUri);
    }

    public debitTransaction(transactionId: string, request: Object): Promise<TransactionResponse> {
        const debitUri = '/transaction/' + transactionId + '/debit';
        return this.makeRequest('POST', debitUri, request);
    }

    public revertTransaction(transactionId: string, request: Object): Promise<TransactionResponse> {
        const revertUri = '/transaction/' + transactionId + '/revert';
        return this.makeRequest('POST', revertUri, request);
    }

    public commitTransaction(transactionId: string, request: any): Promise<TransactionResponse> {
        const commitUri = '/transaction/' + transactionId + '/commit';
        return this.makeRequest('POST', commitUri, request);
    }

    public transactionStatus(transactionId: string): Promise<TransactionStatusResponse> {
        const statusUri = '/transaction/' + transactionId;
        return this.makeRequest('GET', statusUri);
    }

    public searchOrders(order: string): Promise<OrderSearchResponse> {
        const searchUri = '/transactions/?order=' + order;
        return this.makeRequest('GET', searchUri);
    }

    public tokenization(tokenizationId: string): Promise<TokenizationResponse> {
        const tokenUri = '/tokenization/' + tokenizationId;
        return this.makeRequest('GET', tokenUri);
    }

    public transactionResult(transactionId: string): Promise<TransactionResponse> {
        const transactionResultUrl = '/transaction/' + transactionId + '/result';
        return this.makeRequest('GET', transactionResultUrl);
    }

    public fetchDailyReport(date: string): Promise<ReportResponse> {
        const reportUri = '/report/batch/' + date;
        return this.makeRequest('GET', reportUri);
    }

    public fetchReconciliationReport(date: string, useDateProcessed: boolean = false): Promise<ReconciliationReportResponse> {
        const reportUri = '/report/reconciliation/' + date + '?use-date-processed=' + useDateProcessed;
        return this.makeRequest('GET', reportUri);
    }

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

    private makeRequest(method: Method, paymentUri: string, requestBody?: Object): Promise<any> {
        return this.executeRequest(method, paymentUri, this.createNameValuePairs(), requestBody)
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
