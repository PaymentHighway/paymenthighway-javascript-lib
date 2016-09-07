import PaymentAPI from '../src/PaymentAPI';

var assert = require('assert');
describe('PaymentAPI', function() {
    describe('API exists', function() {
        it('should have instance of PaymentHighwayAPI', function() {
            var api = new PaymentAPI('https://v1-hub-staging.sph-test-solinor.com/',  'testKey',  'testSecret',  'test',  'test_merchantId');
            assert.instanceOf(api, PaymentAPI, 'api is instance of PaymentApi');
        });
    });
});

