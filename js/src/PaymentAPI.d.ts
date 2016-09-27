import { TransactionResponse } from './model/response/TransactionResponse';
import { TransactionStatusResponse } from './model/response/TransactionStatusResponse';
import { OrderSearchResponse } from './model/response/OrderSearchResponse';
import { ReportResponse } from './model/response/ReportResponse';
import { ReconciliationReportResponse } from './model/response/ReconciliationReportResponse';
import { TokenizationResponse } from './model/response/TokenizationResponse';
import { TransactionResultResponse } from './model/response/TransactionResultResponse';
import { TransactionRequest } from './model/request/TransactionRequest';
import { RevertTransactionRequest } from './model/request/RevertTransactionRequest';
import { CommitTransactionRequest } from './model/request/CommitTransactionRequest';
/**
 * Payment Highway Payment API Service.
 */
export declare class PaymentAPI {
    private serviceUrl;
    private signatureKeyId;
    private signatureSecret;
    private account;
    private merchant;
    private static API_VERSION;
    static USER_AGENT: string;
    private secureSigner;
    constructor(serviceUrl: string, signatureKeyId: string, signatureSecret: string, account: string, merchant: string);
    /**
     * Payment Highway Init Transaction
     *
     * @returns {Promise<TransactionResponse>}
     */
    initTransaction(): Promise<TransactionResponse>;
    /**
     * Payment Highway Debit Transaction
     *
     * @param transactionId
     * @param request
     * @returns {Promise<TransactionResponse>}
     */
    debitTransaction(transactionId: string, request: TransactionRequest): Promise<TransactionResponse>;
    /**
     * Payment Highway Revert Transaction with amount
     *
     * @param transactionId
     * @param request
     * @returns {Promise<TransactionResponse>}
     */
    revertTransaction(transactionId: string, request: RevertTransactionRequest): Promise<TransactionResponse>;
    /**
     * Payment Highway Transaction Commit Request
     * Used to commit (capture) the transaction.
     * In order to find out the result of the transaction without committing it, use Transaction Result request instead.
     *
     * @param transactionId
     * @param request
     * @returns {Promise<TransactionResponse>}
     */
    commitTransaction(transactionId: string, request: CommitTransactionRequest): Promise<TransactionResponse>;
    /**
     * Payment Highway Transaction Status Request
     *
     * @param transactionId
     * @returns {Promise<TransactionStatusResponse>}
     */
    transactionStatus(transactionId: string): Promise<TransactionStatusResponse>;
    /**
     * Payment Highway Order Status Request
     *
     * @param orderId   The ID of the order whose transactions should be searched for
     * @returns {Promise<OrderSearchResponse>}
     */
    searchOrders(orderId: string): Promise<OrderSearchResponse>;
    /**
     * Payment Highway Tokenize Request
     *
     * @param tokenizationId
     * @returns {Promise<TokenizationResponse>}
     */
    tokenization(tokenizationId: string): Promise<TokenizationResponse>;
    /**
     * Payment Highway Transaction Result Request
     * Used to find out whether or not an uncommitted transaction succeeded, without actually committing (capturing) it.
     *
     * @param transactionId
     * @returns {Promise<TransactionResultResponse>}
     */
    transactionResult(transactionId: string): Promise<TransactionResultResponse>;
    /**
     * Payment Highway Daily Report Request
     *
     * @param date
     * @returns {Promise<ReportResponse>}
     */
    fetchDailyReport(date: string): Promise<ReportResponse>;
    /**
     * Payment Highway Reconciliation Report Request
     *
     * @param date      The date to fetch the reconciliation report for.
     * @param useDateProcessed Use the acquirer processed date instead of report received date. Might cause changes to the past
     * @returns {Promise<ReconciliationReportResponse>}
     */
    fetchReconciliationReport(date: string, useDateProcessed?: boolean): Promise<ReconciliationReportResponse>;
    /**
     * Create name value pairs
     *
     * @return
     */
    private createNameValuePairs();
    /**
     *
     * @param method
     * @param paymentUri
     * @param requestBody
     * @returns {Promise<TransactionResponse>}
     */
    private makeRequest(method, paymentUri, requestBody?);
    /**
     *
     * @param method
     * @param path
     * @param nameValuePairs
     * @param requestBody
     * @returns {requestPromise.RequestPromise}
     */
    private executeRequest(method, path, nameValuePairs, requestBody?);
}
