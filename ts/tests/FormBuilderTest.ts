import {use, assert} from 'chai';
import {FormBuilder} from '..';
import {Method} from '../src/util/Method';
import {FormConnection} from './helpers/FormConnection';
import {PaymentAPI} from '..';
import * as URI from 'urijs';
import {SecureSigner} from '..';
import {Dictionary} from 'lodash';
import * as puppeteer from 'puppeteer';

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
const sphAccount = 'test';
const sphMerchant = 'test_merchantId';

let formBuilder: FormBuilder;
let ss: any;

beforeEach(() => {
    ss = new SecureSigner(signatureKeyId, signatureSecret);
    formBuilder = new FormBuilder(method, signatureKeyId, signatureSecret, account, merchant, baseUrl);
});

const hubHostname: String = URI.parse(baseUrl).hostname;
let hubServerRegexp: RegExp;

describe('Form builder', () => {

    before(() => {
        hubServerRegexp = new RegExp('^https:\\/\\/(([^.]+).cloudfront.net|' + hubHostname + ').*');
    });

    it('Should have instance of FormBuilder', () => {
        assert.instanceOf(formBuilder, FormBuilder, 'Was not instance of FormBuilder');
    });

    const abortWhenNonHubUrl = (request: puppeteer.Request) => {
        if (hubServerRegexp.test(request.url())) {
            return request.continue();
        } else {
            return request.abort();
        }
    };

    const emptyOkWhenNonHubUrl = (request: puppeteer.Request) => {
        if (hubServerRegexp.test(request.url())) {
            return request.continue();
        } else {
            return request.respond({
                status: 200,
                contentType: 'text/plain',
                body: ''
            });
        }
    };

    it('Test tokenize', (done) => {
        const formContainer = formBuilder.generateAddCardParameters(successUrl, failureUrl, cancelUrl, language);
        const paymentAPI = new PaymentAPI(baseUrl, signatureKeyId, signatureSecret, sphAccount, sphMerchant);

        FormConnection.postForm(formContainer)
            .then((response) => {
                assert(response.statusCode === 303, 'Response status code should be 303, got ' + response.statusCode);

                return puppeteer
                    .launch({ args: ['--no-sandbox'] })
                    .then((browser) => {
                        return browser.newPage().then((page) => {
                            return page.setRequestInterception(true)
                                .then(() => page.on('request', abortWhenNonHubUrl) )
                                .then(() =>
                                    Promise.all([
                                        page.waitForNavigation({ waitUntil: 'networkidle0' }),
                                        page.goto(baseUrl + response.headers.location, { waitUntil: 'load' })
                                    ])
                                )
                                .then(() => Promise.all([
                                    page.type('input[name=card_number_formatted]', '4153 0139 9970 0024')
                                        .then(() => page.type('input[name=expiry]', '11 / 23'))
                                        .then( () => page.type('input[name=cvv]', '024')),
                                    // Waiting card logo!!!
                                    page.waitForResponse('https://d1kc0e613bxbjg.cloudfront.net/images/form/visa_pos_fc.png')
                                ]))
                                .then(() => page.screenshot({path: 'example.png'}))
                                .then(() =>
                                    page.removeListener('request', abortWhenNonHubUrl)
                                        // required for page.click and returning non 404
                                        .on('request', emptyOkWhenNonHubUrl)
                                )
                                .then(() => {
                                    return Promise
                                        .all([
                                            page.waitForRequest(request => {
                                                return request.url().startsWith('https://example.com');
                                            }),
                                            page.click('button[type=submit]')
                                        ]).then(([request, _]) => {
                                            assert.isTrue(
                                                request.url().startsWith(successUrl),
                                                'Final request url didn\'t start with ' + successUrl
                                            );

                                            const uri = URI.parse(request.url());
                                            const parameters = <Dictionary<string>> URI.parseQuery(uri.query);
                                            assert.isTrue(ss.validateFormRedirect(parameters), 'Validate redirect should return true');
                                            return paymentAPI
                                                .tokenization(parameters['sph-tokenization-id'])
                                                .then((tokenResponse) => {
                                                    assert(tokenResponse.card.expire_year === '2023', 'Expire year should be 2023');
                                                    assert(tokenResponse.card.expire_month === '11', 'Expire month should be 11');
                                                    assert(tokenResponse.card.type === 'Visa', 'Card type should be Visa');
                                                    assert(tokenResponse.card.cvc_required === 'no', 'Should not require CVC');

                                                    return tokenResponse.card_token;
                                                });
                                        });
                                });
                        }).then(result => {
                            return browser.close().then( () => result);
                        }, error => {
                            return browser.close().then(() => assert.ifError(error) );
                        });
                    });
            })
            .then(() => { done(); }, error => {
                done(error);
            });
    });
});
