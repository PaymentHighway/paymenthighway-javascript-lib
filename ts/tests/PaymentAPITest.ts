import {assert} from 'chai';
import {PaymentAPI} from '../src/PaymentAPI';

let api: PaymentAPI;

beforeEach(() => {
    api = new PaymentAPI('https://v1-hub-staging.sph-test-solinor.com/', 'testKey', 'testSecret', 'test', 'test_merchantId');
});

describe('PaymentAPI', () => {
    it('Should have instance of PaymentHighwayAPI', () => {
        assert.instanceOf(api, PaymentAPI, 'Was not instance of PaymentAPI');
    });

    it('Test init transaction', (done) => {
        api.initTransaction((body: any) => {
            assert(body.result.code === 100, 'Transaction init should succeed with code 100');
            assert(body.result.message === 'OK', 'Transaction init should succeed with message "OK"');
            assert.isNotNull(body.id, 'Transaction init should return id');
            done();
        });
    });
});
