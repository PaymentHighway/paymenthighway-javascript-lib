import {assert} from 'chai';
import {SecureSigner} from '../src/security/SecureSigner';
import {Pair} from '../src/util/Pair';
import {PaymentHighwayUtility} from '../src/PaymentHighwayUtility';

describe('Secure signer', () => {
    it('Test create signature', () => {
        const secretKeyId = 'account001-key001';
        const secretKey = 'account001-shared-secret001';
        const ss = new SecureSigner(secretKeyId, secretKey);
        const nameValuePairs = [
            new Pair('sph-api-version', '20151028'),
            new Pair('sph-account', 'sampleAccount001'),
            new Pair('sph-amount', '990'),
            new Pair('sph-cancel-url', 'https://merchant.example.com/payment/cancel'),
            new Pair('sph-currency', 'EUR'),
            new Pair('sph-failure-url', 'https://merchant.example.com/payment/failure'),
            new Pair('sph-merchant', 'sampleMerchant001'),
            new Pair('sph-order', '1000123A'),
            new Pair('sph-request-id', 'f47ac10b-58cc-4372-a567-0e02b2c3d479'),
            new Pair('sph-success-url', 'https://merchant.example.com/payment/success'),
            new Pair('sph-timestamp', PaymentHighwayUtility.getUtcTimestamp()),
            new Pair('language', 'EN'),
            new Pair('description', 'this is a description')
        ];
        const formPaymentMethod = 'POST';
        const formPaymentUri = '/form/view/payment';
        const formPaymentBody = '';
        const sig = ss.createSignature(formPaymentMethod, formPaymentUri, nameValuePairs, formPaymentBody);
        assert(sig.indexOf(secretKeyId) !== -1, 'signature does not contain secret key id');
    });
});
