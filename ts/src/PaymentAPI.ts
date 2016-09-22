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
import {TransactionResultResponse} from './model/response/TransactionResultResponse';
import {TransactionRequest} from './model/request/TransactionRequest';
import {RevertTransactionRequest} from './model/request/RevertTransactionRequest';
import {CommitTransactionRequest} from './model/request/CommitTransactionRequest';

/**
 * Payment Highway Payment API Service.
 */
export class PaymentAPI {

    private static API_VERSION: string = '20160630';

    /* Payment API headers */
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
     * Payment Highway Init Transaction
     *
     * @returns {Promise<TransactionResponse>}
     */
    public initTransaction(): Promise<TransactionResponse> {
        const paymentUri = '/transaction';
        return this.makeRequest('POST', paymentUri);
    }

    /**
     * Payment Highway Debit Transaction
     *
     * @param transactionId
     * @param request
     * @returns {Promise<TransactionResponse>}
     */
    public debitTransaction(transactionId: string, request: TransactionRequest): Promise<TransactionResponse> {
        const debitUri = '/transaction/' + transactionId + '/debit';
        return this.makeRequest('POST', debitUri, request);
    }

    /**
     * Payment Highway Revert Transaction with amount
     *
     * @param transactionId
     * @param request
     * @returns {Promise<TransactionResponse>}
     */
    public revertTransaction(transactionId: string, request: RevertTransactionRequest): Promise<TransactionResponse> {
        const revertUri = '/transaction/' + transactionId + '/revert';
        return this.makeRequest('POST', revertUri, request);
    }

    /**
     * Payment Highway Transaction Commit Request
     * Used to commit (capture) the transaction.
     * In order to find out the result of the transaction without committing it, use Transaction Result request instead.
     *
     * @param transactionId
     * @param request
     * @returns {Promise<TransactionResponse>}
     */
    public commitTransaction(transactionId: string, request: CommitTransactionRequest): Promise<TransactionResponse> {
        const commitUri = '/transaction/' + transactionId + '/commit';
        return this.makeRequest('POST', commitUri, request);
    }

    /**
     * Payment Highway Transaction Status Request
     *
     * @param transactionId
     * @returns {Promise<TransactionStatusResponse>}
     */
    public transactionStatus(transactionId: string): Promise<TransactionStatusResponse> {
        const statusUri = '/transaction/' + transactionId;
        return this.makeRequest('GET', statusUri);
    }

    /**
     * Payment Highway Order Status Request
     *
     * @param orderId   The ID of the order whose transactions should be searched for
     * @returns {Promise<OrderSearchResponse>}
     */
    public searchOrders(orderId: string): Promise<OrderSearchResponse> {
        const searchUri = '/transactions/?order=' + orderId;
        return this.makeRequest('GET', searchUri);
    }

    /**
     * Payment Highway Tokenize Request
     *
     * @param tokenizationId
     * @returns {Promise<TokenizationResponse>}
     */
    public tokenization(tokenizationId: string): Promise<TokenizationResponse> {
        const tokenUri = '/tokenization/' + tokenizationId;
        return this.makeRequest('GET', tokenUri);
    }

    /**
     * Payment Highway Transaction Result Request
     * Used to find out whether or not an uncommitted transaction succeeded, without actually committing (capturing) it.
     *
     * @param transactionId
     * @returns {Promise<TransactionResultResponse>}
     */
    public transactionResult(transactionId: string): Promise<TransactionResultResponse> {
        const transactionResultUrl = '/transaction/' + transactionId + '/result';
        return this.makeRequest('GET', transactionResultUrl);
    }

    /**
     * Payment Highway Daily Report Request
     *
     * @param date
     * @returns {Promise<ReportResponse>}
     */
    public fetchDailyReport(date: string): Promise<ReportResponse> {
        const reportUri = '/report/batch/' + date;
        return this.makeRequest('GET', reportUri);
    }

    /**
     * Payment Highway Reconciliation Report Request
     *
     * @param date      The date to fetch the reconciliation report for. Must be today - 1 day or earlier.
     * @param useDateProcessed
     * @returns {Promise<ReconciliationReportResponse>}
     */
    public fetchReconciliationReport(date: string, useDateProcessed?: boolean): Promise<ReconciliationReportResponse> {
        if (!useDateProcessed) {
            useDateProcessed = false;
        }
        const reportUri = '/report/reconciliation/' + date + '?use-date-processed=' + useDateProcessed;
        return this.makeRequest('GET', reportUri);
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
     * @returns {Promise<TransactionResponse>}
     */
    private makeRequest(method: Method, paymentUri: string, requestBody?: Object): Promise<any> {
        return this.executeRequest(method, paymentUri, this.createNameValuePairs(), requestBody)
            .then((body: TransactionResponse) => {
                return body;
            });
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
