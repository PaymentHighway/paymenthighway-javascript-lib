"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecureSigner = void 0;
const Crypto = require("crypto");
const Pair_1 = require("../util/Pair");
const _ = require("lodash");
/**
 * Creates a signature for PaymentHighway messages
 */
class SecureSigner {
    constructor(secretKeyId, secretKey) {
        this.secretKeyId = secretKeyId;
        this.secretKey = secretKey;
        this.signatureScheme = 'SPH1';
        this.algorithm = 'sha256';
    }
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
    createSignature(method, uri, keyValues, body) {
        return this.signatureScheme + ' ' + this.secretKeyId + ' ' + this.sign(method, uri, keyValues, body);
    }
    /**
     * Create signature String from the actual parameters
     *
     * @param method
     * @param uri
     * @param keyValues
     * @param body
     * @return String signature
     */
    sign(method, uri, keyValues, body) {
        const stringToSign = method + '\n' + uri + '\n' + this.createKeyValString(keyValues) + '\n' + body.trim();
        const hmac = Crypto.createHmac(this.algorithm, this.secretKey).update(stringToSign).digest('hex');
        return hmac.toLowerCase();
    }
    /**
     * Signature is formed from parameters that start with "sph-" Therefore we
     * remove other parameters from the signature param set.
     *
     * @param keyValues
     * @returns string
     */
    createKeyValString(keyValues) {
        return keyValues.filter((x) => {
            return x.first.toLowerCase().startsWith('sph-');
        }).sort((k1, k2) => {
            if (k1.first > k2.first) {
                return 1;
            }
            if (k1.first < k2.first) {
                return -1;
            }
            return 0;
        }).map((x) => {
            return x.first.toLowerCase() + ':' + x.second;
        }).join('\n');
    }
    /**
     * Validates the response by checking the provided signature against the calculated one.
     *
     * @param method HTTP METHOD e.g. POST or GET
     * @param uri The request URI
     * @param keyValues The key value pairs of headers or request parameters
     * @param content The body content
     * @return boolean true if signature is found and matches the calculated one
     */
    validateSignature(method, uri, keyValues, content) {
        const keyValArray = this.parseKeyValues(keyValues);
        const receivedSignature = keyValArray.find((x) => {
            return x.first.toLowerCase() === 'signature';
        }).second;
        if (typeof receivedSignature === 'undefined') {
            return false;
        }
        const createdSignature = this.createSignature(method, uri, keyValArray, content);
        return receivedSignature === createdSignature;
    }
    /**
     * Validates the response redirection by checking the provided signature against the calculated one.
     * @param keyValues The request parameters from the redirection
     * @return boolean
     */
    validateFormRedirect(keyValues) {
        return this.validateSignature('GET', '', keyValues, '');
    }
    parseKeyValues(keyValues) {
        return _.transform(keyValues, (result, value, key) => {
            result.push(new Pair_1.Pair(key, value));
            return result;
        }, []);
    }
}
exports.SecureSigner = SecureSigner;
//# sourceMappingURL=SecureSigner.js.map