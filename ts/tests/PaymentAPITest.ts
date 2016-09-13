import {assert} from 'chai';
import * as moment from 'moment';
import {PaymentAPI} from '../src/PaymentAPI';
import {PaymentHighwayUtility} from '../src/PaymentHighwayUtility';
import {Card} from '../src/model/request/Card';
import {TransactionResponse} from '../src/model/response/TransactionResponse';
import {TransactionRequest} from '../src/model/request/TransactionRequest';
import {CommitTransactionRequest} from '../src/model/request/CommitTransactionRequest';
import {RevertTransactionRequest} from '../src/model/request/RevertTransactionRequest';
import {TransactionStatusResponse} from '../src/model/response/TransactionStatusResponse';
import {Response} from '../src/model/response/Response';
import {OrderSearchResponse} from '../src/model/response/OrderSearchResponse';

let api: PaymentAPI;
let validCard: any;
let testCard: Card;

beforeEach(() => {
    api = new PaymentAPI('https://v1-hub-staging.sph-test-solinor.com/', 'testKey', 'testSecret', 'test', 'test_merchantId');
    testCard = new Card('4153013999700024', '2017', '11', '024');
    validCard = {
        card: testCard,
        amount: 99,
        currency: 'EUR',
        blocking: true,
        orderId: PaymentHighwayUtility.createRequestId()
    };
});

function createDebitTransaction(orderId?: string): Promise<TransactionResponse> {
    let initResponse: TransactionResponse;

    return api.initTransaction().then((response) => {
        initResponse = response;
        const transactionRequest = new TransactionRequest(testCard, 9999, 'EUR', orderId);
        return api.debitTransaction(initResponse.id, transactionRequest);
    }).then((debitResponse) => {
        checkResult(debitResponse);
        return initResponse;
    });
}

function checkResult(response: Response): void {
    assert(response.result.code === 100, 'Request should succeed with code 100, complete response was: ' + JSON.stringify(response));
    assert(response.result.message === 'OK', 'Request should succeed with message "OK", complete response was: ' + JSON.stringify(response));
}

function printResult(response: Response): string {
    return ', complete result was: \n' + JSON.stringify(response);
}

describe('PaymentAPI', () => {
    it('Should have instance of PaymentHighwayAPI', () => {
        assert.instanceOf(api, PaymentAPI, 'Was not instance of PaymentAPI');
    });

    it('Test init transaction', (done) => {
        api.initTransaction().then((body) => {
            checkResult(body);
            assert.isNotNull(body.id, 'Transaction init should return id');
            done();
        });
    });

    it('Test debit transaction', (done) => {
        createDebitTransaction().then(() => {
           done();
        });
    });

    it('Test commit transaction', (done) => {
        const commitRequest = new CommitTransactionRequest(9999, 'EUR');
        createDebitTransaction()
            .then((initResponse) => {
                return api.commitTransaction(initResponse.id, commitRequest);
            })
            .then((commitResponse) => {
            checkResult(commitResponse);
            assert(commitResponse.card.type === 'Visa', 'Card type should be "Visa"' + printResult(commitResponse));
            assert(commitResponse.card.cvc_required === 'not_tested', 'Test card should return cvc_required = not_tested' + printResult(commitResponse));
            done();
        });
    });

    it('Test revert transaction', (done) => {
        createDebitTransaction()
            .then((initResponse) => {
                return api.revertTransaction(initResponse.id, new RevertTransactionRequest(9999));
            })
            .then((revertResponse) => {
                checkResult(revertResponse);
                done();
            });
    });

    it('Test revert whole transaction', (done) => {
        let transactionId: string;
        createDebitTransaction()
            .then((initResponse) => {
                transactionId = initResponse.id;
                return api.revertTransaction(transactionId, new RevertTransactionRequest());
            })
            .then((revertResponse) => {
                checkResult(revertResponse);
                return api.transactionStatus(transactionId);
            })
            .then((statusResponse: TransactionStatusResponse) => {
                checkResult(statusResponse);
                assert(statusResponse.transaction.current_amount === 0, 'Transaction current amount should be 0' + printResult(statusResponse));
                assert(statusResponse.transaction.id === transactionId, 'Transaction id should be same with init response and revert response' + printResult(statusResponse));
                done();
            });
    });

    it('Test transaction status', (done) => {
        let transactionId: string;
        createDebitTransaction()
            .then((initResponse) => {
                transactionId = initResponse.id;
                return api.revertTransaction(transactionId, new RevertTransactionRequest(9950));
            })
            .then(() => {
                return api.transactionStatus(transactionId);
            })
            .then((statusResponse: TransactionStatusResponse) => {
                checkResult(statusResponse);
                assert(statusResponse.transaction.current_amount === 49, 'Current amount should be 49, it was ' + statusResponse.transaction.current_amount + printResult(statusResponse));
                assert(statusResponse.transaction.id === transactionId, 'Transaction id should be same with init response and revert response' + printResult(statusResponse));
                assert(statusResponse.transaction.card.cvc_required === 'not_tested', 'Test card should return cvc_required = not_tested' + printResult(statusResponse));
                done();
            });
    });

    it('Test order search', (done) => {
        let transactionId: string;
        const orderId = PaymentHighwayUtility.createRequestId();
        createDebitTransaction(orderId)
            .then((initResponse) => {
                transactionId = initResponse.id;
                return api.searchOrders(orderId);
            })
            .then((searchResponse: OrderSearchResponse) => {
                checkResult(searchResponse);
                assert(searchResponse.transactions[0].current_amount === 9999, 'Current amount for tested order should be 9999, it was: ' + searchResponse.transactions[0].current_amount + printResult(searchResponse));
                assert(searchResponse.transactions[0].id === transactionId, 'Transaction id should be same with init response and search response' + printResult(searchResponse));
                done();
            });
    });

    it('Test daily batch report', (done) => {
        const date = moment().add(1, 'days').format('YYYYMMDD');
        api.fetchDailyReport(date)
            .then((reportResponse) => {
                checkResult(reportResponse);
                done();
            });
    });

});
