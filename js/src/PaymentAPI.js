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
     * Payment Highway Tokenize Request
     *
     * @param tokenizationId
     * @returns {PromiseLike<TokenizationResponse>}
     */
    tokenization(tokenizationId) {
        const tokenUri = '/tokenization/' + tokenizationId;
        return this.makeRequest('GET', tokenUri);
    }
    /**
     * Create name value pairs
     *
     * @return
     */
    createNameValuePairs() {
        return [
            new Pair_1.Pair('sph-api-version', PaymentAPI.API_VERSION),
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
     * @returns {PromiseLike<Response>}
     */
    makeRequest(method, paymentUri, requestBody) {
        return this.executeRequest(method, paymentUri, this.createNameValuePairs(), requestBody)
            .then((body) => body);
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
PaymentAPI.API_VERSION = '20180927';
// Payment API headers
PaymentAPI.USER_AGENT = 'PaymentHighway Javascript Library';
exports.PaymentAPI = PaymentAPI;
//# sourceMappingURL=PaymentAPI.js.map