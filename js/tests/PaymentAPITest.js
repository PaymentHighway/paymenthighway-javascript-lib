"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const moment = require("moment");
const PaymentAPI_1 = require("../src/PaymentAPI");
const PaymentHighwayUtility_1 = require("../src/PaymentHighwayUtility");
const Card_1 = require("../src/model/request/Card");
const TransactionRequest_1 = require("../src/model/request/TransactionRequest");
const CommitTransactionRequest_1 = require("../src/model/request/CommitTransactionRequest");
const RevertTransactionRequest_1 = require("../src/model/request/RevertTransactionRequest");
const ApplePayTransactionRequest_1 = require("../src/model/request/ApplePayTransactionRequest");
const MobilePayInitRequest_1 = require("../src/model/request/MobilePayInitRequest");
const Splitting_1 = require("../src/model/Splitting");
const ChargeMitRequest_1 = require("../src/model/request/ChargeMitRequest");
const ChargeCitRequest_1 = require("../src/model/request/ChargeCitRequest");
const StrongCustomerAuthentication_1 = require("../src/model/request/sca/StrongCustomerAuthentication");
const ReturnUrls_1 = require("../src/model/request/sca/ReturnUrls");
const CustomerDetails_1 = require("../src/model/request/sca/CustomerDetails");
const PhoneNumber_1 = require("../src/model/request/sca/PhoneNumber");
const CustomerAccount_1 = require("../src/model/request/sca/CustomerAccount");
const Purchase_1 = require("../src/model/request/sca/Purchase");
const Address_1 = require("../src/model/request/sca/Address");
const CustomerAuthenticationInfo_1 = require("../src/model/request/sca/CustomerAuthenticationInfo");
const PivoInitRequest_1 = require("../src/model/request/PivoInitRequest");
const FormBuilder_1 = require("../src/FormBuilder");
const FormConnection_1 = require("./helpers/FormConnection");
chai_1.use(require('chai-string'));
let api;
let validCard;
let testCard;
let scaSoftDeclineCard;
const baseUrl = 'https://v1-hub-staging.sph-test-solinor.com/';
const signatureKeyId = 'testKey';
const signatureSecret = 'testSecret';
const account = 'test';
const merchant = 'test_merchantId';
beforeEach(() => {
    api = new PaymentAPI_1.PaymentAPI(baseUrl, signatureKeyId, signatureSecret, account, merchant);
    testCard = new Card_1.Card('4153013999700024', '2023', '11', '024');
    validCard = {
        card: testCard,
        amount: 99,
        currency: 'EUR',
        blocking: true,
        orderId: PaymentHighwayUtility_1.PaymentHighwayUtility.createRequestId()
    };
    scaSoftDeclineCard = new Card_1.Card('4153013999701162', '2023', '11', '162');
});
function createDebitTransaction(orderId, commit, splitting, referenceNumber) {
    let initResponse;
    return api.initTransaction().then((response) => {
        initResponse = response;
        let transactionRequest = new TransactionRequest_1.TransactionRequest(testCard, 9999, 'EUR', orderId, undefined, commit, splitting, referenceNumber);
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
function getFullStrongCustomerAuthenticationData() {
    const returnUrls = ReturnUrls_1.ReturnUrls.Builder('https://example.com/success', 'https://example.com/cancel', 'https://example.com/failure').setWebhookSuccessUrl('https://example.com/webhook/success')
        .setWebhookCancelUrl('https://example.com/webhook/cancel')
        .setWebhookFailureUrl('https://example.com/webhook/failure')
        .setWebhookDelay(0)
        .build();
    const customerDetails = CustomerDetails_1.CustomerDetails.Builder()
        .setShippingAddressMatchesBillingAddress(true)
        .setName('Eric Example')
        .setEmail('eric.example@example.com')
        .setHomePhone(new PhoneNumber_1.PhoneNumber('358', '123456789'))
        .setMobilePhone(new PhoneNumber_1.PhoneNumber('358', '441234566'))
        .setWorkPhone(new PhoneNumber_1.PhoneNumber('358', '441234566'))
        .build();
    const customerAccount = CustomerAccount_1.CustomerAccount.Builder()
        .setAccountAgeIndicator(CustomerAccount_1.AccountAgeIndicator.MoreThan60Days)
        .setAccountDate('2018-07-05')
        .setChangeIndicator(CustomerAccount_1.AccountInformationChangeIndicator.MoreThan60Days)
        .setChangeDate('2018-09-11')
        .setPasswordChangeIndicator(CustomerAccount_1.AccountPasswordChangeIndicator.NoChange)
        .setPasswordChangeDate('2018-07-05')
        .setNumberOfRecentPurchases(7)
        .setNumberOfAddCardAttemptsDay(1)
        .setNumberOfTransactionActivityDay(3)
        .setNumberOfTransactionActivityYear(8)
        .setShippingAddressIndicator(CustomerAccount_1.ShippingAddressFirstUsedIndicator.Between30And60Days)
        .setShippingAddressUsageDate('2019-07-01')
        .setSuspiciousActivity(CustomerAccount_1.SuspiciousActivityIndicator.NoSuspiciousActivity)
        .build();
    const purchase = Purchase_1.Purchase.Builder()
        .setShippingIndicator(Purchase_1.ShippingIndicator.ShipToCardholdersAddress)
        .setDeliveryTimeFrame(Purchase_1.DeliveryTimeFrame.SameDayShipping)
        .setDeliveryEmail('eric.example@example.com')
        .setReorderItemsIndicator(Purchase_1.ReorderItemsIndicator.FirstTimeOrdered)
        .setPreOrderPurchaseIndicator(Purchase_1.PreOrderPurchaseIndicator.MerchandiseAvailable)
        .setPreOrderDate('2019-08-20')
        .setShippingNameIndicator(Purchase_1.ShippingNameIndicator.AccountNameMatchesShippingName)
        .setGiftCardAmount(200)
        .setGiftCardCount(7)
        .build();
    const billingAddress = Address_1.Address.Builder()
        .setCity('Helsinki')
        .setCountry('246')
        .setAddressLine1('Arkadiankatu 1')
        .setAddressLine2('')
        .setAddressLine3('')
        .setPostCode('00101')
        .setState('18')
        .build();
    const shippingAddress = Address_1.Address.Builder()
        .setCity('Helsinki')
        .setCountry('246')
        .setAddressLine1('Arkadiankatu 1')
        .setAddressLine2('')
        .setAddressLine3('')
        .setPostCode('00101')
        .setState('18')
        .build();
    const customerAuthenticationInfo = CustomerAuthenticationInfo_1.CustomerAuthenticationInfo.Builder()
        .setMethod(CustomerAuthenticationInfo_1.Method.OwnCredentials)
        .build();
    return StrongCustomerAuthentication_1.StrongCustomerAuthentication.Builder(returnUrls)
        .setCustomerDetails(customerDetails)
        .setCustomerAccount(customerAccount)
        .setPurchase(purchase)
        .setBillingAddress(billingAddress)
        .setShippingAddress(shippingAddress)
        .setCustomerAuthenticationInfo(customerAuthenticationInfo)
        .setDesiredChallengeWindowSize(StrongCustomerAuthentication_1.ChallengeWindowSize.Window600x400)
        .setExitIframeOnResult(false)
        .setExitIframeOnThreeDSecure(false)
        .build();
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
    it('Test charge merchant initiated transaction', () => __awaiter(void 0, void 0, void 0, function* () {
        const initResponse = yield api.initTransaction();
        const chargeMitRequest = ChargeMitRequest_1.ChargeMitRequest.Builder(9999, 'EUR', 'order1')
            .setCard(testCard)
            .build();
        const chargeResponse = yield api.chargeMerchantInitiatedTransaction(initResponse.id, chargeMitRequest);
        checkResult(chargeResponse);
    }));
    it('Test charge merchant initiated transaction should throw an exception if card or token is not defined', () => __awaiter(void 0, void 0, void 0, function* () {
        chai_1.expect(() => ChargeMitRequest_1.ChargeMitRequest.Builder(9999, 'EUR', 'order1').build())
            .to.throw('Either card or token must be defined');
    }));
    it('Test charge customer initiated transaction', () => __awaiter(void 0, void 0, void 0, function* () {
        const initResponse = yield api.initTransaction();
        const strongCustomerAuthentication = StrongCustomerAuthentication_1.StrongCustomerAuthentication.Builder(ReturnUrls_1.ReturnUrls.Builder('https://example.com/success', 'https://example.com/cancel', 'https://example.com/failure').build()).build();
        const chargeCitRequest = ChargeCitRequest_1.ChargeCitRequest.Builder(9999, 'EUR', 'testorder1', strongCustomerAuthentication)
            .setCard(testCard)
            .build();
        const chargeResponse = yield api.chargeCustomerInitiatedTransaction(initResponse.id, chargeCitRequest);
        checkResult(chargeResponse);
    }));
    it('Test charge customer initiated transaction should throw an exception if card or token is not defined', () => __awaiter(void 0, void 0, void 0, function* () {
        const strongCustomerAuthentication = StrongCustomerAuthentication_1.StrongCustomerAuthentication.Builder(ReturnUrls_1.ReturnUrls.Builder('https://example.com/success', 'https://example.com/cancel', 'https://example.com/failure').build()).build();
        chai_1.expect(() => ChargeCitRequest_1.ChargeCitRequest.Builder(9999, 'EUR', 'order1', strongCustomerAuthentication).build())
            .to.throw('Either card or token must be defined');
    }));
    it('Test charge customer initiated transaction with full SCA data', () => __awaiter(void 0, void 0, void 0, function* () {
        const initResponse = yield api.initTransaction();
        const strongCustomerAuthentication = getFullStrongCustomerAuthenticationData();
        const chargeCitRequest = ChargeCitRequest_1.ChargeCitRequest.Builder(9999, 'EUR', 'testorder1', strongCustomerAuthentication)
            .setCard(testCard)
            .build();
        const chargeResponse = yield api.chargeCustomerInitiatedTransaction(initResponse.id, chargeCitRequest);
        checkResult(chargeResponse);
    }));
    it('Test soft-decline of customer initiated transaction', () => __awaiter(void 0, void 0, void 0, function* () {
        const initResponse = yield api.initTransaction();
        const strongCustomerAuthentication = StrongCustomerAuthentication_1.StrongCustomerAuthentication.Builder(ReturnUrls_1.ReturnUrls.Builder('https://example.com/success', 'https://example.com/cancel', 'https://example.com/failure').build()).build();
        const chargeCitRequest = ChargeCitRequest_1.ChargeCitRequest.Builder(100, 'EUR', 'order1', strongCustomerAuthentication)
            .setCard(scaSoftDeclineCard)
            .build();
        const chargeResponse = yield api.chargeCustomerInitiatedTransaction(initResponse.id, chargeCitRequest);
        chai_1.assert(chargeResponse.result.code === 400, 'Request should have been soft declined with code 400, complete response was: ' + JSON.stringify(chargeResponse));
        chai_1.assert.isNotNull(chargeResponse.three_d_secure_url, '3D Secure url not received');
    }));
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
        const referenceNumber = '1313';
        return createDebitTransaction(null, null, null, referenceNumber)
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
            chai_1.assert(statusResponse.transaction.reference_number === referenceNumber, 'Transaction reference number mismatch' + printResult(statusResponse));
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
            chai_1.assert(debitResponse.acquirer.id === 'nets', 'Should find nets as acquirer id. Found: ' + debitResponse.acquirer.id);
            chai_1.assert(debitResponse.acquirer.name === 'Nets', 'Should find Nets as acquirer name. Found: ' + debitResponse.acquirer.name);
            chai_1.assert(debitResponse.acquirer_response_code === '116', 'Acquirer response code should be "116". Found: ' + debitResponse.acquirer_response_code);
            chai_1.assert(debitResponse.authorizer === '666', 'Authorizer should be "666". Found: ' + debitResponse.authorizer);
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
    it('Test Apple Pay request builders', () => {
        let amount = 100;
        let currency = 'EUR';
        let paymentToken = JSON.parse('{ "data": "ABCD", "header": { "ephemeralPublicKey": "XYZ", "publicKeyHash": "13579", "transactionId": "24680" }, "signature": "ABCDXYZ0000", "version": "EC_v1" }');
        chai_1.assert.strictEqual(paymentToken.data, 'ABCD', 'Data was not equal to ABCD');
        let withStaticBuilder = withoutRequestId(ApplePayTransactionRequest_1.ApplePayTransactionRequest.Builder(paymentToken, amount, currency).build());
        let withRequestBuilder = withoutRequestId(new ApplePayTransactionRequest_1.ApplePayTransaction.RequestBuilder(paymentToken, amount, currency).build());
        chai_1.assert.deepEqual(withStaticBuilder, withRequestBuilder, 'results differ from builder');
        let requestWithCommit = withoutRequestId(ApplePayTransactionRequest_1.ApplePayTransactionRequest.Builder(paymentToken, amount, currency).setCommit(true).build());
        chai_1.assert.notDeepEqual(withStaticBuilder, requestWithCommit, 'requests should differ if commit is added');
        chai_1.assert(withStaticBuilder.amount === 100);
    });
    function withoutRequestId(request) {
        let copy = Object.assign({}, request);
        delete copy.requestId;
        return copy;
    }
    it('Test Apple Pay request builder with splitting', () => {
        const paymentData = JSON.parse('{ "data": "ABCD", "header": { "ephemeralPublicKey": "XYZ", "publicKeyHash": "13579", "transactionId": "24680" }, "signature": "ABCDXYZ0000", "version": "EC_v1" }');
        const amount = 100;
        const currency = 'EUR';
        const splittingMerchantId = '123';
        const splittingAmount = 10;
        const splitting = new Splitting_1.Splitting(splittingMerchantId, splittingAmount);
        let request = ApplePayTransactionRequest_1.ApplePayTransactionRequest.Builder(paymentData, amount, currency).setSplitting(splitting).build();
        chai_1.assert(request.splitting.merchant_id === splittingMerchantId);
        chai_1.assert(request.splitting.amount === splittingAmount);
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
    it('Test MobilePay request builder with splitting', () => {
        const splittingMerchantId = '123';
        const splittingAmount = 10;
        const splitting = new Splitting_1.Splitting(splittingMerchantId, splittingAmount);
        let request = MobilePayInitRequest_1.MobilePayInitRequest.Builder(100, 'EUR').setSplitting(splitting).build();
        chai_1.assert(request.splitting.merchant_id === splittingMerchantId);
        chai_1.assert(request.splitting.amount === splittingAmount);
    });
    it('Test Pivo app switch init', () => {
        const request = PivoInitRequest_1.PivoInitRequest.Builder(100)
            .setOrder('Test_order')
            .setDescription('desc')
            .setAppUrl('app://url')
            .setReferenceNumber('1313')
            .setWebhookSuccessUrl('https://www.exaple.com/success')
            .setWebhookCancelUrl('https://www.example.com/cancel')
            .setWebhookFailureUrl('https://www.example.com/failure')
            .setLanguage('FI')
            .build();
        return api.initPivoTransaction(request).then((response) => {
            chai_1.assert.startsWith(response.uri, 'pivo://api/', 'Pivo app uri should start with "pivo://api/"');
        });
    });
    it('Test Pivo app switch init with splitting', () => {
        const splitting = new Splitting_1.Splitting('12345', 10);
        const request = PivoInitRequest_1.PivoInitRequest.Builder(100)
            .setSplitting(splitting)
            .build();
        chai_1.assert(request.splitting.merchant_id === splitting.merchant_id);
        chai_1.assert(request.splitting.amount === splitting.amount);
    });
    it('Test Form Session Status', () => __awaiter(void 0, void 0, void 0, function* () {
        let exampleUrl = 'https://example.com/';
        let formBuilder = new FormBuilder_1.FormBuilder('POST', signatureKeyId, signatureSecret, account, merchant, baseUrl);
        const formContainer = formBuilder.generateAddCardParameters(exampleUrl, exampleUrl, exampleUrl, 'EN');
        let formSessionId;
        yield FormConnection_1.FormConnection.postForm(formContainer)
            .then((response) => formSessionId = response.headers.location.split('/')[2]);
        return api.formSessionStatus(formSessionId)
            .then((sessionStatusResponse) => {
            chai_1.assert(sessionStatusResponse.status.state === 'ok_pending');
            chai_1.assert(sessionStatusResponse.result.message === 'OK');
            chai_1.expect(sessionStatusResponse.transaction_id).to.not.exist;
            chai_1.assert(sessionStatusResponse.operation === 'tokenize');
            chai_1.expect(sessionStatusResponse.created).to.exist;
            chai_1.expect(sessionStatusResponse.valid_until).to.exist;
        });
    }));
});
//# sourceMappingURL=PaymentAPITest.js.map