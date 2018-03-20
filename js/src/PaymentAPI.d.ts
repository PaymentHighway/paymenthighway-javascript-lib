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
import { DebitResponse } from './model/response/DebitResponse';
import { Response } from './model/response/Response';
import { UserProfileResponse } from './model/response/UserProfileResponse';
import { MasterpassTransactionRequest } from './model/request/MasterpassTransactionRequest';
import { RevertSiirtoTransactionRequest } from './model/request/RevertSiirtoTransactionRequest';
import { SiirtoTransactionResultResponse } from './model/response/SiirtoTransactionResultResponse';
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
     * @returns {PromiseLike<DebitResponse>}
     */
    debitTransaction(transactionId: string, request: TransactionRequest): PromiseLike<DebitResponse>;
    /**
     * Payment Highway Debit Masterpass Transaction
     *
     * @param {string} transactionId
     * @param {MasterpassTransactionRequest} request
     * @returns {PromiseLike<DebitResponse>}
     */
    debitMasterpassTransaction(transactionId: string, request: MasterpassTransactionRequest): PromiseLike<DebitResponse>;
    /**
     * Payment Highway Revert Transaction with amount
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<Response>}
     */
    revertTransaction(transactionId: string, request: RevertTransactionRequest): PromiseLike<Response>;
    /**
     * Payment Highway Revert Siirto Transaction with amount
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<Response>}
     */
    revertSiirtoTransaction(transactionId: string, request: RevertSiirtoTransactionRequest): PromiseLike<Response>;
    /**
     * Payment Highway Transaction Commit Request
     * Used to commit (capture) the transaction.
     * In order to find out the result of the transaction without committing it, use Transaction Result request instead.
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<TransactionResultResponse>}
     */
    commitTransaction(transactionId: string, request: CommitTransactionRequest): PromiseLike<TransactionResultResponse>;
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
     * This api is available only for Masterpass transactions. It is is mainly intended for fetching shipping
     * address before calculating shipping cost.
     *
     * After fetching user profile for the transaction, [Masterpass debit transaction]{@link #debitMasterpassTransaction}
     * can be performed.
     */
    userProfile(transactionId: string): PromiseLike<UserProfileResponse>;
    /**
     * Payment Highway Transaction Result Request
     * Used to find out whether or not an uncommitted transaction succeeded, without actually committing (capturing) it.
     *
     * @param transactionId
     * @returns {PromiseLike<TransactionResultResponse>}
     */
    transactionResult(transactionId: string): PromiseLike<TransactionResultResponse>;
    /**
     * Payment Highway Siirto Transaction Result Request
     * Used to find out whether or not an Siirto transaction succeeded.
     *
     * @param transactionId
     * @returns {PromiseLike<SiirtoTransactionResultResponse>}
     */
    siirtoTransactionResult(transactionId: string): PromiseLike<SiirtoTransactionResultResponse>;
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
