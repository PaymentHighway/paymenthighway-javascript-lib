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
import { ApplePayTransactionRequest } from './model/request/ApplePayTransactionRequest';
import { MobilePayInitRequest } from './model/request/MobilePayInitRequest';
import { MobilePayInitResponse } from './model/response/MobilePayInitResponse';
import { MobilePayStatusResponse } from './model/response/MobilePayStatusResponse';
import { RevertSiirtoTransactionRequest } from './model/request/RevertSiirtoTransactionRequest';
import { SiirtoTransactionResultResponse } from './model/response/SiirtoTransactionResultResponse';
import { RevertPivoTransactionRequest } from './model/request/RevertPivoTransactionRequest';
import { PivoTransactionResultResponse } from './model/response/PivoTransactionResultResponse';
import { PivoTransactionStatusResponse } from './model/response/PivoTransactionStatusResponse';
import { SiirtoTransactionStatusResponse } from './model/response/SiirtoTransactionStatusResponse';
import { AfterPayCommitTransactionRequest } from './model/request/AfterPayCommitTransactionRequest';
import { AfterPayRevertTransactionRequest } from './model/request/AfterPayRevertTransactionRequest';
import { ChargeCitRequest } from './model/request/ChargeCitRequest';
import { ChargeMitRequest } from './model/request/ChargeMitRequest';
import { ChargeCitResponse } from './model/response/ChargeCitResponse';
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
     * Init Transaction
     *
     * @returns {PromiseLike<TransactionResponse>}
     */
    initTransaction(): PromiseLike<TransactionResponse>;
    /**
     * Debit Transaction
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<DebitResponse>}
     */
    debitTransaction(transactionId: string, request: TransactionRequest): PromiseLike<DebitResponse>;
    /**
     * Charge Customer Initiated Transaction
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<ChargeCitResponse>}
     */
    chargeCustomerInitiatedTransaction(transactionId: string, request: ChargeCitRequest): PromiseLike<ChargeCitResponse>;
    /**
     * Charge Merchant Initiated Transaction
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<DebitResponse>}
     */
    chargeMerchantInitiatedTransaction(transactionId: string, request: ChargeMitRequest): PromiseLike<DebitResponse>;
    /**
     * Debit Masterpass Transaction
     *
     * @param {string} transactionId
     * @param {MasterpassTransactionRequest} request
     * @returns {PromiseLike<DebitResponse>}
     */
    debitMasterpassTransaction(transactionId: string, request: MasterpassTransactionRequest): PromiseLike<DebitResponse>;
    /**
     * Debit Apple Pay Transaction
     *
     * @param {string} transactionId
     * @param {ApplePayTransactionRequest} request
     * @returns {PromiseLike<DebitResponse>}
     */
    debitApplePayTransaction(transactionId: string, request: ApplePayTransactionRequest): PromiseLike<DebitResponse>;
    /**
     * Revert Transaction
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<Response>}
     */
    revertTransaction(transactionId: string, request: RevertTransactionRequest): PromiseLike<Response>;
    /**
     * Revert Siirto Transaction
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<Response>}
     */
    revertSiirtoTransaction(transactionId: string, request: RevertSiirtoTransactionRequest): PromiseLike<Response>;
    /**
     * Revert Pivo Transaction
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<Response>}
     */
    revertPivoTransaction(transactionId: string, request: RevertPivoTransactionRequest): PromiseLike<Response>;
    /**
     * Commit Transaction Request
     * Used to commit (capture) the transaction.
     * In order to find out the result of the transaction without committing it, use Transaction Result request instead.
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<TransactionResultResponse>}
     */
    commitTransaction(transactionId: string, request: CommitTransactionRequest): PromiseLike<TransactionResultResponse>;
    /**
     * Commit AfterPay Transaction Request
     * Used to commit (capture) the transaction.
     * In order to find out the result of the transaction without committing it, use AfterPay Transaction Result request instead.
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<Response>}
     */
    commitAfterPayTransaction(transactionId: string, request: AfterPayCommitTransactionRequest): PromiseLike<Response>;
    /**
     * AfterPay Transaction Result Request
     * Used to find out whether or not an uncommitted transaction succeeded, without actually committing (capturing) it.
     *
     * @param transactionId
     * @returns {PromiseLike<Response>}
     */
    afterPayTransactionResult(transactionId: string): PromiseLike<Response>;
    /**
     * Revert AfterPay Transaction
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<Response>}
     */
    revertAfterPayTransaction(transactionId: string, request: AfterPayRevertTransactionRequest): PromiseLike<Response>;
    /**
     * AfterPay Transaction Status Request
     *
     * @param transactionId
     * @returns {PromiseLike<TransactionStatusResponse>}
     */
    afterPayTransactionStatus(transactionId: string): PromiseLike<TransactionStatusResponse>;
    /**
     * Transaction Status Request
     *
     * @param transactionId
     * @returns {PromiseLike<TransactionStatusResponse>}
     */
    transactionStatus(transactionId: string): PromiseLike<TransactionStatusResponse>;
    /**
     * Pivo Transaction Status Request
     *
     * @param transactionId
     * @returns {PromiseLike<PivoTransactionStatusResponse>}
     */
    pivoTransactionStatus(transactionId: string): PromiseLike<PivoTransactionStatusResponse>;
    /**
     * Siirto Transaction Status Request
     *
     * @param transactionId
     * @returns {PromiseLike<SiirtoTransactionStatusResponse>}
     */
    siirtoTransactionStatus(transactionId: string): PromiseLike<SiirtoTransactionStatusResponse>;
    /**
     * Order Status Request
     *
     * @param orderId   The ID of the order whose transactions should be searched for
     * @returns {PromiseLike<OrderSearchResponse>}
     */
    searchOrders(orderId: string): PromiseLike<OrderSearchResponse>;
    /**
     * Tokenize Request
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
     * Transaction Result Request
     * Used to find out whether or not an uncommitted transaction succeeded, without actually committing (capturing) it.
     *
     * @param transactionId
     * @returns {PromiseLike<TransactionResultResponse>}
     */
    transactionResult(transactionId: string): PromiseLike<TransactionResultResponse>;
    /**
     * Siirto Transaction Result Request
     * Used to find out whether or not an Siirto transaction succeeded.
     *
     * @param transactionId
     * @returns {PromiseLike<SiirtoTransactionResultResponse>}
     */
    siirtoTransactionResult(transactionId: string): PromiseLike<SiirtoTransactionResultResponse>;
    /**
     * Pivo Transaction Result Request
     * Used to find out whether or not an Pivo transaction succeeded.
     *
     * @param transactionId
     * @returns {PromiseLike<PivoTransactionResultResponse>}
     */
    pivoTransactionResult(transactionId: string): PromiseLike<PivoTransactionResultResponse>;
    /**
     * Daily Report Request
     *
     * @param date
     * @returns {PromiseLike<ReportResponse>}
     */
    fetchDailyReport(date: string): PromiseLike<ReportResponse>;
    /**
     * Reconciliation Report Request
     *
     * @param date      The date to fetch the reconciliation report for.
     * @param useDateProcessed Use the acquirer processed date instead of report received date. Might cause changes to the past
     * @returns {PromiseLike<ReconciliationReportResponse>}
     */
    fetchReconciliationReport(date: string, useDateProcessed?: boolean): PromiseLike<ReconciliationReportResponse>;
    /**
     * Init MobilePay session for app payment flow.
     *
     * @param {MobilePayInitRequest} request
     * @returns {PromiseLike<MobilePayInitResponse>}
     */
    initMobilePaySession(request: MobilePayInitRequest): PromiseLike<MobilePayInitResponse>;
    mobilePaySessionStatus(sessionToken: string): PromiseLike<MobilePayStatusResponse>;
    /**
     * Create name value pairs
     *
     * @return
     */
    private createNameValuePairs;
    /**
     *
     * @param method
     * @param paymentUri
     * @param request
     * @returns {PromiseLike<TransactionResponse>}
     */
    private makeRequest;
    /**
     * Gets request fields to be included in the request body
     * @param request
     * @returns {Object} request with fields removed that should not be included in the request body
     */
    private getRequestBody;
    /**
     *
     * @param method
     * @param path
     * @param nameValuePairs
     * @param requestBody
     * @returns {requestPromise.RequestPromise}
     */
    private executeRequest;
}
