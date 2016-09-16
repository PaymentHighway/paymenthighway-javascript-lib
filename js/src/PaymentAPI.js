"use strict";
const requestPromise = require('request-promise');
const PaymentHighwayUtility_1 = require('./PaymentHighwayUtility');
const SecureSigner_1 = require('./security/SecureSigner');
const Pair_1 = require('./util/Pair');
/**
 * Payment Highway Payment API Service.
 */
class PaymentAPI {
    constructor(serviceUrl, signatureKeyId, signatureSecret, account, merchant, apiVersion = '20160630') {
        this.serviceUrl = serviceUrl;
        this.signatureKeyId = signatureKeyId;
        this.signatureSecret = signatureSecret;
        this.account = account;
        this.merchant = merchant;
        this.apiVersion = apiVersion;
    }
    /**
     * Payment Highway Init Transaction
     *
     * @returns {Promise<TransactionResponse>}
     */
    initTransaction() {
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
    debitTransaction(transactionId, request) {
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
    revertTransaction(transactionId, request) {
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
    commitTransaction(transactionId, request) {
        const commitUri = '/transaction/' + transactionId + '/commit';
        return this.makeRequest('POST', commitUri, request);
    }
    /**
     * Payment Highway Transaction Status Request
     *
     * @param transactionId
     * @returns {Promise<TransactionStatusResponse>}
     */
    transactionStatus(transactionId) {
        const statusUri = '/transaction/' + transactionId;
        return this.makeRequest('GET', statusUri);
    }
    /**
     * Payment Highway Order Status Request
     *
     * @param orderId   The ID of the order whose transactions should be searched for
     * @returns {Promise<OrderSearchResponse>}
     */
    searchOrders(orderId) {
        const searchUri = '/transactions/?order=' + orderId;
        return this.makeRequest('GET', searchUri);
    }
    /**
     * Payment Highway Tokenize Request
     *
     * @param tokenizationId
     * @returns {Promise<TokenizationResponse>}
     */
    tokenization(tokenizationId) {
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
    transactionResult(transactionId) {
        const transactionResultUrl = '/transaction/' + transactionId + '/result';
        return this.makeRequest('GET', transactionResultUrl);
    }
    /**
     * Payment Highway Daily Report Request
     *
     * @param date
     * @returns {Promise<ReportResponse>}
     */
    fetchDailyReport(date) {
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
    fetchReconciliationReport(date, useDateProcessed = false) {
        const reportUri = '/report/reconciliation/' + date + '?use-date-processed=' + useDateProcessed;
        return this.makeRequest('GET', reportUri);
    }
    /**
     * Create name value pairs
     *
     * @return
     */
    createNameValuePairs() {
        return [
            new Pair_1.Pair('sph-api-version', this.apiVersion),
            new Pair_1.Pair('sph-account', this.account),
            new Pair_1.Pair('sph-merchant', this.merchant),
            new Pair_1.Pair('sph-timestamp', PaymentHighwayUtility_1.PaymentHighwayUtility.getUtcTimestamp()),
            new Pair_1.Pair('sph-request-id', PaymentHighwayUtility_1.PaymentHighwayUtility.createRequestId())
        ];
    }
    /**
     *
     * @param method
     * @param paymentUri
     * @param requestBody
     * @returns {Promise<TransactionResponse>}
     */
    makeRequest(method, paymentUri, requestBody) {
        return this.executeRequest(method, paymentUri, this.createNameValuePairs(), requestBody)
            .then((body) => {
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
    executeRequest(method, path, nameValuePairs, requestBody) {
        const ss = new SecureSigner_1.SecureSigner(this.signatureKeyId, this.signatureSecret);
        let bodyString = '';
        if (requestBody) {
            bodyString = JSON.stringify(requestBody);
        }
        const signature = ss.createSignature(method, path, nameValuePairs, bodyString);
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
/* Payment API headers */
PaymentAPI.USER_AGENT = 'PaymentHighway Javascript Library';
exports.PaymentAPI = PaymentAPI;
//# sourceMappingURL=PaymentAPI.js.map