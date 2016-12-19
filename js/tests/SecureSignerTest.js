"use strict";
const chai_1 = require("chai");
const SecureSigner_1 = require("../src/security/SecureSigner");
const Pair_1 = require("../src/util/Pair");
const PaymentHighwayUtility_1 = require("../src/PaymentHighwayUtility");
describe('Secure signer', () => {
    it('Test create signature', () => {
        const secretKeyId = 'account001-key001';
        const secretKey = 'account001-shared-secret001';
        const ss = new SecureSigner_1.SecureSigner(secretKeyId, secretKey);
        const nameValuePairs = [
            new Pair_1.Pair('sph-api-version', '20151028'),
            new Pair_1.Pair('sph-account', 'sampleAccount001'),
            new Pair_1.Pair('sph-amount', '990'),
            new Pair_1.Pair('sph-cancel-url', 'https://merchant.example.com/payment/cancel'),
            new Pair_1.Pair('sph-currency', 'EUR'),
            new Pair_1.Pair('sph-failure-url', 'https://merchant.example.com/payment/failure'),
            new Pair_1.Pair('sph-merchant', 'sampleMerchant001'),
            new Pair_1.Pair('sph-order', '1000123A'),
            new Pair_1.Pair('sph-request-id', 'f47ac10b-58cc-4372-a567-0e02b2c3d479'),
            new Pair_1.Pair('sph-success-url', 'https://merchant.example.com/payment/success'),
            new Pair_1.Pair('sph-timestamp', PaymentHighwayUtility_1.PaymentHighwayUtility.getUtcTimestamp()),
            new Pair_1.Pair('language', 'EN'),
            new Pair_1.Pair('description', 'this is a description')
        ];
        const formPaymentMethod = 'POST';
        const formPaymentUri = '/form/view/payment';
        const formPaymentBody = '';
        const sig = ss.createSignature(formPaymentMethod, formPaymentUri, nameValuePairs, formPaymentBody);
        chai_1.assert(sig.indexOf(secretKeyId) !== -1, 'signature does not contain secret key id');
    });
});
//# sourceMappingURL=SecureSignerTest.js.map