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
import {MasterpassTransactionRequest} from '../src/model/request/MasterpassTransactionRequest';
import {PaymentData} from '../src/model/request/applepay/PaymentData';
import {ApplePayTransaction, ApplePayTransactionRequest} from '../src/model/request/ApplePayTransactionRequest';
import {MobilePayInitRequest} from '../src/model/request/MobilePayInitRequest';

let api: PaymentAPI;
let validCard: any;
let testCard: Card;

beforeEach(() => {
    api = new PaymentAPI('https://v1-hub-staging.sph-test-solinor.com/', 'testKey', 'testSecret', 'test', 'test_merchantId');
    testCard = new Card('4153013999700024', '2023', '11', '024');
    validCard = {
        card: testCard,
        amount: 99,
        currency: 'EUR',
        blocking: true,
        orderId: PaymentHighwayUtility.createRequestId()
    };
});

function createDebitTransaction(orderId?: string, commit?: boolean): PromiseLike<TransactionResponse> {
    let initResponse: TransactionResponse;

    return api.initTransaction().then((response) => {
        initResponse = response;
        let transactionRequest = new TransactionRequest(testCard, 9999, 'EUR', orderId);
        if (typeof commit !== 'undefined') {
            transactionRequest.commit = commit;
        }
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
        createDebitTransaction().then((body) => {
            assert.isNotNull(body.id, 'Transaction id not received');
            done();
        });
    });

    it('Test commit transaction', (done) => {
        const commitRequest = new CommitTransactionRequest(9999, 'EUR');
        let transactionId: string;
        createDebitTransaction('12345ABC', false)
            .then((initResponse) => {
                transactionId = initResponse.id;
                return api.commitTransaction(transactionId, commitRequest);
            })
            .then((commitResponse) => {
                checkResult(commitResponse);
                assert(commitResponse.card.type === 'Visa', 'Card type should be "Visa"' + printResult(commitResponse));
                assert(commitResponse.card.cvc_required === 'not_tested', 'Test card should return cvc_required = not_tested' + printResult(commitResponse));
                assert(commitResponse.recurring === false, 'Transaction should have recurring as false.' + printResult(commitResponse));
                return api.transactionResult(transactionId);
            })
            .then((resultResponse) => {
                assert(resultResponse.recurring === false, 'Transaction result should have recurring false.' + printResult(resultResponse));
                checkResult(resultResponse);
                done();
            });
    });

    it('Test uncommitted transaction', (done) => {
        let transactionId: string;
        createDebitTransaction('12345DEF', false)
            .then((initResponse) => {
                transactionId = initResponse.id;

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
                assert(searchResponse.transactions[0].recurring === false, 'Transaction should have recurring false' + printResult(searchResponse));
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
        const testCardTokenizeOkPaymentFails = new Card('4153013999700156', '2023', '11', '156');
        const orderId = PaymentHighwayUtility.createRequestId();
        let transactionResponse: TransactionResponse;
        api.initTransaction()
            .then((response) => {
                transactionResponse = response;
                const transactionRequest = new TransactionRequest(testCardTokenizeOkPaymentFails, 9999, 'EUR', orderId);
                return api.debitTransaction(transactionResponse.id, transactionRequest);
            })
            .then((debitResponse) => {
                assert(debitResponse.result.code === 200, 'Authorization should fail (code 200), got ' + debitResponse.result.code);
                assert(debitResponse.result.message === 'Authorization failed', 'Authorization should fail');
                return api.transactionResult(transactionResponse.id);
            })
            .then((resultResponse) => {
                assert(resultResponse.result.code === 200, 'Authorization should fail (code 200), got ' + resultResponse.result.code);
                return api.transactionStatus(transactionResponse.id);
            })
            .then((statusResponse) => {
                assert(statusResponse.transaction.committed === false, 'Committed should be false, got' + statusResponse.transaction.committed);
                done();
            });
    });

    it('Test Masterpass transaction', (done) => {
        const preGeneratedMasterpassTransaction = '327c6f29-9b46-40b9-b85b-85e908015d92';

        api.userProfile(preGeneratedMasterpassTransaction)
            .then((userProfileResponse) => {
                checkResult(userProfileResponse);

                const masterpass = userProfileResponse.masterpass;
                assert(masterpass.amount === 100);
                assert(masterpass.currency === 'EUR');
                assert(masterpass.masterpass_wallet_id === '101');

                const profile = userProfileResponse.profile;
                assert(profile.email_address === 'matti.meikalainen@gmail.com');
                assert.isNotNull(profile.billing_address);
                assert(profile.billing_address.country === 'FI');
                assert.isNotNull(profile.shipping_address);
                assert(profile.shipping_address.country === 'FI');

                const request = new MasterpassTransactionRequest(50, 'EUR');
                return api.debitMasterpassTransaction(preGeneratedMasterpassTransaction, request);
            })
            .then((debitResponse) => {
                checkResult(debitResponse);

                done();
            })
    });

    it('Test Apple Pay request builders', () => {
        let amount = 100;
        let currency = 'EUR';

        let paymentToken: PaymentData = JSON.parse('{ "data": "ABCD", "header": { "ephemeralPublicKey": "XYZ", "publicKeyHash": "13579", "transactionId": "24680" }, "signature": "ABCDXYZ0000", "version": "EC_v1" }');
        assert.strictEqual(paymentToken.data, 'ABCD', 'Data was not equal to ABCD');

        let withStaticBuilder = ApplePayTransactionRequest.Builder(paymentToken, amount, currency).build();
        let withRequestBuilder = new ApplePayTransaction.RequestBuilder(paymentToken, amount, currency).build();

        assert.deepEqual(withStaticBuilder, withRequestBuilder, 'results differ from builder');

        let requestWithCommit = ApplePayTransactionRequest.Builder(paymentToken, amount, currency).setCommit(true).build();
        assert.notDeepEqual(withStaticBuilder, requestWithCommit, 'requests should differ if commit is added');

        assert(withStaticBuilder.amount === 100);
    });

    it('Test Apple Pay validators', () => {
        let amount = 100;
        let currency = 'EUR';

        // Syntax is valid, but content will fail
        let paymentToken: PaymentData = JSON.parse('{ "data": "ABCD", "header": { "ephemeralPublicKey": "XYZ=", "publicKeyHash": "13579ABC", "transactionId": "0002040608" }, "signature": "ABCD13579ABC", "version": "EC_v1" }');

        return api.initTransaction()
            .then((response) => {
                const request = ApplePayTransactionRequest.Builder(paymentToken, amount, currency).build();
                return api.debitApplePayTransaction(response.id, request);
            })
            .then((debitResponse) => {
                assert(debitResponse.result.code === 900, 'Authorization should fail (code 900), got ' + debitResponse.result.code);
                assert.equal(debitResponse.result.message, 'ERROR', 'Authorization should fail with ERROR, validation should succeed');
            })
    });

    it( 'Test MobilePay app flow init @external', () => {
        const request = MobilePayInitRequest.Builder(100, 'EUR')
            .setOrder(PaymentHighwayUtility.createRequestId())
            .setReturnUri('myapp://paid')
            .setWebhookSuccessUrl('https://myserver.com/success')
            .setWebhookCancelUrl('https://myserver.com/cancel')
            .setWebhookFailureUrl('https://myserver.com/failure')
            .build()

        return api.initMobilePaySession(request).then((response) => {
           assert.isNotNull(response.uri);
           assert.isNotNull(response.session_token);
           assert.isNotNull(response.valid_until);
           assert.containIgnoreCase(response.uri, response.session_token, 'Returned app URI should contain session token.');
        })
    });

    it('Test MobilePay app flow session status @external', () => {
        const request = MobilePayInitRequest.Builder(100, 'EUR')
            .setOrder(PaymentHighwayUtility.createRequestId())
            .setReturnUri('myapp://paid')
            .setWebhookSuccessUrl('https://myserver.com/success')
            .setWebhookCancelUrl('https://myserver.com/cancel')
            .setWebhookFailureUrl('https://myserver.com/failure')
            .build()

        return api.initMobilePaySession(request).then((initResponse) => {
            api.mobilePaySessionStatus(initResponse.session_token).then((response) => {
                assert.equal(response.status, 'in_progress');
                assert.equal(response.valid_until, initResponse.valid_until, 'Both init and status check should have same valid until value.');
                assert.isNull(response.transaction_id);
            });
        })
    });
});
