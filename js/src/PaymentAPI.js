"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestPromise = require("request-promise");
const PaymentHighwayUtility_1 = require("./PaymentHighwayUtility");
const SecureSigner_1 = require("./security/SecureSigner");
const Pair_1 = require("./util/Pair");
/**
 * Payment Highway Payment API Service.
 */
class PaymentAPI {
    constructor(serviceUrl, signatureKeyId, signatureSecret, account, merchant) {
        this.serviceUrl = serviceUrl;
        this.signatureKeyId = signatureKeyId;
        this.signatureSecret = signatureSecret;
        this.account = account;
        this.merchant = merchant;
        this.secureSigner = new SecureSigner_1.SecureSigner(this.signatureKeyId, this.signatureSecret);
    }
    /**
     * Init Transaction
     *
     * @returns {PromiseLike<TransactionResponse>}
     */
    initTransaction() {
        const paymentUri = '/transaction';
        return this.makeRequest('POST', paymentUri);
    }
    /**
     * Debit Transaction
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<DebitResponse>}
     */
    debitTransaction(transactionId, request) {
        const debitUri = '/transaction/' + transactionId + '/debit';
        return this.makeRequest('POST', debitUri, request);
    }
    /**
     * Charge Customer Initiated Transaction
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<ChargeCitResponse>}
     */
    chargeCustomerInitiatedTransaction(transactionId, request) {
        const chargeCitUri = '/transaction/' + transactionId + '/card/charge/customer_initiated';
        return this.makeRequest('POST', chargeCitUri, request);
    }
    /**
     * Charge Merchant Initiated Transaction
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<DebitResponse>}
     */
    chargeMerchantInitiatedTransaction(transactionId, request) {
        const chargeMitUri = '/transaction/' + transactionId + '/card/charge/merchant_initiated';
        return this.makeRequest('POST', chargeMitUri, request);
    }
    /**
     * Debit Masterpass Transaction
     *
     * @param {string} transactionId
     * @param {MasterpassTransactionRequest} request
     * @returns {PromiseLike<DebitResponse>}
     */
    debitMasterpassTransaction(transactionId, request) {
        const debitUri = '/transaction/' + transactionId + '/debit_masterpass';
        return this.makeRequest('POST', debitUri, request);
    }
    /**
     * Debit Apple Pay Transaction
     *
     * @param {string} transactionId
     * @param {ApplePayTransactionRequest} request
     * @returns {PromiseLike<DebitResponse>}
     */
    debitApplePayTransaction(transactionId, request) {
        const debitUri = '/transaction/' + transactionId + '/debit_applepay';
        return this.makeRequest('POST', debitUri, request);
    }
    /**
     * Revert Transaction
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<Response>}
     */
    revertTransaction(transactionId, request) {
        const revertUri = '/transaction/' + transactionId + '/revert';
        return this.makeRequest('POST', revertUri, request);
    }
    /**
     * Revert Siirto Transaction
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<Response>}
     */
    revertSiirtoTransaction(transactionId, request) {
        const revertUri = '/transaction/' + transactionId + '/siirto/revert';
        return this.makeRequest('POST', revertUri, request);
    }
    /**
     * Revert Pivo Transaction
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<Response>}
     */
    revertPivoTransaction(transactionId, request) {
        const revertUri = '/transaction/' + transactionId + '/pivo/revert';
        return this.makeRequest('POST', revertUri, request);
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
    commitTransaction(transactionId, request) {
        const commitUri = '/transaction/' + transactionId + '/commit';
        return this.makeRequest('POST', commitUri, request);
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
    commitAfterPayTransaction(transactionId, request) {
        const uri = '/transaction/' + transactionId + '/afterpay/commit';
        return this.makeRequest('POST', uri, request);
    }
    /**
     * AfterPay Transaction Result Request
     * Used to find out whether or not an uncommitted transaction succeeded, without actually committing (capturing) it.
     *
     * @param transactionId
     * @returns {PromiseLike<Response>}
     */
    afterPayTransactionResult(transactionId) {
        const uri = '/transaction/' + transactionId + '/afterpay/result';
        return this.makeRequest('GET', uri);
    }
    /**
     * Revert AfterPay Transaction
     *
     * @param transactionId
     * @param request
     * @returns {PromiseLike<Response>}
     */
    revertAfterPayTransaction(transactionId, request) {
        const uri = '/transaction/' + transactionId + '/afterpay/revert';
        return this.makeRequest('POST', uri, request);
    }
    /**
     * AfterPay Transaction Status Request
     *
     * @param transactionId
     * @returns {PromiseLike<TransactionStatusResponse>}
     */
    afterPayTransactionStatus(transactionId) {
        const statusUri = '/transaction/' + transactionId + '/afterpay';
        return this.makeRequest('GET', statusUri);
    }
    /**
     * Transaction Status Request
     *
     * @param transactionId
     * @returns {PromiseLike<TransactionStatusResponse>}
     */
    transactionStatus(transactionId) {
        const statusUri = '/transaction/' + transactionId;
        return this.makeRequest('GET', statusUri);
    }
    /**
     * Pivo Transaction Status Request
     *
     * @param transactionId
     * @returns {PromiseLike<PivoTransactionStatusResponse>}
     */
    pivoTransactionStatus(transactionId) {
        const statusUri = '/transaction/pivo/' + transactionId;
        return this.makeRequest('GET', statusUri);
    }
    /**
     * Siirto Transaction Status Request
     *
     * @param transactionId
     * @returns {PromiseLike<SiirtoTransactionStatusResponse>}
     */
    siirtoTransactionStatus(transactionId) {
        const statusUri = '/transaction/siirto/' + transactionId;
        return this.makeRequest('GET', statusUri);
    }
    /**
     * Order Status Request
     *
     * @param orderId   The ID of the order whose transactions should be searched for
     * @returns {PromiseLike<OrderSearchResponse>}
     */
    searchOrders(orderId) {
        const searchUri = '/transactions/?order=' + orderId;
        return this.makeRequest('GET', searchUri);
    }
    /**
     * Tokenize Request
     *
     * @param tokenizationId
     * @returns {PromiseLike<TokenizationResponse>}
     */
    tokenization(tokenizationId) {
        const tokenUri = '/tokenization/' + tokenizationId;
        return this.makeRequest('GET', tokenUri);
    }
    /**
     * This api is available only for Masterpass transactions. It is is mainly intended for fetching shipping
     * address before calculating shipping cost.
     *
     * After fetching user profile for the transaction, [Masterpass debit transaction]{@link #debitMasterpassTransaction}
     * can be performed.
     */
    userProfile(transactionId) {
        const userProfileUrl = '/transaction/' + transactionId + '/user_profile';
        return this.makeRequest('GET', userProfileUrl);
    }
    /**
     * Transaction Result Request
     * Used to find out whether or not an uncommitted transaction succeeded, without actually committing (capturing) it.
     *
     * @param transactionId
     * @returns {PromiseLike<TransactionResultResponse>}
     */
    transactionResult(transactionId) {
        const transactionResultUrl = '/transaction/' + transactionId + '/result';
        return this.makeRequest('GET', transactionResultUrl);
    }
    /**
     * Siirto Transaction Result Request
     * Used to find out whether or not an Siirto transaction succeeded.
     *
     * @param transactionId
     * @returns {PromiseLike<SiirtoTransactionResultResponse>}
     */
    siirtoTransactionResult(transactionId) {
        const transactionResultUrl = '/transaction/' + transactionId + '/siirto/result';
        return this.makeRequest('GET', transactionResultUrl);
    }
    /**
     * Pivo Transaction Result Request
     * Used to find out whether or not an Pivo transaction succeeded.
     *
     * @param transactionId
     * @returns {PromiseLike<PivoTransactionResultResponse>}
     */
    pivoTransactionResult(transactionId) {
        const transactionResultUrl = '/transaction/' + transactionId + '/pivo/result';
        return this.makeRequest('GET', transactionResultUrl);
    }
    /**
     * Daily Report Request
     *
     * @param date
     * @returns {PromiseLike<ReportResponse>}
     */
    fetchDailyReport(date) {
        const reportUri = '/report/batch/' + date;
        return this.makeRequest('GET', reportUri);
    }
    /**
     * Reconciliation Report Request
     *
     * @param date      The date to fetch the reconciliation report for.
     * @param useDateProcessed Use the acquirer processed date instead of report received date. Might cause changes to the past
     * @returns {PromiseLike<ReconciliationReportResponse>}
     */
    fetchReconciliationReport(date, useDateProcessed) {
        if (!useDateProcessed) {
            useDateProcessed = false;
        }
        const reportUri = '/report/reconciliation/' + date + '?use-date-processed=' + useDateProcessed;
        return this.makeRequest('GET', reportUri);
    }
    /**
     * Init MobilePay session for app payment flow.
     *
     * @param {MobilePayInitRequest} request
     * @returns {PromiseLike<MobilePayInitResponse>}
     */
    initMobilePaySession(request) {
        return this.makeRequest('POST', '/app/mobilepay', request);
    }
    mobilePaySessionStatus(sessionToken) {
        return this.makeRequest('GET', '/app/mobilepay/' + sessionToken);
    }
    /**
     * Create name value pairs
     *
     * @return
     */
    createNameValuePairs(requestId) {
        return [
            new Pair_1.Pair('sph-api-version', PaymentAPI.API_VERSION),
            new Pair_1.Pair('sph-account', this.account),
            new Pair_1.Pair('sph-merchant', this.merchant),
            new Pair_1.Pair('sph-timestamp', PaymentHighwayUtility_1.PaymentHighwayUtility.getUtcTimestamp()),
            new Pair_1.Pair('sph-request-id', requestId)
        ];
    }
    /**
     *
     * @param method
     * @param paymentUri
     * @param request
     * @returns {PromiseLike<TransactionResponse>}
     */
    makeRequest(method, paymentUri, request) {
        const requestId = request && request.requestId || PaymentHighwayUtility_1.PaymentHighwayUtility.createRequestId();
        const requestBody = request && this.getRequestBody(request);
        return this.executeRequest(method, paymentUri, this.createNameValuePairs(requestId), requestBody)
            .then((body) => {
            return body;
        });
    }
    /**
     * Gets request fields to be included in the request body
     * @param request
     * @returns {Object} request with fields removed that should not be included in the request body
     */
    getRequestBody(request) {
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
     * @returns {requestPromise.RequestPromise}
     */
    executeRequest(method, path, nameValuePairs, requestBody) {
        let bodyString = '';
        if (requestBody) {
            bodyString = JSON.stringify(requestBody);
        }
        const signature = this.secureSigner.createSignature(method, path, nameValuePairs, bodyString);
        nameValuePairs.push(new Pair_1.Pair('signature', signature));
        let headers = {
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
exports.PaymentAPI = PaymentAPI;
PaymentAPI.API_VERSION = '20191204';
// Payment API headers
PaymentAPI.USER_AGENT = 'PaymentHighway Javascript Library';
//# sourceMappingURL=PaymentAPI.js.map