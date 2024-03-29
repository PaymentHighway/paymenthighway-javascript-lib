import {assert, expect, use} from 'chai';
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
import {PaymentData} from '../src/model/request/applepay/PaymentData';
import {ApplePayTransaction, ApplePayTransactionRequest} from '../src/model/request/ApplePayTransactionRequest';
import {MobilePayInitRequest} from '../src/model/request/MobilePayInitRequest';
import {Splitting} from '../src/model/Splitting';
import {ChargeMitRequest} from '../src/model/request/ChargeMitRequest';
import {ChargeCitRequest} from '../src/model/request/ChargeCitRequest';
import {ChallengeWindowSize, StrongCustomerAuthentication} from '../src/model/request/sca/StrongCustomerAuthentication';
import {ReturnUrls} from '../src/model/request/sca/ReturnUrls';
import {CustomerDetails} from '../src/model/request/sca/CustomerDetails';
import {PhoneNumber} from '../src/model/request/sca/PhoneNumber';
import {
    AccountAgeIndicator,
    AccountInformationChangeIndicator,
    AccountPasswordChangeIndicator,
    CustomerAccount,
    ShippingAddressFirstUsedIndicator,
    SuspiciousActivityIndicator
} from '../src/model/request/sca/CustomerAccount';
import {
    DeliveryTimeFrame,
    PreOrderPurchaseIndicator,
    Purchase,
    ReorderItemsIndicator,
    ShippingIndicator,
    ShippingNameIndicator
} from '../src/model/request/sca/Purchase';
import {Address} from '../src/model/request/sca/Address';
import {Request} from '../src/model/request/PhRequest';
import {CustomerAuthenticationInfo, Method} from '../src/model/request/sca/CustomerAuthenticationInfo';
import {PivoInitRequest} from '../src/model/request/PivoInitRequest';
import {FormBuilder} from '../src/FormBuilder'
import { FormConnection } from './helpers/FormConnection';

use(require('chai-string'));

let api: PaymentAPI;
let validCard: any;
let testCard: Card;
let scaSoftDeclineCard: Card;

const baseUrl = 'https://v1-hub-staging.sph-test-solinor.com/';
const signatureKeyId = 'testKey';
const signatureSecret = 'testSecret';
const account = 'test';
const merchant = 'test_merchantId';

beforeEach(() => {
    api = new PaymentAPI(baseUrl, signatureKeyId, signatureSecret, account, merchant);
    testCard = new Card('4153013999700024', '2023', '11', '024');
    validCard = {
        card: testCard,
        amount: 99,
        currency: 'EUR',
        blocking: true,
        orderId: PaymentHighwayUtility.createRequestId()
    };
    scaSoftDeclineCard = new Card('4153013999701162', '2023', '11', '162');
});

function createDebitTransaction(orderId?: string, commit?: boolean, splitting?: Splitting, referenceNumber?: string): PromiseLike<TransactionResponse> {
    let initResponse: TransactionResponse;

    return api.initTransaction().then((response) => {
        initResponse = response;
        let transactionRequest = new TransactionRequest(testCard, 9999, 'EUR', orderId, undefined, commit, splitting, referenceNumber);

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

function getFullStrongCustomerAuthenticationData(): StrongCustomerAuthentication {

    const returnUrls = ReturnUrls.Builder(
        'https://example.com/success',
        'https://example.com/cancel',
        'https://example.com/failure'
    ).setWebhookSuccessUrl('https://example.com/webhook/success')
        .setWebhookCancelUrl('https://example.com/webhook/cancel')
        .setWebhookFailureUrl('https://example.com/webhook/failure')
        .setWebhookDelay(0)
        .build();

    const customerDetails = CustomerDetails.Builder()
        .setShippingAddressMatchesBillingAddress(true)
        .setName('Eric Example')
        .setEmail('eric.example@example.com')
        .setHomePhone(new PhoneNumber('358', '123456789'))
        .setMobilePhone(new PhoneNumber('358', '441234566'))
        .setWorkPhone(new PhoneNumber('358', '441234566'))
        .build();

    const customerAccount = CustomerAccount.Builder()
        .setAccountAgeIndicator(AccountAgeIndicator.MoreThan60Days)
        .setAccountDate('2018-07-05')
        .setChangeIndicator(AccountInformationChangeIndicator.MoreThan60Days)
        .setChangeDate('2018-09-11')
        .setPasswordChangeIndicator(AccountPasswordChangeIndicator.NoChange)
        .setPasswordChangeDate('2018-07-05')
        .setNumberOfRecentPurchases(7)
        .setNumberOfAddCardAttemptsDay(1)
        .setNumberOfTransactionActivityDay(3)
        .setNumberOfTransactionActivityYear(8)
        .setShippingAddressIndicator(ShippingAddressFirstUsedIndicator.Between30And60Days)
        .setShippingAddressUsageDate('2019-07-01')
        .setSuspiciousActivity(SuspiciousActivityIndicator.NoSuspiciousActivity)
        .build();

    const purchase = Purchase.Builder()
        .setShippingIndicator(ShippingIndicator.ShipToCardholdersAddress)
        .setDeliveryTimeFrame(DeliveryTimeFrame.SameDayShipping)
        .setDeliveryEmail('eric.example@example.com')
        .setReorderItemsIndicator(ReorderItemsIndicator.FirstTimeOrdered)
        .setPreOrderPurchaseIndicator(PreOrderPurchaseIndicator.MerchandiseAvailable)
        .setPreOrderDate('2019-08-20')
        .setShippingNameIndicator(ShippingNameIndicator.AccountNameMatchesShippingName)
        .setGiftCardAmount(200)
        .setGiftCardCount(7)
        .build();

    const billingAddress = Address.Builder()
        .setCity('Helsinki')
        .setCountry('246')
        .setAddressLine1('Arkadiankatu 1')
        .setAddressLine2('')
        .setAddressLine3('')
        .setPostCode('00101')
        .setState('18')
        .build();

    const shippingAddress = Address.Builder()
        .setCity('Helsinki')
        .setCountry('246')
        .setAddressLine1('Arkadiankatu 1')
        .setAddressLine2('')
        .setAddressLine3('')
        .setPostCode('00101')
        .setState('18')
        .build();

    const customerAuthenticationInfo = CustomerAuthenticationInfo.Builder()
        .setMethod(Method.OwnCredentials)
        .build();

    return StrongCustomerAuthentication.Builder(returnUrls)
        .setCustomerDetails(customerDetails)
        .setCustomerAccount(customerAccount)
        .setPurchase(purchase)
        .setBillingAddress(billingAddress)
        .setShippingAddress(shippingAddress)
        .setCustomerAuthenticationInfo(customerAuthenticationInfo)
        .setDesiredChallengeWindowSize(ChallengeWindowSize.Window600x400)
        .setExitIframeOnResult(false)
        .setExitIframeOnThreeDSecure(false)
        .build();
}

describe('PaymentAPI', () => {
    it('Should have instance of PaymentHighwayAPI', () => {
        assert.instanceOf(api, PaymentAPI, 'Was not instance of PaymentAPI');
    });

    it('Test init transaction', () => {
        return api.initTransaction().then((body) => {
            checkResult(body);
            assert.isNotNull(body.id, 'Transaction init should return id');
        });
    });

    it('Test debit transaction', () => {
        return createDebitTransaction().then((body) => {
            assert.isNotNull(body.id, 'Transaction id not received');
        });
    });

    it('Test charge merchant initiated transaction', async () => {
        const initResponse = await api.initTransaction();

        const chargeMitRequest = ChargeMitRequest.Builder(9999, 'EUR', 'order1')
            .setCard(testCard)
            .build();
        const chargeResponse = await api.chargeMerchantInitiatedTransaction(initResponse.id, chargeMitRequest);

        checkResult(chargeResponse);
    });

    it('Test charge merchant initiated transaction should throw an exception if card or token is not defined', async () => {
        expect(() => ChargeMitRequest.Builder(9999, 'EUR', 'order1').build())
            .to.throw('Either card or token must be defined');
    });

    it('Test charge customer initiated transaction', async () => {
        const initResponse = await api.initTransaction();

        const strongCustomerAuthentication = StrongCustomerAuthentication.Builder(
            ReturnUrls.Builder(
                'https://example.com/success',
                'https://example.com/cancel',
                'https://example.com/failure'
            ).build()
        ).build();

        const chargeCitRequest = ChargeCitRequest.Builder(9999, 'EUR', 'testorder1', strongCustomerAuthentication)
            .setCard(testCard)
            .build();
        const chargeResponse = await api.chargeCustomerInitiatedTransaction(initResponse.id, chargeCitRequest);

        checkResult(chargeResponse);
    });

    it('Test charge customer initiated transaction should throw an exception if card or token is not defined', async () => {
        const strongCustomerAuthentication = StrongCustomerAuthentication.Builder(
            ReturnUrls.Builder(
                'https://example.com/success',
                'https://example.com/cancel',
                'https://example.com/failure'
            ).build()
        ).build();

        expect(() => ChargeCitRequest.Builder(9999, 'EUR', 'order1', strongCustomerAuthentication).build())
            .to.throw('Either card or token must be defined');
    });

    it('Test charge customer initiated transaction with full SCA data', async () => {
        const initResponse = await api.initTransaction();

        const strongCustomerAuthentication = getFullStrongCustomerAuthenticationData();

        const chargeCitRequest = ChargeCitRequest.Builder( 9999, 'EUR', 'testorder1', strongCustomerAuthentication)
            .setCard(testCard)
            .build();
        const chargeResponse = await api.chargeCustomerInitiatedTransaction(initResponse.id, chargeCitRequest);

        checkResult(chargeResponse);
    });

    it('Test soft-decline of customer initiated transaction', async () => {
        const initResponse = await api.initTransaction();

        const strongCustomerAuthentication = StrongCustomerAuthentication.Builder(
            ReturnUrls.Builder(
                'https://example.com/success',
                'https://example.com/cancel',
                'https://example.com/failure'
            ).build()
        ).build();

        const chargeCitRequest = ChargeCitRequest.Builder(100, 'EUR', 'order1', strongCustomerAuthentication)
            .setCard(scaSoftDeclineCard)
            .build();
        const chargeResponse = await api.chargeCustomerInitiatedTransaction(initResponse.id, chargeCitRequest);

        assert(chargeResponse.result.code === 400, 'Request should have been soft declined with code 400, complete response was: ' + JSON.stringify(chargeResponse));
        assert.isNotNull(chargeResponse.three_d_secure_url, '3D Secure url not received');
    });

    it('Test commit transaction', () => {
        const commitRequest = new CommitTransactionRequest(9999, 'EUR');
        let transactionId: string;
        return createDebitTransaction('12345ABC', false)
            .then((initResponse) => {
                transactionId = initResponse.id;
                return api.commitTransaction(transactionId, commitRequest);
            })
            .then((commitResponse) => {
                checkResult(commitResponse);
                assert(commitResponse.card.type === 'Visa', 'Card type should be "Visa"' + printResult(commitResponse));
                assert(commitResponse.card.cvc_required === 'not_tested', 'Test card should return cvc_required = not_tested' + printResult(commitResponse));
                assert(commitResponse.recurring === false, 'Transaction should have recurring as false.' + printResult(commitResponse));

                assert(true === /^[0-9a-f]{64}$/.test(commitResponse.card.card_fingerprint), 'Card fingerprint didn\'t contain 64 hex chars');
                assert(true === /^[0-9a-f]{64}$/.test(commitResponse.card.pan_fingerprint), 'Pan fingerprint didn\'t contain 64 hex chars');

                return api.transactionResult(transactionId);
            })
            .then((resultResponse) => {
                assert(resultResponse.recurring === false, 'Transaction result should have recurring false.' + printResult(resultResponse));
                checkResult(resultResponse);
            });
    });

    it('Test uncommitted transaction', () => {
        let transactionId: string;
        return createDebitTransaction('12345DEF', false)
            .then((initResponse) => {
                transactionId = initResponse.id;
            });
    });

    it('Test revert transaction', () => {
        return createDebitTransaction()
            .then((initResponse) => {
                return api.revertTransaction(initResponse.id, new RevertTransactionRequest(9999));
            })
            .then((revertResponse) => {
                checkResult(revertResponse);
            });
    });

    it('Test revert whole transaction', () => {
        let transactionId: string;
        return createDebitTransaction()
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
            });
    });

    it('Test transaction status', () => {
        let transactionId: string;

        const referenceNumber = '1313';

        return createDebitTransaction(null, null, null, referenceNumber)
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
                assert(statusResponse.transaction.reference_number === referenceNumber, 'Transaction reference number mismatch' + printResult(statusResponse));
            });
    });

    it('Test splitting in transaction status', () => {
      let transactionId: string;

      let subMerchantId = '12345';
      let amountToSubMerchant = 9000;

      let splitting = new Splitting(subMerchantId, amountToSubMerchant);

      return createDebitTransaction(undefined, undefined, splitting)
        .then((initResponse) => {
          transactionId = initResponse.id;
          return api.transactionStatus(transactionId);
        })
        .then((statusResponse: TransactionStatusResponse) => {
          checkResult(statusResponse);
          assert(statusResponse.transaction.splitting.merchant_id === subMerchantId, 'Status response should contain matching splitting merchant ID');
          assert(statusResponse.transaction.splitting.amount === amountToSubMerchant, 'Status response should contain matching splitting amount');
        });
    });

    it('Test order search', () => {
        let transactionId: string;
        const orderId = PaymentHighwayUtility.createRequestId();
        return createDebitTransaction(orderId)
            .then((initResponse) => {
                transactionId = initResponse.id;
                return api.searchOrders(orderId);
            })
            .then((searchResponse: OrderSearchResponse) => {
                checkResult(searchResponse);
                assert(searchResponse.transactions[0].current_amount === 9999, 'Current amount for tested order should be 9999, it was: ' + searchResponse.transactions[0].current_amount + printResult(searchResponse));
                assert(searchResponse.transactions[0].id === transactionId, 'Transaction id should be same with init response and search response' + printResult(searchResponse));
                assert(searchResponse.transactions[0].recurring === false, 'Transaction should have recurring false' + printResult(searchResponse));
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
        const testCardTokenizeOkPaymentFails = new Card('4153013999700156', '2023', '11', '156');
        const orderId = PaymentHighwayUtility.createRequestId();
        let transactionResponse: TransactionResponse;
        return api.initTransaction()
            .then((response) => {
                transactionResponse = response;
                const transactionRequest = new TransactionRequest(testCardTokenizeOkPaymentFails, 9999, 'EUR', orderId);
                return api.debitTransaction(transactionResponse.id, transactionRequest);
            })
            .then((debitResponse) => {
                assert(debitResponse.result.code === 200, 'Authorization should fail (code 200), got ' + debitResponse.result.code);
                assert(debitResponse.result.message === 'Authorization failed', 'Authorization should fail');
                assert(debitResponse.acquirer.id === 'nets', 'Should find nets as acquirer id. Found: ' + debitResponse.acquirer.id);
                assert(debitResponse.acquirer.name === 'Nets', 'Should find Nets as acquirer name. Found: ' + debitResponse.acquirer.name);
                assert(debitResponse.acquirer_response_code === '116', 'Acquirer response code should be "116". Found: ' + debitResponse.acquirer_response_code);
                assert(debitResponse.authorizer === '666', 'Authorizer should be "666". Found: ' + debitResponse.authorizer);
                return api.transactionResult(transactionResponse.id);
            })
            .then((resultResponse) => {
                assert(resultResponse.result.code === 200, 'Authorization should fail (code 200), got ' + resultResponse.result.code);
                return api.transactionStatus(transactionResponse.id);
            })
            .then((statusResponse) => {
                assert(statusResponse.transaction.committed === false, 'Committed should be false, got' + statusResponse.transaction.committed);
            });
    });

    it('Test Apple Pay request builders', () => {
        let amount = 100;
        let currency = 'EUR';

        let paymentToken: PaymentData = JSON.parse('{ "data": "ABCD", "header": { "ephemeralPublicKey": "XYZ", "publicKeyHash": "13579", "transactionId": "24680" }, "signature": "ABCDXYZ0000", "version": "EC_v1" }');
        assert.strictEqual(paymentToken.data, 'ABCD', 'Data was not equal to ABCD');

        let withStaticBuilder = withoutRequestId(ApplePayTransactionRequest.Builder(paymentToken, amount, currency).build());
        let withRequestBuilder = withoutRequestId(new ApplePayTransaction.RequestBuilder(paymentToken, amount, currency).build());

        assert.deepEqual(withStaticBuilder, withRequestBuilder, 'results differ from builder');

        let requestWithCommit = withoutRequestId(ApplePayTransactionRequest.Builder(paymentToken, amount, currency).setCommit(true).build());
        assert.notDeepEqual(withStaticBuilder, requestWithCommit, 'requests should differ if commit is added');

        assert(withStaticBuilder.amount === 100);
    });

    function withoutRequestId<T extends Request>(request: T): any {
        let copy = Object.assign({}, request);
        delete copy.requestId;
        return copy;
    }

    it('Test Apple Pay request builder with splitting', () => {
        const paymentData: PaymentData = JSON.parse('{ "data": "ABCD", "header": { "ephemeralPublicKey": "XYZ", "publicKeyHash": "13579", "transactionId": "24680" }, "signature": "ABCDXYZ0000", "version": "EC_v1" }');
        const amount = 100;
        const currency = 'EUR';
        const splittingMerchantId = '123';
        const splittingAmount = 10;
        const splitting = new Splitting(splittingMerchantId, splittingAmount);

        let request = ApplePayTransactionRequest.Builder(paymentData, amount, currency).setSplitting(splitting).build();
        assert(request.splitting.merchant_id === splittingMerchantId);
        assert(request.splitting.amount === splittingAmount);
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
            });
    });

    it( 'Test MobilePay app flow init @external', () => {
        const request = MobilePayInitRequest.Builder(100, 'EUR')
            .setOrder(PaymentHighwayUtility.createRequestId())
            .setReturnUri('myapp://paid')
            .setWebhookSuccessUrl('https://myserver.com/success')
            .setWebhookCancelUrl('https://myserver.com/cancel')
            .setWebhookFailureUrl('https://myserver.com/failure')
            .build();

        return api.initMobilePaySession(request).then((response) => {
           assert.isNotNull(response.uri);
           assert.isNotNull(response.session_token);
           assert.isNotNull(response.valid_until);
           assert.containIgnoreCase(response.uri, response.session_token, 'Returned app URI should contain session token.');
        });
    });

    it('Test MobilePay app flow session status @external', () => {
        const request = MobilePayInitRequest.Builder(100, 'EUR')
            .setOrder(PaymentHighwayUtility.createRequestId())
            .setReturnUri('myapp://paid')
            .setWebhookSuccessUrl('https://myserver.com/success')
            .setWebhookCancelUrl('https://myserver.com/cancel')
            .setWebhookFailureUrl('https://myserver.com/failure')
            .build();

        return api.initMobilePaySession(request).then((initResponse) => {
            return api.mobilePaySessionStatus(initResponse.session_token).then((response) => {
                assert.equal(response.status, 'in_progress');
                assert.equal(response.valid_until, initResponse.valid_until, 'Both init and status check should have same valid until value.');
                assert.isUndefined(response.transaction_id); // transaction id is available only when session is finished
            });
        });
    });

    it('Test MobilePay request builder with splitting', () => {
        const splittingMerchantId = '123';
        const splittingAmount = 10;
        const splitting = new Splitting(splittingMerchantId, splittingAmount);

        let request = MobilePayInitRequest.Builder(100, 'EUR').setSplitting(splitting).build();
        assert(request.splitting.merchant_id === splittingMerchantId);
        assert(request.splitting.amount === splittingAmount);
    });

    it('Test Pivo app switch init', () => {
        const request = PivoInitRequest.Builder(100)
            .setOrder('Test_order')
            .setDescription('desc')
            .setAppUrl('app://url')
            .setReferenceNumber('1313')
            .setWebhookSuccessUrl('https://www.exaple.com/success')
            .setWebhookCancelUrl('https://www.example.com/cancel')
            .setWebhookFailureUrl('https://www.example.com/failure')
            .setLanguage('FI')
            .build();

        return api.initPivoTransaction(request).then( (response) => {
            assert.startsWith(response.uri, 'pivo://api/', 'Pivo app uri should start with "pivo://api/"');
        });
    });

    it('Test Pivo app switch init with splitting', () => {
        const splitting = new Splitting('12345', 10);
        const request = PivoInitRequest.Builder(100)
            .setSplitting(splitting)
            .build();
        assert(request.splitting.merchant_id === splitting.merchant_id);
        assert(request.splitting.amount === splitting.amount);
    });

    it('Test Form Session Status', async () => {
        let exampleUrl = 'https://example.com/'
        let formBuilder = new FormBuilder('POST', signatureKeyId, signatureSecret, account, merchant, baseUrl);
        const formContainer = formBuilder.generateAddCardParameters(exampleUrl, exampleUrl, exampleUrl, 'EN');

        let formSessionId;
        await FormConnection.postForm(formContainer)
            .then((response) => formSessionId = response.headers.location.split('/')[2]);

        return api.formSessionStatus(formSessionId)
            .then((sessionStatusResponse) => {
                assert(sessionStatusResponse.status.state === 'ok_pending');
                assert(sessionStatusResponse.result.message === 'OK');
                expect(sessionStatusResponse.transaction_id).to.not.exist;
                assert(sessionStatusResponse.operation === 'tokenize');
                expect(sessionStatusResponse.created).to.exist;
                expect(sessionStatusResponse.valid_until).to.exist;
            })
    });
});
