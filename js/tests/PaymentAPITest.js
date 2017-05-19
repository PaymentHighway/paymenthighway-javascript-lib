"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const moment = require("moment");
const PaymentAPI_1 = require("../src/PaymentAPI");
const PaymentHighwayUtility_1 = require("../src/PaymentHighwayUtility");
const Card_1 = require("../src/model/request/Card");
const TransactionRequest_1 = require("../src/model/request/TransactionRequest");
const CommitTransactionRequest_1 = require("../src/model/request/CommitTransactionRequest");
const RevertTransactionRequest_1 = require("../src/model/request/RevertTransactionRequest");
let api;
let validCard;
let testCard;
beforeEach(() => {
    api = new PaymentAPI_1.PaymentAPI('https://v1-hub-staging.sph-test-solinor.com/', 'testKey', 'testSecret', 'test', 'test_merchantId');
    testCard = new Card_1.Card('4153013999700024', '2017', '11', '024');
    validCard = {
        card: testCard,
        amount: 99,
        currency: 'EUR',
        blocking: true,
        orderId: PaymentHighwayUtility_1.PaymentHighwayUtility.createRequestId()
    };
});
function createDebitTransaction(orderId, commit) {
    let initResponse;
    return api.initTransaction().then((response) => {
        initResponse = response;
        let transactionRequest = new TransactionRequest_1.TransactionRequest(testCard, 9999, 'EUR', orderId);
        if (typeof commit !== 'undefined') {
            transactionRequest.commit = commit;
        }
        return api.debitTransaction(initResponse.id, transactionRequest);
    }).then((debitResponse) => {
        checkResult(debitResponse);
        return initResponse;
    });
}
function checkResult(response) {
    chai_1.assert(response.result.code === 100, 'Request should succeed with code 100, complete response was: ' + JSON.stringify(response));
    chai_1.assert(response.result.message === 'OK', 'Request should succeed with message "OK", complete response was: ' + JSON.stringify(response));
}
function printResult(response) {
    return ', complete result was: \n' + JSON.stringify(response);
}
describe('PaymentAPI', () => {
    it('Should have instance of PaymentHighwayAPI', () => {
        chai_1.assert.instanceOf(api, PaymentAPI_1.PaymentAPI, 'Was not instance of PaymentAPI');
    });
    it('Test init transaction', (done) => {
        api.initTransaction().then((body) => {
            checkResult(body);
            chai_1.assert.isNotNull(body.id, 'Transaction init should return id');
            done();
        });
    });
    it('Test debit transaction', (done) => {
        createDebitTransaction().then(() => {
            done();
        });
    });
    it('Test commit transaction', (done) => {
        const commitRequest = new CommitTransactionRequest_1.CommitTransactionRequest(9999, 'EUR');
        let transactionId;
        createDebitTransaction('12345ABC', false)
            .then((initResponse) => {
            transactionId = initResponse.id;
            return api.commitTransaction(transactionId, commitRequest);
        })
            .then((commitResponse) => {
            checkResult(commitResponse);
            chai_1.assert(commitResponse.card.type === 'Visa', 'Card type should be "Visa"' + printResult(commitResponse));
            chai_1.assert(commitResponse.card.cvc_required === 'not_tested', 'Test card should return cvc_required = not_tested' + printResult(commitResponse));
            return api.transactionResult(transactionId);
        })
            .then((resultResponse) => {
            checkResult(resultResponse);
            done();
        });
    });
    it('Test uncommitted transaction', (done) => {
        let transactionId;
        createDebitTransaction('12345DEF', false)
            .then((initResponse) => {
            transactionId = initResponse.id;
            done();
        });
    });
    it('Test revert transaction', (done) => {
        createDebitTransaction()
            .then((initResponse) => {
            return api.revertTransaction(initResponse.id, new RevertTransactionRequest_1.RevertTransactionRequest(9999));
        })
            .then((revertResponse) => {
            checkResult(revertResponse);
            done();
        });
    });
    it('Test revert whole transaction', (done) => {
        let transactionId;
        createDebitTransaction()
            .then((initResponse) => {
            transactionId = initResponse.id;
            return api.revertTransaction(transactionId, new RevertTransactionRequest_1.RevertTransactionRequest());
        })
            .then((revertResponse) => {
            checkResult(revertResponse);
            return api.transactionStatus(transactionId);
        })
            .then((statusResponse) => {
            checkResult(statusResponse);
            chai_1.assert(statusResponse.transaction.current_amount === 0, 'Transaction current amount should be 0' + printResult(statusResponse));
            chai_1.assert(statusResponse.transaction.id === transactionId, 'Transaction id should be same with init response and revert response' + printResult(statusResponse));
            done();
        });
    });
    it('Test transaction status', (done) => {
        let transactionId;
        createDebitTransaction()
            .then((initResponse) => {
            transactionId = initResponse.id;
            return api.revertTransaction(transactionId, new RevertTransactionRequest_1.RevertTransactionRequest(9950));
        })
            .then(() => {
            return api.transactionStatus(transactionId);
        })
            .then((statusResponse) => {
            checkResult(statusResponse);
            chai_1.assert(statusResponse.transaction.current_amount === 49, 'Current amount should be 49, it was ' + statusResponse.transaction.current_amount + printResult(statusResponse));
            chai_1.assert(statusResponse.transaction.id === transactionId, 'Transaction id should be same with init response and revert response' + printResult(statusResponse));
            chai_1.assert(statusResponse.transaction.card.cvc_required === 'not_tested', 'Test card should return cvc_required = not_tested' + printResult(statusResponse));
            done();
        });
    });
    it('Test order search', (done) => {
        let transactionId;
        const orderId = PaymentHighwayUtility_1.PaymentHighwayUtility.createRequestId();
        createDebitTransaction(orderId)
            .then((initResponse) => {
            transactionId = initResponse.id;
            return api.searchOrders(orderId);
        })
            .then((searchResponse) => {
            checkResult(searchResponse);
            chai_1.assert(searchResponse.transactions[0].current_amount === 9999, 'Current amount for tested order should be 9999, it was: ' + searchResponse.transactions[0].current_amount + printResult(searchResponse));
            chai_1.assert(searchResponse.transactions[0].id === transactionId, 'Transaction id should be same with init response and search response' + printResult(searchResponse));
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
    it('Test rejected debit response', (done) => {
        const testCardTokenizeOkPaymentFails = new Card_1.Card('4153013999700156', '2017', '11', '156');
        const orderId = PaymentHighwayUtility_1.PaymentHighwayUtility.createRequestId();
        let transactionResponse;
        api.initTransaction()
            .then((response) => {
            transactionResponse = response;
            const transactionRequest = new TransactionRequest_1.TransactionRequest(testCardTokenizeOkPaymentFails, 9999, 'EUR', orderId);
            return api.debitTransaction(transactionResponse.id, transactionRequest);
        })
            .then((debitResponse) => {
            chai_1.assert(debitResponse.result.code === 200, 'Authorization should fail (code 200), got ' + debitResponse.result.code);
            chai_1.assert(debitResponse.result.message === 'Authorization failed', 'Authorization should fail');
            return api.transactionResult(transactionResponse.id);
        })
            .then((resultResponse) => {
            chai_1.assert(resultResponse.result.code === 200, 'Authorization should fail (code 200), got ' + resultResponse.result.code);
            return api.transactionStatus(transactionResponse.id);
        })
            .then((statusResponse) => {
            chai_1.assert(statusResponse.transaction.committed === false, 'Committed should be false, got' + statusResponse.transaction.committed);
            done();
        });
    });
});
//# sourceMappingURL=PaymentAPITest.js.map