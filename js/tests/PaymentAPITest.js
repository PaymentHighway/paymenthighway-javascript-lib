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
const MasterpassTransactionRequest_1 = require("../src/model/request/MasterpassTransactionRequest");
const ApplePayTransactionRequest_1 = require("../src/model/request/ApplePayTransactionRequest");
const MobilePayInitRequest_1 = require("../src/model/request/MobilePayInitRequest");
const Splitting_1 = require("../src/model/Splitting");
const PivoInitRequest_1 = require("../src/model/request/PivoInitRequest");
let api;
let validCard;
let testCard;
beforeEach(() => {
    api = new PaymentAPI_1.PaymentAPI('https://v1-hub-staging.sph-test-solinor.com/', 'testKey', 'testSecret', 'test', 'test_merchantId');
    testCard = new Card_1.Card('4153013999700024', '2023', '11', '024');
    validCard = {
        card: testCard,
        amount: 99,
        currency: 'EUR',
        blocking: true,
        orderId: PaymentHighwayUtility_1.PaymentHighwayUtility.createRequestId()
    };
});
function createDebitTransaction(orderId, commit, splitting) {
    let initResponse;
    return api.initTransaction().then((response) => {
        initResponse = response;
        let transactionRequest = new TransactionRequest_1.TransactionRequest(testCard, 9999, 'EUR', orderId, undefined, commit, splitting);
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
    it('Test init transaction', () => {
        return api.initTransaction().then((body) => {
            checkResult(body);
            chai_1.assert.isNotNull(body.id, 'Transaction init should return id');
        });
    });
    it('Test debit transaction', () => {
        return createDebitTransaction().then((body) => {
            chai_1.assert.isNotNull(body.id, 'Transaction id not received');
        });
    });
    it('Test commit transaction', () => {
        const commitRequest = new CommitTransactionRequest_1.CommitTransactionRequest(9999, 'EUR');
        let transactionId;
        return createDebitTransaction('12345ABC', false)
            .then((initResponse) => {
            transactionId = initResponse.id;
            return api.commitTransaction(transactionId, commitRequest);
        })
            .then((commitResponse) => {
            checkResult(commitResponse);
            chai_1.assert(commitResponse.card.type === 'Visa', 'Card type should be "Visa"' + printResult(commitResponse));
            chai_1.assert(commitResponse.card.cvc_required === 'not_tested', 'Test card should return cvc_required = not_tested' + printResult(commitResponse));
            chai_1.assert(commitResponse.recurring === false, 'Transaction should have recurring as false.' + printResult(commitResponse));
            chai_1.assert(true === /^[0-9a-f]{64}$/.test(commitResponse.card.card_fingerprint), 'Card fingerprint didn\'t contain 64 hex chars');
            chai_1.assert(true === /^[0-9a-f]{64}$/.test(commitResponse.card.pan_fingerprint), 'Pan fingerprint didn\'t contain 64 hex chars');
            return api.transactionResult(transactionId);
        })
            .then((resultResponse) => {
            chai_1.assert(resultResponse.recurring === false, 'Transaction result should have recurring false.' + printResult(resultResponse));
            checkResult(resultResponse);
        });
    });
    it('Test uncommitted transaction', () => {
        let transactionId;
        return createDebitTransaction('12345DEF', false)
            .then((initResponse) => {
            transactionId = initResponse.id;
        });
    });
    it('Test revert transaction', () => {
        return createDebitTransaction()
            .then((initResponse) => {
            return api.revertTransaction(initResponse.id, new RevertTransactionRequest_1.RevertTransactionRequest(9999));
        })
            .then((revertResponse) => {
            checkResult(revertResponse);
        });
    });
    it('Test revert whole transaction', () => {
        let transactionId;
        return createDebitTransaction()
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
        });
    });
    it('Test transaction status', () => {
        let transactionId;
        return createDebitTransaction()
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
        });
    });
    it('Test splitting in transaction status', () => {
        let transactionId;
        let subMerchantId = '12345';
        let amountToSubMerchant = 9000;
        let splitting = new Splitting_1.Splitting(subMerchantId, amountToSubMerchant);
        return createDebitTransaction(undefined, undefined, splitting)
            .then((initResponse) => {
            transactionId = initResponse.id;
            return api.transactionStatus(transactionId);
        })
            .then((statusResponse) => {
            checkResult(statusResponse);
            chai_1.assert(statusResponse.transaction.splitting.merchant_id === subMerchantId, 'Status response should contain matching splitting merchant ID');
            chai_1.assert(statusResponse.transaction.splitting.amount === amountToSubMerchant, 'Status response should contain matching splitting amount');
        });
    });
    it('Test order search', () => {
        let transactionId;
        const orderId = PaymentHighwayUtility_1.PaymentHighwayUtility.createRequestId();
        return createDebitTransaction(orderId)
            .then((initResponse) => {
            transactionId = initResponse.id;
            return api.searchOrders(orderId);
        })
            .then((searchResponse) => {
            checkResult(searchResponse);
            chai_1.assert(searchResponse.transactions[0].current_amount === 9999, 'Current amount for tested order should be 9999, it was: ' + searchResponse.transactions[0].current_amount + printResult(searchResponse));
            chai_1.assert(searchResponse.transactions[0].id === transactionId, 'Transaction id should be same with init response and search response' + printResult(searchResponse));
            chai_1.assert(searchResponse.transactions[0].recurring === false, 'Transaction should have recurring false' + printResult(searchResponse));
        });
    });
    it('Test daily batch report', () => {
        const date = moment().add(1, 'days').format('YYYYMMDD');
        return api.fetchDailyReport(date)
            .then((reportResponse) => {
            checkResult(reportResponse);
        });
    });
    it('Test rejected debit response', () => {
        const testCardTokenizeOkPaymentFails = new Card_1.Card('4153013999700156', '2023', '11', '156');
        const orderId = PaymentHighwayUtility_1.PaymentHighwayUtility.createRequestId();
        let transactionResponse;
        return api.initTransaction()
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
        });
    });
    it('Test Masterpass transaction', () => {
        const preGeneratedMasterpassTransaction = '327c6f29-9b46-40b9-b85b-85e908015d92';
        return api.userProfile(preGeneratedMasterpassTransaction)
            .then((userProfileResponse) => {
            checkResult(userProfileResponse);
            const masterpass = userProfileResponse.masterpass;
            chai_1.assert(masterpass.amount === 100);
            chai_1.assert(masterpass.currency === 'EUR');
            chai_1.assert(masterpass.masterpass_wallet_id === '101');
            const profile = userProfileResponse.profile;
            chai_1.assert(profile.email_address === 'matti.meikalainen@gmail.com');
            chai_1.assert.isNotNull(profile.billing_address);
            chai_1.assert(profile.billing_address.country === 'FI');
            chai_1.assert.isNotNull(profile.shipping_address);
            chai_1.assert(profile.shipping_address.country === 'FI');
            const request = new MasterpassTransactionRequest_1.MasterpassTransactionRequest(50, 'EUR');
            return api.debitMasterpassTransaction(preGeneratedMasterpassTransaction, request);
        })
            .then((debitResponse) => {
            checkResult(debitResponse);
        });
    });
    it('Test Apple Pay request builders', () => {
        let amount = 100;
        let currency = 'EUR';
        let paymentToken = JSON.parse('{ "data": "ABCD", "header": { "ephemeralPublicKey": "XYZ", "publicKeyHash": "13579", "transactionId": "24680" }, "signature": "ABCDXYZ0000", "version": "EC_v1" }');
        chai_1.assert.strictEqual(paymentToken.data, 'ABCD', 'Data was not equal to ABCD');
        let withStaticBuilder = ApplePayTransactionRequest_1.ApplePayTransactionRequest.Builder(paymentToken, amount, currency).build();
        let withRequestBuilder = new ApplePayTransactionRequest_1.ApplePayTransaction.RequestBuilder(paymentToken, amount, currency).build();
        chai_1.assert.deepEqual(withStaticBuilder, withRequestBuilder, 'results differ from builder');
        let requestWithCommit = ApplePayTransactionRequest_1.ApplePayTransactionRequest.Builder(paymentToken, amount, currency).setCommit(true).build();
        chai_1.assert.notDeepEqual(withStaticBuilder, requestWithCommit, 'requests should differ if commit is added');
        chai_1.assert(withStaticBuilder.amount === 100);
    });
    it('Test Apple Pay validators', () => {
        let amount = 100;
        let currency = 'EUR';
        // Syntax is valid, but content will fail
        let paymentToken = JSON.parse('{ "data": "ABCD", "header": { "ephemeralPublicKey": "XYZ=", "publicKeyHash": "13579ABC", "transactionId": "0002040608" }, "signature": "ABCD13579ABC", "version": "EC_v1" }');
        return api.initTransaction()
            .then((response) => {
            const request = ApplePayTransactionRequest_1.ApplePayTransactionRequest.Builder(paymentToken, amount, currency).build();
            return api.debitApplePayTransaction(response.id, request);
        })
            .then((debitResponse) => {
            chai_1.assert(debitResponse.result.code === 900, 'Authorization should fail (code 900), got ' + debitResponse.result.code);
            chai_1.assert.equal(debitResponse.result.message, 'ERROR', 'Authorization should fail with ERROR, validation should succeed');
        });
    });
    it('Test MobilePay app flow init @external', () => {
        const request = MobilePayInitRequest_1.MobilePayInitRequest.Builder(100, 'EUR')
            .setOrder(PaymentHighwayUtility_1.PaymentHighwayUtility.createRequestId())
            .setReturnUri('myapp://paid')
            .setWebhookSuccessUrl('https://myserver.com/success')
            .setWebhookCancelUrl('https://myserver.com/cancel')
            .setWebhookFailureUrl('https://myserver.com/failure')
            .build();
        return api.initMobilePaySession(request).then((response) => {
            chai_1.assert.isNotNull(response.uri);
            chai_1.assert.isNotNull(response.session_token);
            chai_1.assert.isNotNull(response.valid_until);
            chai_1.assert.containIgnoreCase(response.uri, response.session_token, 'Returned app URI should contain session token.');
        });
    });
    it('Test MobilePay app flow session status @external', () => {
        const request = MobilePayInitRequest_1.MobilePayInitRequest.Builder(100, 'EUR')
            .setOrder(PaymentHighwayUtility_1.PaymentHighwayUtility.createRequestId())
            .setReturnUri('myapp://paid')
            .setWebhookSuccessUrl('https://myserver.com/success')
            .setWebhookCancelUrl('https://myserver.com/cancel')
            .setWebhookFailureUrl('https://myserver.com/failure')
            .build();
        return api.initMobilePaySession(request).then((initResponse) => {
            return api.mobilePaySessionStatus(initResponse.session_token).then((response) => {
                chai_1.assert.equal(response.status, 'in_progress');
                chai_1.assert.equal(response.valid_until, initResponse.valid_until, 'Both init and status check should have same valid until value.');
                chai_1.assert.isUndefined(response.transaction_id); // transaction id is available only when session is finished
            });
        });
    });
    it('Test Pivo app switch init', () => {
        const request = PivoInitRequest_1.PivoInitRequest.Builder(100)
            .setOrder('Test_order')
            .setAppUrl('app://url')
            .setReferenceNumber('1313')
            .setWebhookSuccessUrl('https://www.exaple.com/success')
            .setWebhookCancelUrl('https://www.example.com/cancel')
            .setWebhookFailureUrl('https://www.example.com/failure')
            .setLanguage('FI')
            .build();
        return api.initPivoSession(request).then((response) => {
            chai_1.assert.startsWith(response.uri, 'pivo://api/', 'Pivo app uri should start with "pivo://api/"');
        });
    });
});
//# sourceMappingURL=PaymentAPITest.js.map