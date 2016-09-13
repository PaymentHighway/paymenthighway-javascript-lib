import {use, assert} from 'chai';
import * as chaiString from 'chai-string';
import {FormBuilder} from '../src/FormBuilder';
import {Method} from '../src/util/Method';
import {Pair} from '../src/util/Pair';
import {FormConnection} from './helpers/FormConnection';

use(chaiString);
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
let formBuilder: FormBuilder;

beforeEach(() => {
    formBuilder = new FormBuilder(method, signatureKeyId, signatureSecret, account, merchant, baseUrl);
});

function testRedirectResponse(response: any, locationEndsWith: string){
    assert(response.statusCode === 303, "Response status code should be 303, got "+ response.statusCode);
    assert.endsWith(response.headers.location, locationEndsWith, "Response should return location to form.");
}

describe('Form builder', () => {
    it('Should have instance of FormBuilder', () => {
        assert.instanceOf(formBuilder, FormBuilder, 'Was not instance of FormBuilder');
    });

    it('Should have right parameters', () => {
        const formContainer = formBuilder.generateAddCardParameters(successUrl, failureUrl, cancelUrl, language);
        assert(formContainer.nameValuePairs.length === 10, 'Should have 10 name value pairs. Got ' + formContainer.nameValuePairs.length);
        assert(formContainer.getAction() === baseUrl + '/form/view/add_card', 'Action url should be ' + baseUrl + '/form/view/add_card' +
            ' got ' + formContainer.getAction());
    });

    it('Test with acceptCvcRequired set to false.', () => {
        const acceptCvcRequired = false;
        const formContainer = formBuilder.generateAddCardParameters(successUrl, failureUrl, cancelUrl, language, acceptCvcRequired);
        const signature: Pair<string, string> = formContainer.nameValuePairs.find((x) => x.first === 'signature');
        assert.isNotNull(signature, 'Form signature should not be null');
        assert.startsWith(signature.second, 'SPH1', 'Signature should start with "SPH1"');
    });

    it('Test with acceptCvcRequired set to true.', (done) => {
        const acceptCvcRequired = false;
        const formContainer = formBuilder.generateAddCardParameters(successUrl, failureUrl, cancelUrl, language, acceptCvcRequired);
        const signature: Pair<string, string> = formContainer.nameValuePairs.find((x) => x.first === 'signature');
        assert.isNotNull(signature, 'Form signature should not be null');
        assert.startsWith(signature.second, 'SPH1', 'Signature should start with "SPH1"');
        FormConnection.postForm(formContainer)
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
        const formContainer = formBuilder.generateAddCardParameters(successUrl, failureUrl, cancelUrl, language,
            acceptCvcRequired, skipFormNotifications, exitIframeOnResult, exitIframeOn3ds, use3ds);
        assert(formContainer.nameValuePairs.length === 15, 'Should have 15 name value pairs. Got ' + formContainer.nameValuePairs.length);
        FormConnection.postForm(formContainer)
            .then((response) => {
                testRedirectResponse(response, '/tokenize');
                done();
            });
    });

    it('Test add card with only 3ds', (done) => {
        const acceptCvcRequired: boolean = undefined;
        const skipFormNotifications: boolean = undefined;
        const exitIframeOnResult: boolean = undefined;
        const exitIframeOn3ds: boolean = undefined;
        const use3ds = true;
        const formContainer = formBuilder.generateAddCardParameters(successUrl, failureUrl, cancelUrl, language,
            acceptCvcRequired, skipFormNotifications, exitIframeOnResult, exitIframeOn3ds, use3ds);
        assert(formContainer.nameValuePairs.length === 11, 'Should have 11 name value pairs. Got ' + formContainer.nameValuePairs.length);
        assert(formContainer.nameValuePairs.find((x) => x.first === 'sph-use-three-d-secure').second === 'true', 'sph-use-three-d-secure should be true');
        FormConnection.postForm(formContainer)
            .then((response) => {
                console.log(response);
                testRedirectResponse(response, '/tokenize');
                done();
            });
    });

    it('Test mandatory payment parameters ',(done) => {
        const amount = 9999;
        const currency = 'EUR';
        const orderId = "1000123A";
        const description = "order description";

        const formContainer = formBuilder.generatePaymentParameters(
            successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description);

        assert(formContainer.nameValuePairs.length === 14, 'Should have 14 name value pairs. Got ' + formContainer.nameValuePairs.length);
        assert(formContainer.nameValuePairs.find((x) => x.first === 'description').second === description, 'Description should be same than given description');
        FormConnection.postForm(formContainer)
            .then((response) => {
                testRedirectResponse(response, '/payment');
                done();
            });
    });

    it('Test optional payment parameters', (done) => {
        const amount = 9999;
        const currency = 'EUR';
        const orderId = "1000123A";
        const description = "order description";
        const skipFormNotifications = true;
        const exitIframeOnResult = true;
        const exitIframeOn3ds = true;

        const formContainer = formBuilder.generatePaymentParameters(
            successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description,
            skipFormNotifications, exitIframeOnResult, exitIframeOn3ds);

        assert(formContainer.nameValuePairs.length === 17, 'Should have 17 name value pairs. Got ' + formContainer.nameValuePairs.length);
        FormConnection.postForm(formContainer)
            .then((response) => {
                testRedirectResponse(response, '/payment');
                done();
            });
    })
});
