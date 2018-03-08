import { Pair } from '../util/Pair';
import { Method } from '../util/Method';
import { Dictionary } from 'lodash';
/**
 * Creates a signature for PaymentHighway messages
 */
export declare class SecureSigner {
    private secretKeyId;
    private secretKey;
    private signatureScheme;
    private algorithm;
    constructor(secretKeyId: string, secretKey: string);
    /**
     * Create signature
     *
     * @param method
     * @param uri
     * @param keyValues
     * @param body
     * @return String eg:
     * "SPH1 testKey 51dcbaf5a9323daed24c0cdc5bb5d344f321aa84435b64e5da3d8f6c49370532"
     */
    createSignature(method: Method, uri: string, keyValues: Pair<string, string>[], body: string): string;
    /**
     * Create signature String from the actual parameters
     *
     * @param method
     * @param uri
     * @param keyValues
     * @param body
     * @return String signature
     */
    private sign(method, uri, keyValues, body);
    /**
     * Signature is formed from parameters that start with "sph-" Therefore we
     * remove other parameters from the signature param set.
     *
     * @param keyValues
     * @returns string
     */
    private createKeyValString(keyValues);
    /**
     * Validates the response by checking the provided signature against the calculated one.
     *
     * @param method HTTP METHOD e.g. POST or GET
     * @param uri The request URI
     * @param keyValues The key value pairs of headers or request parameters
     * @param content The body content
     * @return boolean true if signature is found and matches the calculated one
     */
    validateSignature(method: Method, uri: string, keyValues: Dictionary<string>, content: string): boolean;
    /**
     * Validates the response redirection by checking the provided signature against the calculated one.
     * @param keyValues The request parameters from the redirection
     * @return boolean
     */
    validateFormRedirect(keyValues: Dictionary<string>): boolean;
    private parseKeyValues(keyValues);
}
