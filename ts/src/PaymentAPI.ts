import {PaymentHighwayUtility} from './PaymentHighwayUtility';
import {SecureSigner} from './security/SecureSigner';
import {Pair} from './util/Pair';
import got, {CancelableRequest, Response as GotResponse} from 'got';
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
import {ApplePayTransactionRequest} from './model/request/ApplePayTransactionRequest';
import {MobilePayInitRequest} from './model/request/MobilePayInitRequest';
import {MobilePayInitResponse} from './model/response/MobilePayInitResponse';
import {MobilePayStatusResponse} from './model/response/MobilePayStatusResponse';
import {RevertPivoTransactionRequest} from './model/request/RevertPivoTransactionRequest';
import {PivoTransactionResultResponse} from './model/response/PivoTransactionResultResponse';
import {PivoTransactionStatusResponse} from './model/response/PivoTransactionStatusResponse';
import {AfterPayCommitTransactionRequest} from './model/request/AfterPayCommitTransactionRequest';
import {AfterPayRevertTransactionRequest} from './model/request/AfterPayRevertTransactionRequest';
import {ChargeCitRequest} from './model/request/ChargeCitRequest';
import {ChargeMitRequest} from './model/request/ChargeMitRequest';
import {ChargeCitResponse} from './model/response/ChargeCitResponse';
import {Request} from './model/request/PhRequest';
import {PivoInitRequest} from './model/request/PivoInitRequest';
import {PivoInitResponse} from './model/response/PivoInitResponse';
import {FormSessionStatusResponse} from './model/response/FormSessionStatusResponse';
import {Header} from './util/Header';

/**
 * Payment Highway Payment API Service.
 */
export class PaymentAPI {

    private static API_VERSION: string = '20200401';

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
     * Init Transaction
     *
     * @returns {PromiseLike<TransactionResponse>}
     */
    public initTransaction(): PromiseLike<TransactionResponse> {
        const paymentUri = '/transaction';
        return this.makeRequest<TransactionResponse>('POST', paymentUri);
    }

    /**
     * Debit Transaction
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<DebitResponse>}
     */
    public debitTransaction(transactionId: string, request: TransactionRequest): PromiseLike<DebitResponse> {
        const debitUri = '/transaction/' + transactionId + '/debit';
        return this.makeRequest<DebitResponse>('POST', debitUri, request);
    }

    /**
     * Charge Customer Initiated Transaction
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<ChargeCitResponse>}
     */
    public chargeCustomerInitiatedTransaction(transactionId: string, request: ChargeCitRequest): PromiseLike<ChargeCitResponse> {
        const chargeCitUri = '/transaction/' + transactionId + '/card/charge/customer_initiated';
        return this.makeRequest<ChargeCitResponse>('POST', chargeCitUri, request);
    }

    /**
     * Charge Merchant Initiated Transaction
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<DebitResponse>}
     */
    public chargeMerchantInitiatedTransaction(transactionId: string, request: ChargeMitRequest): PromiseLike<DebitResponse> {
        const chargeMitUri = '/transaction/' + transactionId + '/card/charge/merchant_initiated';
        return this.makeRequest<DebitResponse>('POST', chargeMitUri, request);
    }

    /**
     * Debit Apple Pay Transaction
     *
     * @param {string} transactionId
     * @param {ApplePayTransactionRequest} request
     * @returns {PromiseLike<DebitResponse>}
     */
    public debitApplePayTransaction(transactionId: string, request: ApplePayTransactionRequest): PromiseLike<DebitResponse> {
        const debitUri = '/transaction/' + transactionId + '/debit_applepay';
        return this.makeRequest<DebitResponse>('POST', debitUri, request);
    }

    /**
     * Revert Transaction
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<Response>}
     */
    public revertTransaction(transactionId: string, request: RevertTransactionRequest): PromiseLike<Response> {
        const revertUri = '/transaction/' + transactionId + '/revert';
        return this.makeRequest<Response>('POST', revertUri, request);
    }

    /**
     * Revert Pivo Transaction
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<Response>}
     */
    public revertPivoTransaction(transactionId: string, request: RevertPivoTransactionRequest): PromiseLike<Response> {
        const revertUri = '/transaction/' + transactionId + '/pivo/revert';
        return this.makeRequest<Response>('POST', revertUri, request);
    }

    /**
     * Commit Transaction Request
     * Used to commit (capture) the transaction.
     * In order to find out the result of the transaction without committing it, use Transaction Result request instead.
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<TransactionResultResponse>}
     */
    public commitTransaction(transactionId: string, request: CommitTransactionRequest): PromiseLike<TransactionResultResponse> {
        const commitUri = '/transaction/' + transactionId + '/commit';
        return this.makeRequest<TransactionResultResponse>('POST', commitUri, request);
    }

    /**
     * Commit AfterPay Transaction Request
     * Used to commit (capture) the transaction.
     * In order to find out the result of the transaction without committing it, use AfterPay Transaction Result request instead.
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<Response>}
     */
    public commitAfterPayTransaction(transactionId: string, request: AfterPayCommitTransactionRequest): PromiseLike<Response> {
        const uri = '/transaction/' + transactionId + '/afterpay/commit';
        return this.makeRequest<Response>('POST', uri, request);
    }

    /**
     * AfterPay Transaction Result Request
     * Used to find out whether or not an uncommitted transaction succeeded, without actually committing (capturing) it.
     *
     * @param transactionId
     * @returns {PromiseLike<Response>}
     */
    public afterPayTransactionResult(transactionId: string): PromiseLike<Response> {
        const uri = '/transaction/' + transactionId + '/afterpay/result';
        return this.makeRequest<Response>('GET', uri);
    }

    /**
     * Revert AfterPay Transaction
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<Response>}
     */
    public revertAfterPayTransaction(transactionId: string, request: AfterPayRevertTransactionRequest): PromiseLike<Response> {
        const uri = '/transaction/' + transactionId + '/afterpay/revert';
        return this.makeRequest<Response>('POST', uri, request);
    }

    /**
     * AfterPay Transaction Status Request
     *
     * @param transactionId
     * @returns {PromiseLike<TransactionStatusResponse>}
     */
    public afterPayTransactionStatus(transactionId: string): PromiseLike<TransactionStatusResponse> {
        const statusUri = '/transaction/' + transactionId + '/afterpay';
        return this.makeRequest<TransactionStatusResponse>('GET', statusUri);
    }

    /**
     * Transaction Status Request
     *
     * @param transactionId
     * @returns {PromiseLike<TransactionStatusResponse>}
     */
    public transactionStatus(transactionId: string): PromiseLike<TransactionStatusResponse> {
        const statusUri = '/transaction/' + transactionId;
        return this.makeRequest<TransactionStatusResponse>('GET', statusUri);
    }

    /**
     * Form Status Request
     *
     * @param sessionId
     * @returns {PromiseLike<FormSessionStatusResponse>}
     */
    public formSessionStatus(sessionId: string): PromiseLike<FormSessionStatusResponse> {
        const statusUri = '/form/' + sessionId + '/status';
        return this.makeRequest<FormSessionStatusResponse>('GET', statusUri);
    }

    /**
     * Pivo Transaction Status Request
     *
     * @param transactionId
     * @returns {PromiseLike<PivoTransactionStatusResponse>}
     */
    public pivoTransactionStatus(transactionId: string): PromiseLike<PivoTransactionStatusResponse> {
        const statusUri = '/transaction/pivo/' + transactionId;
        return this.makeRequest<PivoTransactionStatusResponse>('GET', statusUri);
    }

    /**
     * Order Status Request
     *
     * @param orderId   The ID of the order whose transactions should be searched for
     * @returns {PromiseLike<OrderSearchResponse>}
     */
    public searchOrders(orderId: string): PromiseLike<OrderSearchResponse> {
        const searchUri = '/transactions/?order=' + orderId;
        return this.makeRequest<OrderSearchResponse>('GET', searchUri);
    }

    /**
     * Tokenize Request
     *
     * @param tokenizationId
     * @returns {PromiseLike<TokenizationResponse>}
     */
    public tokenization(tokenizationId: string): PromiseLike<TokenizationResponse> {
        const tokenUri = '/tokenization/' + tokenizationId;
        return this.makeRequest<TokenizationResponse>('GET', tokenUri);
    }

    /**
     * Transaction Result Request
     * Used to find out whether or not an uncommitted transaction succeeded, without actually committing (capturing) it.
     *
     * @param transactionId
     * @returns {PromiseLike<TransactionResultResponse>}
     */
    public transactionResult(transactionId: string): PromiseLike<TransactionResultResponse> {
        const transactionResultUrl = '/transaction/' + transactionId + '/result';
        return this.makeRequest<TransactionResultResponse>('GET', transactionResultUrl);
    }

    /**
     * Pivo Transaction Result Request
     * Used to find out whether or not an Pivo transaction succeeded.
     *
     * @param transactionId
     * @returns {PromiseLike<PivoTransactionResultResponse>}
     */
    public pivoTransactionResult(transactionId: string): PromiseLike<PivoTransactionResultResponse> {
        const transactionResultUrl = '/transaction/' + transactionId + '/pivo/result';
        return this.makeRequest<PivoTransactionResultResponse>('GET', transactionResultUrl);
    }

    /**
     * Daily Report Request
     *
     * @param date
     * @returns {PromiseLike<ReportResponse>}
     */
    public fetchDailyReport(date: string): PromiseLike<ReportResponse> {
        const reportUri = '/report/batch/' + date;
        return this.makeRequest<ReportResponse>('GET', reportUri);
    }

    /**
     * Reconciliation Report Request
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
        return this.makeRequest<ReconciliationReportResponse>('GET', reportUri);
    }

    /**
     * Init MobilePay session for app payment flow.
     *
     * @param {MobilePayInitRequest} request
     * @returns {PromiseLike<MobilePayInitResponse>}
     */
    public initMobilePaySession(request: MobilePayInitRequest): PromiseLike<MobilePayInitResponse> {
        return this.makeRequest<MobilePayInitResponse>('POST', '/app/mobilepay', request);
    }

    public mobilePaySessionStatus(sessionToken: string): PromiseLike<MobilePayStatusResponse> {
        return this.makeRequest<MobilePayStatusResponse>('GET', '/app/mobilepay/' + sessionToken);
    }

    /**
     * Init Pivo transaction for app payment flow.
     *
     * @param {PivoInitRequest} request
     * @returns {PromiseLike<PivoInitResponse>}
     */
    public initPivoTransaction(request: PivoInitRequest): PromiseLike<PivoInitResponse> {
        return this.makeRequest<PivoInitResponse>('POST', '/app/pivo', request);
    }

    /**
     * Create name value pairs
     *
     * @return
     */
    private createNameValuePairs(requestId: string): Pair<string, string>[] {
        return [
            new Pair('sph-api-version', PaymentAPI.API_VERSION),
            new Pair('sph-account', this.account),
            new Pair('sph-merchant', this.merchant),
            new Pair('sph-timestamp', PaymentHighwayUtility.getUtcTimestamp()),
            new Pair('sph-request-id', requestId)
        ];
    }

    /**
     *
     * @param method
     * @param paymentUri
     * @param request
     * @returns {PromiseLike<ReturnType>}
     */
    private makeRequest<ReturnType>(method: Method, paymentUri: string, request?: Request): PromiseLike<ReturnType> {
        const requestId = request && request.requestId || PaymentHighwayUtility.createRequestId();
        const requestBody = request && this.getRequestBody(request);

        return this.executeRequest(method, paymentUri, this.createNameValuePairs(requestId), requestBody)
            .json<ReturnType>();
    }

    /**
     * Gets request fields to be included in the request body
     * @param request
     * @returns {Object} request with fields removed that should not be included in the request body
     */
    private getRequestBody(request: Request): Object {
        let requestBody = Object.assign({}, request);
        delete requestBody.requestId;
        return requestBody;
    }

    /**
     *
     * @param method
     * @param path
     * @param nameValuePairs
     * @param requestBody
     * @returns {CancelableRequest<got.Response<string>>}
     */
    private executeRequest(method: Method, path: string, nameValuePairs: Pair<string, string>[], requestBody?: Object): CancelableRequest<GotResponse<string>> {
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
            method: method,
            headers: headers,
            retry: {
                limit: 0
            },
            timeout: {
                request: 30000
            }
        };

        const url = this.serviceUrl + '/' + path

        if (requestBody) {
            headers['Content-Length'] = Buffer.byteLength(bodyString, 'utf-8');

            options = Object.assign(options, {
                body: bodyString
            });
        }

        return got(url, options);
    }
}
