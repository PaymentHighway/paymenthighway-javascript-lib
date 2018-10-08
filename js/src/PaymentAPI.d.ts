import { TokenizationResponse } from './model/response/TokenizationResponse';
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
     * Payment Highway Tokenize Request
     *
     * @param tokenizationId
     * @returns {PromiseLike<TokenizationResponse>}
     */
    tokenization(tokenizationId: string): PromiseLike<TokenizationResponse>;
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
     * @returns {PromiseLike<Response>}
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
