import {assert} from 'chai';
import {PaymentAPI} from '../src/PaymentAPI';
import {PaymentHighwayUtility} from '../src/PaymentHighwayUtility';
import {Card} from '../src/model/request/Card';
import {TransactionResponse} from '../src/model/response/TransactionResponse';
import {TransactionRequest} from '../src/model/request/TransactionRequest';

let api: PaymentAPI;
let validCard: any;

beforeEach(() => {
    api = new PaymentAPI('https://v1-hub-staging.sph-test-solinor.com/', 'testKey', 'testSecret', 'test', 'test_merchantId');
    validCard = {
        card: new Card('4153013999700024', '2017', '11', '024'),
        amount: 99,
        currency: 'EUR',
        blocking: true,
        orderId: PaymentHighwayUtility.createRequestId()
    };
});

describe('PaymentAPI', () => {
    it('Should have instance of PaymentHighwayAPI', () => {
        assert.instanceOf(api, PaymentAPI, 'Was not instance of PaymentAPI');
    });

    it('Test init transaction', (done) => {
        api.initTransaction().then((body: TransactionResponse) => {
            assert(body.result.code === 100, 'Transaction init should succeed with code 100');
            assert(body.result.message === 'OK', 'Transaction init should succeed with message "OK"');
            assert.isNotNull(body.id, 'Transaction init should return id');
            done();
        });
    });

    it('', (done) => {
        api.initTransaction().then((body: TransactionResponse) => {
            const card = new Card('4153013999700024', '2017', '11', '024');
            const transactionRequest = new TransactionRequest(card, 9999, 'EUR');
            api.debitTransaction(body.id, transactionRequest).then((response: TransactionResponse) => {
                console.log(response);
                assert(response.result.code === 100, 'Transaction debit should succeed with code 100');
                assert(response.result.message === 'OK', 'Transaction debit should succeed with message "OK"');
                done();
            });
        });
    });
});