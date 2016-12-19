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
     * @returns {PromiseLike<TransactionResponse>}
     */
    initTransaction(): PromiseLike<TransactionResponse>;
    /**
     * Payment Highway Debit Transaction
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<TransactionResponse>}
     */
    debitTransaction(transactionId: string, request: TransactionRequest): PromiseLike<TransactionResponse>;
    /**
     * Payment Highway Revert Transaction with amount
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<TransactionResponse>}
     */
    revertTransaction(transactionId: string, request: RevertTransactionRequest): PromiseLike<TransactionResponse>;
    /**
     * Payment Highway Transaction Commit Request
     * Used to commit (capture) the transaction.
     * In order to find out the result of the transaction without committing it, use Transaction Result request instead.
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<TransactionResponse>}
     */
    commitTransaction(transactionId: string, request: CommitTransactionRequest): PromiseLike<TransactionResponse>;
    /**
     * Payment Highway Transaction Status Request
     *
     * @param transactionId
     * @returns {PromiseLike<TransactionStatusResponse>}
     */
    transactionStatus(transactionId: string): PromiseLike<TransactionStatusResponse>;
    /**
     * Payment Highway Order Status Request
     *
     * @param orderId   The ID of the order whose transactions should be searched for
     * @returns {PromiseLike<OrderSearchResponse>}
     */
    searchOrders(orderId: string): PromiseLike<OrderSearchResponse>;
    /**
     * Payment Highway Tokenize Request
     *
     * @param tokenizationId
     * @returns {PromiseLike<TokenizationResponse>}
     */
    tokenization(tokenizationId: string): PromiseLike<TokenizationResponse>;
    /**
     * Payment Highway Transaction Result Request
     * Used to find out whether or not an uncommitted transaction succeeded, without actually committing (capturing) it.
     *
     * @param transactionId
     * @returns {PromiseLike<TransactionResultResponse>}
     */
    transactionResult(transactionId: string): PromiseLike<TransactionResultResponse>;
    /**
     * Payment Highway Daily Report Request
     *
     * @param date
     * @returns {PromiseLike<ReportResponse>}
     */
    fetchDailyReport(date: string): PromiseLike<ReportResponse>;
    /**
     * Payment Highway Reconciliation Report Request
     *
     * @param date      The date to fetch the reconciliation report for.
     * @param useDateProcessed Use the acquirer processed date instead of report received date. Might cause changes to the past
     * @returns {PromiseLike<ReconciliationReportResponse>}
     */
    fetchReconciliationReport(date: string, useDateProcessed?: boolean): PromiseLike<ReconciliationReportResponse>;
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
     * @returns {PromiseLike<TransactionResponse>}
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
