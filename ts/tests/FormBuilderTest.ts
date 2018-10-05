import {use, assert} from 'chai';
import {FormBuilder} from '..';
import {Method} from '../src/util/Method';
import {Pair} from '../src/util/Pair';
import {FormConnection} from './helpers/FormConnection';
import {PaymentAPI} from '..';
import * as URI from 'urijs';
import {SecureSigner} from '..';
import {Dictionary} from 'lodash';
import {TransactionRequest} from '..';
import {Token} from '..';
import {TransactionResponse} from '../src/model/response/TransactionResponse';
import * as puppeteer from 'puppeteer';
import * as BluebirdPromise from 'bluebird';

use(require('chai-string'));

const method: Method = 'POST';
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
const webhookSuccessUrl = 'http://example.com/?q=success';
const webhookFailureUrl = 'http://example.com/?q=failure';
const webhookCancelUrl = 'http://example.com/?q=cancel';
const webhookDelay = 0;

let formBuilder: FormBuilder;
let ss: any;
let cardToken: string;

beforeEach(() => {
    ss = new SecureSigner(signatureKeyId, signatureSecret);
    formBuilder = new FormBuilder(method, signatureKeyId, signatureSecret, account, merchant, baseUrl);
});

function testRedirectResponse(response: any, locationEndsWith: string): void {
    assert(response.statusCode === 303, 'Response status code should be 303, got ' + response.statusCode);
    assert.endsWith(response.headers.location, locationEndsWith, 'Response should return location to form.');
}

function testNameValuePairs(nameValuePairs: Pair<string, string>[], rightAmount: number): void {
    assert(nameValuePairs.length === rightAmount, 'Should have ' + rightAmount + ' name value pairs. Got ' + nameValuePairs.length);
}

function testWebhookNameValuePairs(nameValuePairs: Pair<string, string>[], skipDelayTest?: boolean): void {
    const testSuccessUrl = nameValuePairs.find((x) => x.first === 'sph-webhook-success-url').second;
    assert(testSuccessUrl === webhookSuccessUrl, 'sph-webhook-success-url should be ' + webhookSuccessUrl + 'got ' + testSuccessUrl);
    const testFailureUrl = nameValuePairs.find((x) => x.first === 'sph-webhook-failure-url').second;
    assert(testFailureUrl === webhookFailureUrl, 'sph-webhook-failure-url should be ' + webhookFailureUrl + 'got ' + testFailureUrl);
    const testCancelUrl = nameValuePairs.find((x) => x.first === 'sph-webhook-cancel-url').second;
    assert(testCancelUrl === webhookCancelUrl, 'sph-webhook-cancel-url should be ' + webhookCancelUrl + 'got ' + testCancelUrl);
    if (typeof skipDelayTest === 'undefined') {
        const testDelay = nameValuePairs.find((x) => x.first === 'sph-webhook-delay').second;
        assert(testDelay === webhookDelay.toString(), 'sph-webhook-delay should be ' + webhookDelay + 'got ' + testDelay);
    }
}

function assertNameValuePair(nameValuePairs: Pair<string, string>[], key: string, value: string): void {
    const element = nameValuePairs.find((pair) => {
        return pair.first === key;
    });

    assert(element.second === value);
}

describe('Form builder', () => {
    it('Should have instance of FormBuilder', () => {
        assert.instanceOf(formBuilder, FormBuilder, 'Was not instance of FormBuilder');
    });

    it('Should have right parameters', () => {
        const formContainer = formBuilder.generateAddCardParameters(successUrl, failureUrl, cancelUrl, language);
        testNameValuePairs(formContainer.nameValuePairs, 10);
        assert(formContainer.getAction() === baseUrl + '/form/view/add_card', 'Action url should be ' + baseUrl + '/form/view/add_card' +
            ' got ' + formContainer.getAction());
    });

    it('Test tokenize', (done) => {
        const formContainer = formBuilder.generateAddCardParameters(successUrl, failureUrl, cancelUrl, language);
        const paymentAPI = new PaymentAPI(baseUrl, signatureKeyId, signatureSecret, sphAccount, sphMerchant);

        FormConnection.postForm(formContainer)
            .then((response) => {
                assert(response.statusCode === 303, 'Response status code should be 303, got ' + response.statusCode);

                return puppeteer
                    .launch({args: ['--no-sandbox']})
                    .then((browser) => {
                        return browser.newPage().then((page) => {
                            return page
                                .goto(baseUrl + response.headers.location)
                                .then(() => page.type('input[name=card_number_formatted]', '4153 0139 9970 0024'))
                                .then(() => page.type('input[name=expiry]', '11 / 23'))
                                .then(() => page.type('input[name=cvv]', '024'))
                                .then(() => page.screenshot({path: 'example.png'}))
                                .then(() => page.setRequestInterception(true))
                                .then(() => {
                                    return new Promise<void>((resolve, reject) => {
                                        page
                                            .on('request', async (request) => {
                                                if (!request.url().startsWith('https://example.com')) {
                                                    request.continue();
                                                } else {
                                                    const uri = URI.parse(request.url());
                                                    const parameters = <Dictionary<string>> URI.parseQuery(uri.query);
                                                    assert.isTrue(ss.validateFormRedirect(parameters), 'Validate redirect should return true');
                                                    return await paymentAPI
                                                        .tokenization(parameters['sph-tokenization-id'])
                                                        .then((tokenResponse) => {
                                                            assert(tokenResponse.card.expire_year === '2023', 'Expire year should be 2023');
                                                            assert(tokenResponse.card.expire_month === '11', 'Expire month should be 11');
                                                            assert(tokenResponse.card.type === 'Visa', 'Card type should be Visa');
                                                            assert(tokenResponse.card.cvc_required === 'no', 'Should not require CVC');

                                                            cardToken = tokenResponse.card_token;
                                                        })
                                                        .then(() => {
                                                            // Do not respond before token is received
                                                            return request.respond({
                                                                status: 200,
                                                                contentType: 'text/plain',
                                                                body: ''
                                                            });
                                                        })
                                                        .then(() => resolve(browser.close()), error => {
                                                            reject(error);
                                                            return browser.close();
                                                        });
                                                }
                                            })
                                            .click('button[type=submit]')
                                            .then(() => null, error => {
                                                reject(error);
                                                return browser.close();
                                            });
                                    });
                                });
                        }).then(() => {
                            return browser.close();
                        });
                    });
            })
            .then(_ => { done(); }, error => {
                done(error);
            });
    });

    it('Test with acceptCvcRequired set to false.', () => {
        const acceptCvcRequired = false;
        const formContainer = formBuilder.generateAddCardParameters(successUrl, failureUrl, cancelUrl, language, acceptCvcRequired);
        const signature: Pair<string, string> = formContainer.nameValuePairs.find((x) => x.first === 'signature');
        assert.isNotNull(signature, 'Form signature should not be null');
        assert.startsWith(signature.second, 'SPH1', 'Signature should start with "SPH1"');
        return FormConnection.postForm(formContainer)
            .then((response) => {
                testRedirectResponse(response, '/tokenize');
            });
    });

    it('Test with acceptCvcRequired set to true.', () => {
        const acceptCvcRequired = false;
        const formContainer = formBuilder.generateAddCardParameters(successUrl, failureUrl, cancelUrl, language, acceptCvcRequired);
        const signature: Pair<string, string> = formContainer.nameValuePairs.find((x) => x.first === 'signature');
        assert.isNotNull(signature, 'Form signature should not be null');
        assert.startsWith(signature.second, 'SPH1', 'Signature should start with "SPH1"');
        return FormConnection.postForm(formContainer)
            .then((response) => {
                testRedirectResponse(response, '/tokenize');
            });
    });

    it('Test add card with all parameters', () => {
        const acceptCvcRequired = true;
        const skipFormNotifications = true;
        const exitIframeOnResult = true;
        const exitIframeOn3ds = true;
        const use3ds = true;
        const formContainer = formBuilder.generateAddCardParameters(successUrl, failureUrl, cancelUrl, language,
            acceptCvcRequired, skipFormNotifications, exitIframeOnResult, exitIframeOn3ds, use3ds);
        testNameValuePairs(formContainer.nameValuePairs, 15);
        return FormConnection.postForm(formContainer)
            .then((response) => {
                testRedirectResponse(response, '/tokenize');
            });
    });

    it('Test add card with only 3ds', () => {
        const acceptCvcRequired: boolean = undefined;
        const skipFormNotifications: boolean = undefined;
        const exitIframeOnResult: boolean = undefined;
        const exitIframeOn3ds: boolean = undefined;
        const use3ds = true;
        const formContainer = formBuilder.generateAddCardParameters(successUrl, failureUrl, cancelUrl, language,
            acceptCvcRequired, skipFormNotifications, exitIframeOnResult, exitIframeOn3ds, use3ds);
        testNameValuePairs(formContainer.nameValuePairs, 11);
        assert(formContainer.nameValuePairs.find((x) => x.first === 'sph-use-three-d-secure').second === 'true', 'sph-use-three-d-secure should be true');
        return FormConnection.postForm(formContainer)
            .then((response) => {
                testRedirectResponse(response, '/tokenize');
            });
    });

    it('Test mandatory payment parameters ', () => {
        const formContainer = formBuilder.generatePaymentParameters(
            successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description);

        testNameValuePairs(formContainer.nameValuePairs, 14);
        assert(formContainer.nameValuePairs.find((x) => x.first === 'description').second === description, 'Description should be same than given description');
        return FormConnection.postForm(formContainer)
            .then((response) => {
                testRedirectResponse(response, '/payment');
            });
    });

    it('Test optional payment parameters', () => {
        const skipFormNotifications = true;
        const exitIframeOnResult = true;
        const exitIframeOn3ds = true;
        const use3ds = true;
        const showPaymentMethodSelector = true;
        const formContainer = formBuilder.generatePaymentParameters(
            successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description,
            skipFormNotifications, exitIframeOnResult, exitIframeOn3ds, use3ds, undefined, undefined, undefined, undefined, showPaymentMethodSelector);

        testNameValuePairs(formContainer.nameValuePairs, 19);
        return FormConnection.postForm(formContainer)
            .then((response) => {
                testRedirectResponse(response, '/select_payment_method');
            });
    });

    it('Test mandatory PayWithTokenAndCvc parameters', () => {
        assert(cardToken !== undefined, 'Token isn\'t resolved yet');

        const formContainer = formBuilder.generatePayWithTokenAndCvcParameters(
            cardToken, successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description);
        testNameValuePairs(formContainer.nameValuePairs, 15);
        return FormConnection.postForm(formContainer)
            .then((response) => {
                testRedirectResponse(response, '/payment_with_token_and_cvc');
            });
    });

    it('Test optional PayWithTokenAndCvc parameters', () => {
        assert(cardToken !== undefined, 'Token isn\'t resolved yet');

        const skipFormNotifications = true;
        const exitIframeOnResult = true;
        const exitIframeOn3ds = true;
        const use3ds = true;
        const formContainer = formBuilder.generatePayWithTokenAndCvcParameters(
            cardToken, successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description,
            skipFormNotifications, exitIframeOnResult, exitIframeOn3ds, use3ds);
        testNameValuePairs(formContainer.nameValuePairs, 19);
        return FormConnection.postForm(formContainer)
            .then((response) => {
                testRedirectResponse(response, '/payment_with_token_and_cvc');
            });
    });

    it('Test add card and payment parameters with mandatory parameters', () => {
        const formContainer = formBuilder.generateAddCardAndPaymentParameters(successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description);
        testNameValuePairs(formContainer.nameValuePairs, 14);
        return FormConnection.postForm(formContainer)
            .then((response) => {
                testRedirectResponse(response, '/payment');
            });
    });

    it('Test add card and payment parameters with optional parameters', () => {
        const skipFormNotifications = true;
        const exitIframeOnResult = true;
        const exitIframeOn3ds = true;
        const use3ds = true;

        const formContainer = formBuilder.generateAddCardAndPaymentParameters(successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description,
            skipFormNotifications, exitIframeOnResult, exitIframeOn3ds, use3ds);
        testNameValuePairs(formContainer.nameValuePairs, 18);
        return FormConnection.postForm(formContainer)
            .then((response) => {
                testRedirectResponse(response, '/payment');
            });
    });

    it('Test mobilepay form with mandatory parameters', () => {
        const formContainer = formBuilder.generatePayWithMobilePayParameters(successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description);
        testNameValuePairs(formContainer.nameValuePairs, 14);
        return FormConnection.postForm(formContainer)
            .then((response) => {
                assert(response.statusCode === 200, 'Response status code should be 200, got ' + response.statusCode);
            });
    });

    it('Test mobilepay form with optional parameters', () => {
        const formContainer = formBuilder.generatePayWithMobilePayParameters(successUrl, failureUrl, cancelUrl, language,
            amount, currency, orderId, description, true, 'https://foo.bar', '+35844123465', 'Jaskan kello', '12345678', 'submerchantName');
        testNameValuePairs(formContainer.nameValuePairs, 20);
        return FormConnection.postForm(formContainer).then((response) => {
            assert(response.statusCode === 200, 'Response status code should be 200, got ' + response.statusCode);
        });
    });

    it('Test 3ds PayWithTokenAndCvc parameters', () => {
        assert(cardToken !== undefined, 'Token isn\'t resolved yet');

        const skipFormNotifications = false;
        const exitIframeOnResult: boolean = undefined;
        const exitIframeOn3ds = false;
        const use3ds = true;
        const formContainer = formBuilder.generatePayWithTokenAndCvcParameters(
            cardToken, successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description,
            skipFormNotifications, exitIframeOnResult, exitIframeOn3ds, use3ds);
        testNameValuePairs(formContainer.nameValuePairs, 18);
        return FormConnection.postForm(formContainer)
            .then((response) => {
                testRedirectResponse(response, '/payment_with_token_and_cvc');
            });
    });

    it('Test token debit', () => {
        assert(cardToken !== undefined, 'Token isn\'t resolved yet');

        const paymentAPI = new PaymentAPI(baseUrl, signatureKeyId, signatureSecret, sphAccount, sphMerchant);
        let initResponse: TransactionResponse;
        const testCardToken = new Token(cardToken);
        return paymentAPI.initTransaction().then((response) => {
            initResponse = response;
            const transactionRequest = new TransactionRequest(testCardToken, 9999, 'USD', orderId);
            return paymentAPI.debitTransaction(initResponse.id, transactionRequest);
        }).then((debitResponse) => {
            assert(debitResponse.result.code === 100, 'Request should succeed with code 100, complete response was: ' + JSON.stringify(debitResponse));
            assert(debitResponse.result.message === 'OK', 'Request should succeed with message "OK", complete response was: ' + JSON.stringify(debitResponse));
        });
    });

    it('Test masterpass form with mandatory parameters', () => {
        const formContainer = formBuilder.generateMasterPassParameters(successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description);
        testNameValuePairs(formContainer.nameValuePairs, 14);
        return FormConnection.postForm(formContainer)
            .then((response) => {
                assert(response.statusCode === 303, 'Response status code should be 303, got ' + response.statusCode);
                assert.match(response.headers.location, /\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/masterpass/, 'redirect location doesn\'t match ' + response.header);
            });
    });

    it('Test masterpass form with optional parameters', () => {
        const formContainer = formBuilder.generateMasterPassParameters(successUrl, failureUrl, cancelUrl, language,
            amount, currency, orderId, description, true,
            undefined, undefined, undefined, undefined,
            undefined, undefined, undefined, true);
        testNameValuePairs(formContainer.nameValuePairs, 16);
        return FormConnection.postForm(formContainer)
            .then((response) => {
                assert(response.statusCode === 303, 'Response status code should be 303, got ' + response.statusCode);
                assert.match(response.headers.location, /\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/masterpass/, 'redirect location doesn\'t match ' + response.header);
            });
    });

    it('Test siirto form with mandatory parameters', () => {
        const referenceNumber = '1313';
        const formContainer = formBuilder.generateSiirtoParameters(successUrl, failureUrl, cancelUrl, language, amount, orderId, description, referenceNumber);
        testNameValuePairs(formContainer.nameValuePairs, 15);
        return FormConnection.postForm(formContainer)
            .then((response) => {
                assert(response.statusCode === 303, 'Response status code should be 303, got ' + response.statusCode);
                assert.match(response.headers.location, /\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/siirto/, 'redirect location doesn\'t match ' + response.header);
            });
    });

    it('Test siirto form with optional parameters', () => {
        const phoneNumber = '+358441234567';
        const referenceNumber = '1313';
        const formContainer = formBuilder.generateSiirtoParameters(successUrl, failureUrl, cancelUrl, language, amount, orderId, description, referenceNumber, phoneNumber);
        testNameValuePairs(formContainer.nameValuePairs, 16);
        return FormConnection.postForm(formContainer)
            .then((response) => {
                assert(response.statusCode === 303, 'Response status code should be 303, got ' + response.statusCode);
                assert.match(response.headers.location, /\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\/siirto/, 'redirect location doesn\'t match ' + response.header);
            });
    });

    it('Test add card webhook parameters', () => {
        const formContainer = formBuilder.generateAddCardParameters(
            successUrl, failureUrl, cancelUrl, language, undefined, undefined, undefined, undefined, undefined,
            webhookSuccessUrl, webhookFailureUrl, webhookCancelUrl, webhookDelay);

        testNameValuePairs(formContainer.nameValuePairs, 14);
        testWebhookNameValuePairs(formContainer.nameValuePairs);
    });

    it('Test payment webhook parameters', () => {
        const formContainer = formBuilder.generatePaymentParameters(
            successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description,
            undefined, undefined, undefined, undefined, webhookSuccessUrl, webhookFailureUrl,
            webhookCancelUrl, webhookDelay);

        testNameValuePairs(formContainer.nameValuePairs, 18);
        testWebhookNameValuePairs(formContainer.nameValuePairs);
    });

    it('Test add card and payment webhook parameters', () => {
        const formContainer = formBuilder.generateAddCardAndPaymentParameters(
            successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description,
            undefined, undefined, undefined, undefined, webhookSuccessUrl, webhookFailureUrl,
            webhookCancelUrl, webhookDelay);

        testNameValuePairs(formContainer.nameValuePairs, 18);
        testWebhookNameValuePairs(formContainer.nameValuePairs);
    });

    it('Test pay with token and cvc webhook parameters', () => {
        const token = '123';
        const formContainer = formBuilder.generatePayWithTokenAndCvcParameters(
            token, successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description,
            undefined, undefined, undefined, undefined, webhookSuccessUrl, webhookFailureUrl,
            webhookCancelUrl, webhookDelay);

        testNameValuePairs(formContainer.nameValuePairs, 19);
        testWebhookNameValuePairs(formContainer.nameValuePairs);
    });

    it('Test mobilepay webhook parameters', () => {
        const formContainer = formBuilder.generatePayWithMobilePayParameters(successUrl, failureUrl, cancelUrl, language,
            amount, currency, orderId, description, undefined, undefined, undefined, undefined, undefined, undefined,
            webhookSuccessUrl, webhookFailureUrl, webhookCancelUrl, webhookDelay);

        testNameValuePairs(formContainer.nameValuePairs, 18);
        testWebhookNameValuePairs(formContainer.nameValuePairs);
    });

    it('Test masterpass webhook parameters', () => {
        const formContainer = formBuilder.generateMasterPassParameters(
            successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description,
            undefined, undefined, undefined, undefined, webhookSuccessUrl, webhookFailureUrl,
            webhookCancelUrl, webhookDelay);

        testNameValuePairs(formContainer.nameValuePairs, 18);
        testWebhookNameValuePairs(formContainer.nameValuePairs);
    });

    it('Test webhook parameters without delay', () => {
        const formContainer = formBuilder.generatePaymentParameters(
            successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description,
            undefined, undefined, undefined, undefined, webhookSuccessUrl, webhookFailureUrl,
            webhookCancelUrl);

        testNameValuePairs(formContainer.nameValuePairs, 17);
        testWebhookNameValuePairs(formContainer.nameValuePairs, true);
    });

    it('Test pivo mandatory parameters', () => {
        const formContainer = formBuilder.generatePivoParameters(
            successUrl, failureUrl, cancelUrl, language, amount, orderId, description);

        testNameValuePairs(formContainer.nameValuePairs, 14);
        const actionUrl = '/form/view/pivo';
        return FormConnection.postForm(formContainer)
            .then((response) => {
                assert(response.statusCode === 303, 'Response status code should be 303, got ' + response.statusCode);
                assert.match(response.headers.location, /https:\/\/qa-maksu.pivo.fi\/api\/payments\//, 'redirect location doesn\'t match ' + response.header);
            });
    });

    it('Test pivo optional parameters', () => {
        const phoneNumber = '+358444160589';
        const referenceNumber = '1313';
        const appUrl = 'myapp://url';

        const formContainer = formBuilder.generatePivoParameters(
            successUrl, failureUrl, cancelUrl, language, amount, orderId, description, referenceNumber, phoneNumber,
            appUrl);

        testNameValuePairs(formContainer.nameValuePairs, 17);
        assertNameValuePair(formContainer.nameValuePairs, 'sph-phone-number', phoneNumber);
        assertNameValuePair(formContainer.nameValuePairs, 'sph-reference-number', referenceNumber);
        assertNameValuePair(formContainer.nameValuePairs, 'sph-app-url', appUrl);
        return FormConnection.postForm(formContainer)
            .then((response) => {
                assert(response.statusCode === 303, 'Response status code should be 303, got ' + response.statusCode);
                assert.match(response.headers.location, /https:\/\/qa-maksu.pivo.fi\/api\/payments\//, 'redirect location doesn\'t match ' + response.header);
            });
    });

    it('Test pivo app url', () => {
        const formContainer = formBuilder.generatePivoParameters(
            successUrl, failureUrl, cancelUrl, language, amount, orderId, description, '+358444160589', undefined, 'myapp://url');

        testNameValuePairs(formContainer.nameValuePairs, 16);
        const actionUrl = '/form/view/pivo';
        assert(formContainer.actionUrl === actionUrl, 'action url should be ' + actionUrl + 'got ' + formContainer.actionUrl);
    });
});
