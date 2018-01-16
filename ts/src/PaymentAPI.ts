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
import {DebitResponse} from './model/response/DebitResponse';
import {Response} from './model/response/Response';

/**
 * Payment Highway Payment API Service.
 */
export class PaymentAPI {

    private static API_VERSION: string = '20171127';

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
     * Payment Highway Init Transaction
     *
     * @returns {PromiseLike<TransactionResponse>}
     */
    public initTransaction(): PromiseLike<TransactionResponse> {
        const paymentUri = '/transaction';
        return this.makeRequest('POST', paymentUri);
    }

    /**
     * Payment Highway Debit Transaction
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<DebitResponse>}
     */
    public debitTransaction(transactionId: string, request: TransactionRequest): PromiseLike<DebitResponse> {
        const debitUri = '/transaction/' + transactionId + '/debit';
        return this.makeRequest('POST', debitUri, request);
    }

    /**
     * Payment Highway Revert Transaction with amount
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<Response>}
     */
    public revertTransaction(transactionId: string, request: RevertTransactionRequest): PromiseLike<Response> {
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
     * @returns {PromiseLike<TransactionResultResponse>}
     */
    public commitTransaction(transactionId: string, request: CommitTransactionRequest): PromiseLike<TransactionResultResponse> {
        const commitUri = '/transaction/' + transactionId + '/commit';
        return this.makeRequest('POST', commitUri, request);
    }

    /**
     * Payment Highway Transaction Status Request
     *
     * @param transactionId
     * @returns {PromiseLike<TransactionStatusResponse>}
     */
    public transactionStatus(transactionId: string): PromiseLike<TransactionStatusResponse> {
        const statusUri = '/transaction/' + transactionId;
        return this.makeRequest('GET', statusUri);
    }

    /**
     * Payment Highway Order Status Request
     *
     * @param orderId   The ID of the order whose transactions should be searched for
     * @returns {PromiseLike<OrderSearchResponse>}
     */
    public searchOrders(orderId: string): PromiseLike<OrderSearchResponse> {
        const searchUri = '/transactions/?order=' + orderId;
        return this.makeRequest('GET', searchUri);
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
     * Payment Highway Transaction Result Request
     * Used to find out whether or not an uncommitted transaction succeeded, without actually committing (capturing) it.
     *
     * @param transactionId
     * @returns {PromiseLike<TransactionResultResponse>}
     */
    public transactionResult(transactionId: string): PromiseLike<TransactionResultResponse> {
        const transactionResultUrl = '/transaction/' + transactionId + '/result';
        return this.makeRequest('GET', transactionResultUrl);
    }

    /**
     * Payment Highway Daily Report Request
     *
     * @param date
     * @returns {PromiseLike<ReportResponse>}
     */
    public fetchDailyReport(date: string): PromiseLike<ReportResponse> {
        const reportUri = '/report/batch/' + date;
        return this.makeRequest('GET', reportUri);
    }

    /**
     * Payment Highway Reconciliation Report Request
     *
     * @param date      The date to fetch the reconciliation report for.
     * @param useDateProcessed Use the acquirer processed date instead of report received date. Might cause changes to the past
     * @returns {PromiseLike<ReconciliationReportResponse>}
     */
    public fetchReconciliationReport(date: string, useDateProcessed?: boolean): PromiseLike<ReconciliationReportResponse> {
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
     * @returns {PromiseLike<TransactionResponse>}
     */
    private makeRequest(method: Method, paymentUri: string, requestBody?: Object): PromiseLike<any> {
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
