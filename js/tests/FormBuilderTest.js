"use strict";
const chai_1 = require('chai');
const chaiString = require('chai-string');
const FormBuilder_1 = require('../src/FormBuilder');
const FormConnection_1 = require('./helpers/FormConnection');
const PaymentAPI_1 = require('../src/PaymentAPI');
const URI = require('urijs');
const SecureSigner_1 = require('../src/security/SecureSigner');
const TransactionRequest_1 = require('../src/model/request/TransactionRequest');
const Token_1 = require('../src/model/Token');
const Browser = require('zombie');
chai_1.use(chaiString);
const method = 'POST';
const signatureKeyId = 'testKey';
const signatureSecret = 'testSecret';
const account = 'test';
const merchant = 'test_merchantId';
const baseUrl = 'https://v1-hub-staging.sph-test-solinor.com';
const successUrl = 'https://example.com/success';
const failureUrl = 'https://example.com/failure';
const cancelUrl = 'https://example.com/cancel';
const language = 'EN';
const amount = 9999;
const currency = 'EUR';
const orderId = '1000123A';
const description = 'order description';
const sphAccount = 'test';
const sphMerchant = 'test_merchantId';
let formBuilder;
const ss = new SecureSigner_1.SecureSigner(signatureKeyId, signatureSecret);
let cardToken;
beforeEach(() => {
    formBuilder = new FormBuilder_1.FormBuilder(method, signatureKeyId, signatureSecret, account, merchant, baseUrl);
});
function testRedirectResponse(response, locationEndsWith) {
    chai_1.assert(response.statusCode === 303, 'Response status code should be 303, got ' + response.statusCode);
    chai_1.assert.endsWith(response.headers.location, locationEndsWith, 'Response should return location to form.');
}
function testNameValuePairs(nameValuePairs, rightAmount) {
    chai_1.assert(nameValuePairs.length === rightAmount, 'Should have ' + rightAmount + ' name value pairs. Got ' + nameValuePairs.length);
}
describe('Form builder', () => {
    it('Should have instance of FormBuilder', () => {
        chai_1.assert.instanceOf(formBuilder, FormBuilder_1.FormBuilder, 'Was not instance of FormBuilder');
    });
    it('Should have right parameters', () => {
        const formContainer = formBuilder.generateAddCardParameters(successUrl, failureUrl, cancelUrl, language);
        testNameValuePairs(formContainer.nameValuePairs, 10);
        chai_1.assert(formContainer.getAction() === baseUrl + '/form/view/add_card', 'Action url should be ' + baseUrl + '/form/view/add_card' +
            ' got ' + formContainer.getAction());
    });
    it('Test tokenize', (done) => {
        const formContainer = formBuilder.generateAddCardParameters(successUrl, failureUrl, cancelUrl, language);
        const paymentAPI = new PaymentAPI_1.PaymentAPI(baseUrl, signatureKeyId, signatureSecret, sphAccount, sphMerchant);
        FormConnection_1.FormConnection.postForm(formContainer)
            .then((response) => {
            chai_1.assert(response.statusCode === 303, 'Response status code should be 303, got ' + response.statusCode);
            const browser = new Browser();
            browser.visit(baseUrl + response.headers.location, () => {
                browser.fill('input[name=card_number_formatted]', '4153 0139 9970 0024')
                    .fill('input[name=expiration_month]', '11')
                    .fill('input[name=expiration_year]', '2017')
                    .fill('input[name=expiry]', '11 / 17')
                    .fill('input[name=cvv]', '024')
                    .pressButton('OK', () => {
                    const uri = URI.parse(browser.resources[0].response.url);
                    const parameters = URI.parseQuery(uri.query);
                    chai_1.assert.isTrue(ss.validateFormRedirect(parameters), 'Validate redirect should return true');
                    paymentAPI.tokenization(parameters['sph-tokenization-id'])
                        .then((tokenResponse) => {
                        chai_1.assert(tokenResponse.card.expire_year === '2017', 'Expire year should be 2017');
                        chai_1.assert(tokenResponse.card.expire_month === '11', 'Expire month should be 11');
                        chai_1.assert(tokenResponse.card.type === 'Visa', 'Card type should be Visa');
                        chai_1.assert(tokenResponse.card.cvc_required === 'no', 'Should not require CVC');
                        cardToken = tokenResponse.card_token;
                        done();
                    });
                });
            });
        });
    });
    it('Test with acceptCvcRequired set to false.', (done) => {
        const acceptCvcRequired = false;
        const formContainer = formBuilder.generateAddCardParameters(successUrl, failureUrl, cancelUrl, language, acceptCvcRequired);
        const signature = formContainer.nameValuePairs.find((x) => x.first === 'signature');
        chai_1.assert.isNotNull(signature, 'Form signature should not be null');
        chai_1.assert.startsWith(signature.second, 'SPH1', 'Signature should start with "SPH1"');
        FormConnection_1.FormConnection.postForm(formContainer)
            .then((response) => {
            testRedirectResponse(response, '/tokenize');
            done();
        });
    });
    it('Test with acceptCvcRequired set to true.', (done) => {
        const acceptCvcRequired = false;
        const formContainer = formBuilder.generateAddCardParameters(successUrl, failureUrl, cancelUrl, language, acceptCvcRequired);
        const signature = formContainer.nameValuePairs.find((x) => x.first === 'signature');
        chai_1.assert.isNotNull(signature, 'Form signature should not be null');
        chai_1.assert.startsWith(signature.second, 'SPH1', 'Signature should start with "SPH1"');
        FormConnection_1.FormConnection.postForm(formContainer)
            .then((response) => {
            testRedirectResponse(response, '/tokenize');
            done();
        });
    });
    it('Test add card with all parameters', (done) => {
        const acceptCvcRequired = true;
        const skipFormNotifications = true;
        const exitIframeOnResult = true;
        const exitIframeOn3ds = true;
        const use3ds = true;
        const formContainer = formBuilder.generateAddCardParameters(successUrl, failureUrl, cancelUrl, language, acceptCvcRequired, skipFormNotifications, exitIframeOnResult, exitIframeOn3ds, use3ds);
        testNameValuePairs(formContainer.nameValuePairs, 15);
        FormConnection_1.FormConnection.postForm(formContainer)
            .then((response) => {
            testRedirectResponse(response, '/tokenize');
            done();
        });
    });
    it('Test add card with only 3ds', (done) => {
        const acceptCvcRequired = undefined;
        const skipFormNotifications = undefined;
        const exitIframeOnResult = undefined;
        const exitIframeOn3ds = undefined;
        const use3ds = true;
        const formContainer = formBuilder.generateAddCardParameters(successUrl, failureUrl, cancelUrl, language, acceptCvcRequired, skipFormNotifications, exitIframeOnResult, exitIframeOn3ds, use3ds);
        testNameValuePairs(formContainer.nameValuePairs, 11);
        chai_1.assert(formContainer.nameValuePairs.find((x) => x.first === 'sph-use-three-d-secure').second === 'true', 'sph-use-three-d-secure should be true');
        FormConnection_1.FormConnection.postForm(formContainer)
            .then((response) => {
            testRedirectResponse(response, '/tokenize');
            done();
        });
    });
    it('Test mandatory payment parameters ', (done) => {
        const formContainer = formBuilder.generatePaymentParameters(successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description);
        testNameValuePairs(formContainer.nameValuePairs, 14);
        chai_1.assert(formContainer.nameValuePairs.find((x) => x.first === 'description').second === description, 'Description should be same than given description');
        FormConnection_1.FormConnection.postForm(formContainer)
            .then((response) => {
            testRedirectResponse(response, '/payment');
            done();
        });
    });
    it('Test optional payment parameters', (done) => {
        const skipFormNotifications = true;
        const exitIframeOnResult = true;
        const exitIframeOn3ds = true;
        const use3ds = true;
        const formContainer = formBuilder.generatePaymentParameters(successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description, skipFormNotifications, exitIframeOnResult, exitIframeOn3ds, use3ds);
        testNameValuePairs(formContainer.nameValuePairs, 18);
        FormConnection_1.FormConnection.postForm(formContainer)
            .then((response) => {
            testRedirectResponse(response, '/payment');
            done();
        });
    });
    it('Test mandatory PayWithTokenAndCvc parameters', (done) => {
        const formContainer = formBuilder.generatePayWithTokenAndCvcParameters(cardToken, successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description);
        testNameValuePairs(formContainer.nameValuePairs, 15);
        FormConnection_1.FormConnection.postForm(formContainer)
            .then((response) => {
            testRedirectResponse(response, '/payment_with_token_and_cvc');
            done();
        });
    });
    it('Test optional PayWithTokenAndCvc parameters', (done) => {
        const skipFormNotifications = true;
        const exitIframeOnResult = true;
        const exitIframeOn3ds = true;
        const use3ds = true;
        const formContainer = formBuilder.generatePayWithTokenAndCvcParameters(cardToken, successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description, skipFormNotifications, exitIframeOnResult, exitIframeOn3ds, use3ds);
        testNameValuePairs(formContainer.nameValuePairs, 19);
        FormConnection_1.FormConnection.postForm(formContainer)
            .then((response) => {
            testRedirectResponse(response, '/payment_with_token_and_cvc');
            done();
        });
    });
    it('Test add card and payment parameters with mandatory parameters', (done) => {
        const formContainer = formBuilder.generateAddCardAndPaymentParameters(successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description);
        testNameValuePairs(formContainer.nameValuePairs, 14);
        FormConnection_1.FormConnection.postForm(formContainer)
            .then((response) => {
            testRedirectResponse(response, '/payment');
            done();
        });
    });
    it('Test add card and payment parameters with optional parameters', (done) => {
        const skipFormNotifications = true;
        const exitIframeOnResult = true;
        const exitIframeOn3ds = true;
        const use3ds = true;
        const formContainer = formBuilder.generateAddCardAndPaymentParameters(successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description, skipFormNotifications, exitIframeOnResult, exitIframeOn3ds, use3ds);
        testNameValuePairs(formContainer.nameValuePairs, 18);
        FormConnection_1.FormConnection.postForm(formContainer)
            .then((response) => {
            testRedirectResponse(response, '/payment');
            done();
        });
    });
    it('Test mobilepay form with mandatory parameters', (done) => {
        const formContainer = formBuilder.generatePayWithMobilePayParameters(successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description);
        testNameValuePairs(formContainer.nameValuePairs, 14);
        FormConnection_1.FormConnection.postForm(formContainer)
            .then((response) => {
            chai_1.assert(response.statusCode === 200, 'Response status code should be 200, got ' + response.statusCode);
            done();
        });
    });
    it('Test mobilepay form with optional parameters', (done) => {
        const formContainer = formBuilder.generatePayWithMobilePayParameters(successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description, true);
        testNameValuePairs(formContainer.nameValuePairs, 15);
        FormConnection_1.FormConnection.postForm(formContainer)
            .then((response) => {
            chai_1.assert(response.statusCode === 200, 'Response status code should be 200, got ' + response.statusCode);
            done();
        });
    });
    it('Test 3ds PayWithTokenAndCvc parameters', (done) => {
        const skipFormNotifications = false;
        const exitIframeOnResult = undefined;
        const exitIframeOn3ds = false;
        const use3ds = true;
        const formContainer = formBuilder.generatePayWithTokenAndCvcParameters(cardToken, successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description, skipFormNotifications, exitIframeOnResult, exitIframeOn3ds, use3ds);
        testNameValuePairs(formContainer.nameValuePairs, 18);
        FormConnection_1.FormConnection.postForm(formContainer)
            .then((response) => {
            testRedirectResponse(response, '/payment_with_token_and_cvc');
            done();
        });
    });
    it('Test token debit', (done) => {
        const paymentAPI = new PaymentAPI_1.PaymentAPI(baseUrl, signatureKeyId, signatureSecret, sphAccount, sphMerchant);
        let initResponse;
        const testCardToken = new Token_1.Token(cardToken);
        paymentAPI.initTransaction().then((response) => {
            initResponse = response;
            const transactionRequest = new TransactionRequest_1.TransactionRequest(testCardToken, 9999, 'EUR', orderId);
            return paymentAPI.debitTransaction(initResponse.id, transactionRequest);
        }).then((debitResponse) => {
            chai_1.assert(debitResponse.result.code === 100, 'Request should succeed with code 100, complete response was: ' + JSON.stringify(debitResponse));
            chai_1.assert(debitResponse.result.message === 'OK', 'Request should succeed with message "OK", complete response was: ' + JSON.stringify(debitResponse));
            done();
        });
    });
});
//# sourceMappingURL=FormBuilderTest.js.map