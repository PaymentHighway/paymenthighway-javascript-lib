"use strict";
const PaymentHighwayUtility_1 = require("./PaymentHighwayUtility");
const Pair_1 = require("./util/Pair");
const SecureSigner_1 = require("./security/SecureSigner");
const FormContainer_1 = require("./FormContainer");
/**
 * Creates parameters that can used on the form that sends them to
 * Payment Highway.
 *
 * Creates a request id, timestamp and signature based on request parameters.
 */
class FormBuilder {
    constructor(method, signatureKeyId, signatureSecret, account, merchant, baseUrl) {
        this.method = method;
        this.signatureKeyId = signatureKeyId;
        this.signatureSecret = signatureSecret;
        this.account = account;
        this.merchant = merchant;
        this.baseUrl = baseUrl;
        this.secureSigner = new SecureSigner_1.SecureSigner(this.signatureKeyId, this.signatureSecret);
    }
    /**
     * Get parameters for Add Card request with the possibility to
     * <li>accept cards that require CVC</li>
     * <li>skip notifications displayed on the Payment Highway form</li>
     * <li>exit from iframe after a result</li>
     * <li>exit from iframe when redirecting the user to 3DS.</li>
     * <li>force enable/disable 3ds</li>
     *
     * @param successUrl            The URL the user is redirected after the transaction is handled. The payment itself may still be rejected.
     * @param failureUrl            The URL the user is redirected after a failure such as an authentication or connectivity error.
     * @param cancelUrl             The URL the user is redirected after cancelling the transaction (clicking on the cancel button).
     * @param language              The language the form is displayed in.
     * @param acceptCvcRequired     Accept a payment card token even if the card requires CVC for payments. May be null.
     * @param skipFormNotifications Skip notifications displayed on the Payment Highway form. May be null.
     * @param exitIframeOnResult    Exit from iframe after a result. May be null.
     * @param exitIframeOn3ds       Exit from iframe when redirecting the user to 3DS. May be null.
     * @param use3ds                Force enable/disable 3ds. Null to use default configured parameter.
     * @param webhookSuccessUrl     The URL the PH server makes request after the transaction is handled. The payment itself may still be rejected.
     * @param webhookFailureUrl     The URL the PH server makes request after a failure such as an authentication or connectivity error.
     * @param webhookCancelUrl      The URL the PH server makes request after cancelling the transaction (clicking on the cancel button).
     * @param webhookDelay          Delay for webhook in seconds. Between 0-900
     * @returns {FormContainer}
     */
    generateAddCardParameters(successUrl, failureUrl, cancelUrl, language, acceptCvcRequired, skipFormNotifications, exitIframeOnResult, exitIframeOn3ds, use3ds, webhookSuccessUrl, webhookFailureUrl, webhookCancelUrl, webhookDelay) {
        const requestId = PaymentHighwayUtility_1.PaymentHighwayUtility.createRequestId();
        let nameValuePairs = this.createCommonNameValuePairs(successUrl, failureUrl, cancelUrl, language, requestId);
        if (typeof acceptCvcRequired !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_ACCEPT_CVC_REQUIRED, acceptCvcRequired.toString()));
        }
        if (typeof skipFormNotifications !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_SKIP_FORM_NOTIFICATIONS, skipFormNotifications.toString()));
        }
        if (typeof exitIframeOnResult !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_EXIT_IFRAME_ON_RESULT, exitIframeOnResult.toString()));
        }
        if (typeof exitIframeOn3ds !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_EXIT_IFRAME_ON_THREE_D_SECURE, exitIframeOn3ds.toString()));
        }
        if (typeof use3ds !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_USE_THREE_D_SECURE, use3ds.toString()));
        }
        nameValuePairs = nameValuePairs.concat(FormBuilder.createWebhookNameValuePairs(webhookSuccessUrl, webhookFailureUrl, webhookCancelUrl, webhookDelay));
        const addCardUri = '/form/view/add_card';
        const signature = this.createSignature(addCardUri, nameValuePairs);
        nameValuePairs.push(new Pair_1.Pair(FormBuilder.SIGNATURE, signature));
        return new FormContainer_1.FormContainer(this.method, this.baseUrl, addCardUri, nameValuePairs, requestId);
    }
    /**
     * Get parameters for Payment request with the possibility to
     * <li>skip notifications displayed on the Payment Highway form</li>
     * <li>exit from iframe after a result</li>
     * <li>exit from iframe when redirecting the user to 3DS.</li>
     * <li>force enable/disable 3ds</li>
     *
     * @param successUrl                The URL the user is redirected after the transaction is handled. The payment itself may still be rejected.
     * @param failureUrl                The URL the user is redirected after a failure such as an authentication or connectivity error.
     * @param cancelUrl                 The URL the user is redirected after cancelling the transaction (clicking on the cancel button).
     * @param language                  The language the form is displayed in.
     * @param amount                    The amount to pay.
     * @param currency                  In which currency is the amount, e.g. "EUR"
     * @param orderId                   A generated order ID, may for example be always unique or used multiple times for recurring transactions.
     * @param description               Description of the payment shown in the form.
     * @param skipFormNotifications     Skip notifications displayed on the Payment Highway form. May be null.
     * @param exitIframeOnResult        Exit from iframe after a result. May be null.
     * @param exitIframeOn3ds           Exit from iframe when redirecting the user to 3DS. May be null.
     * @param use3ds                    Force enable/disable 3ds. Null to use default configured parameter.
     * @param webhookSuccessUrl         The URL the PH server makes request after the transaction is handled. The payment itself may still be rejected.
     * @param webhookFailureUrl         The URL the PH server makes request after a failure such as an authentication or connectivity error.
     * @param webhookCancelUrl          The URL the PH server makes request after cancelling the transaction (clicking on the cancel button).
     * @param webhookDelay              Delay for webhook in seconds. Between 0-900
     * @param showPaymentMethodSelector Show payment method selection page
     * @returns {FormContainer}
     */
    generatePaymentParameters(successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description, skipFormNotifications, exitIframeOnResult, exitIframeOn3ds, use3ds, webhookSuccessUrl, webhookFailureUrl, webhookCancelUrl, webhookDelay, showPaymentMethodSelector) {
        const requestId = PaymentHighwayUtility_1.PaymentHighwayUtility.createRequestId();
        let nameValuePairs = this.createCommonNameValuePairs(successUrl, failureUrl, cancelUrl, language, requestId);
        nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_AMOUNT, amount.toString()));
        nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_CURRENCY, currency));
        nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_ORDER, orderId));
        nameValuePairs.push(new Pair_1.Pair(FormBuilder.DESCRIPTION, description));
        if (typeof skipFormNotifications !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_SKIP_FORM_NOTIFICATIONS, skipFormNotifications.toString()));
        }
        if (typeof exitIframeOnResult !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_EXIT_IFRAME_ON_RESULT, exitIframeOnResult.toString()));
        }
        if (typeof exitIframeOn3ds !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_EXIT_IFRAME_ON_THREE_D_SECURE, exitIframeOn3ds.toString()));
        }
        if (typeof use3ds !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_USE_THREE_D_SECURE, use3ds.toString()));
        }
        if (typeof showPaymentMethodSelector !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_SHOW_PAYMENT_METHOD_SELECTOR, showPaymentMethodSelector.toString()));
        }
        nameValuePairs = nameValuePairs.concat(FormBuilder.createWebhookNameValuePairs(webhookSuccessUrl, webhookFailureUrl, webhookCancelUrl, webhookDelay));
        const payWithCardUri = '/form/view/pay_with_card';
        const signature = this.createSignature(payWithCardUri, nameValuePairs);
        nameValuePairs.push(new Pair_1.Pair(FormBuilder.SIGNATURE, signature));
        return new FormContainer_1.FormContainer(this.method, this.baseUrl, payWithCardUri, nameValuePairs, requestId);
    }
    /**
     * Get parameters for Add Card and Pay request with the possibility to
     * <li>skip notifications displayed on the Payment Highway form</li>
     * <li>exit from iframe after a result</li>
     * <li>exit from iframe when redirecting the user to 3DS.</li>
     * <li>force enable/disable 3ds</li>
     *
     * @param successUrl            The URL the user is redirected after the transaction is handled. The payment itself may still be rejected.
     * @param failureUrl            The URL the user is redirected after a failure such as an authentication or connectivity error.
     * @param cancelUrl             The URL the user is redirected after cancelling the transaction (clicking on the cancel button).
     * @param language              The language the form is displayed in.
     * @param amount                The amount to pay.
     * @param currency              In which currency is the amount, e.g. "EUR"
     * @param orderId               A generated order ID, may for example be always unique or used multiple times for recurring transactions.
     * @param description           Description of the payment shown in the form.
     * @param skipFormNotifications Skip notifications displayed on the Payment Highway form. May be null.
     * @param exitIframeOnResult    Exit from iframe after a result. May be null.
     * @param exitIframeOn3ds       Exit from iframe when redirecting the user to 3DS. May be null.
     * @param use3ds                Force enable/disable 3ds. Null to use default configured parameter.
     * @param webhookSuccessUrl     The URL the PH server makes request after the transaction is handled. The payment itself may still be rejected.
     * @param webhookFailureUrl     The URL the PH server makes request after a failure such as an authentication or connectivity error.
     * @param webhookCancelUrl      The URL the PH server makes request after cancelling the transaction (clicking on the cancel button).
     * @param webhookDelay          Delay for webhook in seconds. Between 0-900
     * @return {FormContainer}
     */
    generateAddCardAndPaymentParameters(successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description, skipFormNotifications, exitIframeOnResult, exitIframeOn3ds, use3ds, webhookSuccessUrl, webhookFailureUrl, webhookCancelUrl, webhookDelay) {
        const requestId = PaymentHighwayUtility_1.PaymentHighwayUtility.createRequestId();
        let nameValuePairs = this.createCommonNameValuePairs(successUrl, failureUrl, cancelUrl, language, requestId);
        nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_AMOUNT, amount.toString()));
        nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_CURRENCY, currency));
        nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_ORDER, orderId));
        nameValuePairs.push(new Pair_1.Pair(FormBuilder.DESCRIPTION, description));
        if (typeof skipFormNotifications !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_SKIP_FORM_NOTIFICATIONS, skipFormNotifications.toString()));
        }
        if (typeof exitIframeOnResult !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_EXIT_IFRAME_ON_RESULT, exitIframeOnResult.toString()));
        }
        if (typeof exitIframeOn3ds !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_EXIT_IFRAME_ON_THREE_D_SECURE, exitIframeOn3ds.toString()));
        }
        if (typeof use3ds !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_USE_THREE_D_SECURE, use3ds.toString()));
        }
        nameValuePairs = nameValuePairs.concat(FormBuilder.createWebhookNameValuePairs(webhookSuccessUrl, webhookFailureUrl, webhookCancelUrl, webhookDelay));
        const addCardAndPayUri = '/form/view/add_and_pay_with_card';
        const signature = this.createSignature(addCardAndPayUri, nameValuePairs);
        nameValuePairs.push(new Pair_1.Pair(FormBuilder.SIGNATURE, signature));
        return new FormContainer_1.FormContainer(this.method, this.baseUrl, addCardAndPayUri, nameValuePairs, requestId);
    }
    /**
     * Get parameters for Pay with Token and CVC request with the possibility to
     * <li>skip notifications displayed on the Payment Highway form</li>
     * <li>exit from iframe after a result</li>
     * <li>exit from iframe when redirecting the user to 3DS.</li>
     * <li>force enable/disable 3ds</li>
     *
     * @param token                 The card token to charge from.
     * @param successUrl            The URL the user is redirected after the transaction is handled. The payment itself may still be rejected.
     * @param failureUrl            The URL the user is redirected after a failure such as an authentication or connectivity error.
     * @param cancelUrl             The URL the user is redirected after cancelling the transaction (clicking on the cancel button).
     * @param language              The language the form is displayed in.
     * @param amount                The amount to pay.
     * @param currency              In which currency is the amount, e.g. "EUR"
     * @param orderId               A generated order ID, may for example be always unique or used multiple times for recurring transactions.
     * @param description           Description of the payment shown in the form.
     * @param skipFormNotifications Skip notifications displayed on the Payment Highway form. May be null.
     * @param exitIframeOnResult    Exit from iframe after a result. May be null.
     * @param exitIframeOn3ds       Exit from iframe when redirecting the user to 3DS. May be null.
     * @param use3ds                Force enable/disable 3ds. Null to use default configured parameter.
     * @param webhookSuccessUrl     The URL the PH server makes request after the transaction is handled. The payment itself may still be rejected.
     * @param webhookFailureUrl     The URL the PH server makes request after a failure such as an authentication or connectivity error.
     * @param webhookCancelUrl      The URL the PH server makes request after cancelling the transaction (clicking on the cancel button).
     * @param webhookDelay          Delay for webhook in seconds. Between 0-900
     * @returns {FormContainer}
     */
    generatePayWithTokenAndCvcParameters(token, successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description, skipFormNotifications, exitIframeOnResult, exitIframeOn3ds, use3ds, webhookSuccessUrl, webhookFailureUrl, webhookCancelUrl, webhookDelay) {
        const requestId = PaymentHighwayUtility_1.PaymentHighwayUtility.createRequestId();
        let nameValuePairs = this.createCommonNameValuePairs(successUrl, failureUrl, cancelUrl, language, requestId);
        nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_AMOUNT, amount.toString()));
        nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_CURRENCY, currency));
        nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_ORDER, orderId));
        nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_TOKEN, token));
        nameValuePairs.push(new Pair_1.Pair(FormBuilder.DESCRIPTION, description));
        if (typeof skipFormNotifications !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_SKIP_FORM_NOTIFICATIONS, skipFormNotifications.toString()));
        }
        if (typeof exitIframeOnResult !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_EXIT_IFRAME_ON_RESULT, exitIframeOnResult.toString()));
        }
        if (typeof exitIframeOn3ds !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_EXIT_IFRAME_ON_THREE_D_SECURE, exitIframeOn3ds.toString()));
        }
        if (typeof use3ds !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_USE_THREE_D_SECURE, use3ds.toString()));
        }
        nameValuePairs = nameValuePairs.concat(FormBuilder.createWebhookNameValuePairs(webhookSuccessUrl, webhookFailureUrl, webhookCancelUrl, webhookDelay));
        const payWithTokenAndCvcUri = '/form/view/pay_with_token_and_cvc';
        const signature = this.createSignature(payWithTokenAndCvcUri, nameValuePairs);
        nameValuePairs.push(new Pair_1.Pair(FormBuilder.SIGNATURE, signature));
        return new FormContainer_1.FormContainer(this.method, this.baseUrl, payWithTokenAndCvcUri, nameValuePairs, requestId);
    }
    /**
     * Get parameters for MobilePay request.
     *
     * @param successUrl            The URL the user is redirected after the transaction is handled. The payment itself may still be rejected.
     * @param failureUrl            The URL the user is redirected after a failure such as an authentication or connectivity error.
     * @param cancelUrl             The URL the user is redirected after cancelling the transaction (clicking on the cancel button).
     * @param language              The language the form is displayed in.
     * @param amount                The amount to pay.
     * @param currency              In which currency is the amount, e.g. "EUR"
     * @param orderId               A generated order ID, may for example be always unique or used multiple times for recurring transactions.
     * @param description           Description of the payment shown in the form.
     * @param exitIframeOnResult    Exit from iframe after a result. May be null.
     * @param shopLogoUrl           The logo must be 250x250 pixel in .png format and must be hosted on a HTTPS (secure) server. Optional.
     * @param phoneNumber           User phone number with country code. Max AN 15. Optional.
     * @param shopName              Max 100 AN. Name of the shop/merchant. MobilePay app displays this under the shop logo.  If omitted, the merchant name from PH is used. Optional.
     * @param subMerchantId         Max 15 AN. Should only be used by a Payment Facilitator customer
     * @param subMerchantName       Max 21 AN. Should only be used by a Payment Facilitator customer
     * @param webhookSuccessUrl     The URL the PH server makes request after the transaction is handled. The payment itself may still be rejected.
     * @param webhookFailureUrl     The URL the PH server makes request after a failure such as an authentication or connectivity error.
     * @param webhookCancelUrl      The URL the PH server makes request after cancelling the transaction (clicking on the cancel button).
     * @param webhookDelay          Delay for webhook in seconds. Between 0-900
     * @return FormContainer
     */
    generatePayWithMobilePayParameters(successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description, exitIframeOnResult, shopLogoUrl, phoneNumber, shopName, subMerchantId, subMerchantName, webhookSuccessUrl, webhookFailureUrl, webhookCancelUrl, webhookDelay) {
        const requestId = PaymentHighwayUtility_1.PaymentHighwayUtility.createRequestId();
        let nameValuePairs = this.createCommonNameValuePairs(successUrl, failureUrl, cancelUrl, language, requestId);
        nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_AMOUNT, amount.toString()));
        nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_CURRENCY, currency));
        nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_ORDER, orderId));
        nameValuePairs.push(new Pair_1.Pair(FormBuilder.DESCRIPTION, description));
        if (typeof exitIframeOnResult !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_EXIT_IFRAME_ON_RESULT, exitIframeOnResult.toString()));
        }
        if (typeof shopLogoUrl !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_SHOP_LOGO_URL, shopLogoUrl));
        }
        if (typeof phoneNumber !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_MOBILEPAY_PHONE_NUMBER, phoneNumber));
        }
        if (typeof shopName !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_MOBILEPAY_SHOP_NAME, shopName));
        }
        if (typeof subMerchantId !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_SUB_MERCHANT_ID, subMerchantId));
        }
        if (typeof subMerchantName !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_SUB_MERCHANT_NAME, subMerchantName));
        }
        nameValuePairs = nameValuePairs.concat(FormBuilder.createWebhookNameValuePairs(webhookSuccessUrl, webhookFailureUrl, webhookCancelUrl, webhookDelay));
        const mobilePayUri = '/form/view/mobilepay';
        const signature = this.createSignature(mobilePayUri, nameValuePairs);
        nameValuePairs.push(new Pair_1.Pair(FormBuilder.SIGNATURE, signature));
        return new FormContainer_1.FormContainer(this.method, this.baseUrl, mobilePayUri, nameValuePairs, requestId);
    }
    /**
     * Get parameters for Masterpass request.
     *
     * @param successUrl            The URL the user is redirected after the transaction is handled. The payment itself may still be rejected.
     * @param failureUrl            The URL the user is redirected after a failure such as an authentication or connectivity error.
     * @param cancelUrl             The URL the user is redirected after cancelling the transaction (clicking on the cancel button).
     * @param language              The language the form is displayed in.
     * @param amount                The amount to pay.
     * @param currency              In which currency is the amount, e.g. "EUR"
     * @param orderId               A generated order ID, may for example be always unique or used multiple times for recurring transactions.
     * @param description           Description of the payment shown in the form.
     * @param skipFormNotifications Skip notifications displayed on the Payment Highway form. May be null.
     * @param exitIframeOnResult    Exit from iframe after a result. May be null.
     * @param exitIframeOn3ds       Exit from iframe when redirecting the user to 3DS. May be null.
     * @param use3ds                Force enable/disable 3ds. Null to use default configured parameter.
     * @param webhookSuccessUrl     The URL the PH server makes request after the transaction is handled. The payment itself may still be rejected.
     * @param webhookFailureUrl     The URL the PH server makes request after a failure such as an authentication or connectivity error.
     * @param webhookCancelUrl      The URL the PH server makes request after cancelling the transaction (clicking on the cancel button).
     * @param webhookDelay          Delay for webhook in seconds. Between 0-900
     * @return FormContainer
     */
    generateMasterPassParameters(successUrl, failureUrl, cancelUrl, language, amount, currency, orderId, description, skipFormNotifications, exitIframeOnResult, exitIframeOn3ds, use3ds, webhookSuccessUrl, webhookFailureUrl, webhookCancelUrl, webhookDelay) {
        const requestId = PaymentHighwayUtility_1.PaymentHighwayUtility.createRequestId();
        let nameValuePairs = this.createCommonNameValuePairs(successUrl, failureUrl, cancelUrl, language, requestId);
        nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_AMOUNT, amount.toString()));
        nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_CURRENCY, currency));
        nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_ORDER, orderId));
        nameValuePairs.push(new Pair_1.Pair(FormBuilder.DESCRIPTION, description));
        if (typeof skipFormNotifications !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_SKIP_FORM_NOTIFICATIONS, skipFormNotifications.toString()));
        }
        if (typeof exitIframeOnResult !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_EXIT_IFRAME_ON_RESULT, exitIframeOnResult.toString()));
        }
        if (typeof exitIframeOn3ds !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_EXIT_IFRAME_ON_THREE_D_SECURE, exitIframeOn3ds.toString()));
        }
        if (typeof use3ds !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_USE_THREE_D_SECURE, use3ds.toString()));
        }
        nameValuePairs = nameValuePairs.concat(FormBuilder.createWebhookNameValuePairs(webhookSuccessUrl, webhookFailureUrl, webhookCancelUrl, webhookDelay));
        const masterPassUri = '/form/view/masterpass';
        const signature = this.createSignature(masterPassUri, nameValuePairs);
        nameValuePairs.push(new Pair_1.Pair(FormBuilder.SIGNATURE, signature));
        return new FormContainer_1.FormContainer(this.method, this.baseUrl, masterPassUri, nameValuePairs, requestId);
    }
    /**
     *
     * @param webhookSuccessUrl
     * @param webhookFailureUrl
     * @param webhookCancelUrl
     * @param webhookDelay
     * @returns {Array}
     */
    static createWebhookNameValuePairs(webhookSuccessUrl, webhookFailureUrl, webhookCancelUrl, webhookDelay) {
        let nameValuePairs = [];
        if (typeof webhookSuccessUrl !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_WEBHOOK_SUCCESS_URL, webhookSuccessUrl));
        }
        if (typeof webhookFailureUrl !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_WEBHOOK_FAILURE_URL, webhookFailureUrl));
        }
        if (typeof webhookCancelUrl !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_WEBHOOK_CANCEL_URL, webhookCancelUrl));
        }
        if (typeof webhookDelay !== 'undefined') {
            nameValuePairs.push(new Pair_1.Pair(FormBuilder.SPH_WEBHOOK_DELAY, webhookDelay.toString()));
        }
        return nameValuePairs;
    }
    /**
     *
     * @param successUrl
     * @param failureUrl
     * @param cancelUrl
     * @param language
     * @param requestId
     * @returns {Pair[]}
     */
    createCommonNameValuePairs(successUrl, failureUrl, cancelUrl, language, requestId) {
        return [
            new Pair_1.Pair(FormBuilder.SPH_API_VERSION, FormBuilder.FORM_API_VERSION),
            new Pair_1.Pair(FormBuilder.SPH_ACCOUNT, this.account),
            new Pair_1.Pair(FormBuilder.SPH_MERCHANT, this.merchant),
            new Pair_1.Pair(FormBuilder.SPH_TIMESTAMP, PaymentHighwayUtility_1.PaymentHighwayUtility.getUtcTimestamp()),
            new Pair_1.Pair(FormBuilder.SPH_CANCEL_URL, cancelUrl),
            new Pair_1.Pair(FormBuilder.SPH_FAILURE_URL, failureUrl),
            new Pair_1.Pair(FormBuilder.SPH_SUCCESS_URL, successUrl),
            new Pair_1.Pair(FormBuilder.SPH_REQUEST_ID, requestId),
            new Pair_1.Pair(FormBuilder.LANGUAGE, language)
        ];
    }
    /**
     *
     * @param uri
     * @param nameValuePairs
     * @returns {string}
     */
    createSignature(uri, nameValuePairs) {
        return this.secureSigner.createSignature(this.method, uri, nameValuePairs, '');
    }
}
FormBuilder.FORM_API_VERSION = '20160630';
FormBuilder.SPH_API_VERSION = 'sph-api-version';
FormBuilder.SPH_ACCEPT_CVC_REQUIRED = 'sph-accept-cvc-required';
FormBuilder.SPH_ACCOUNT = 'sph-account';
FormBuilder.SPH_MERCHANT = 'sph-merchant';
FormBuilder.SPH_AMOUNT = 'sph-amount';
FormBuilder.SPH_CURRENCY = 'sph-currency';
FormBuilder.SPH_ORDER = 'sph-order';
FormBuilder.SPH_SUCCESS_URL = 'sph-success-url';
FormBuilder.SPH_FAILURE_URL = 'sph-failure-url';
FormBuilder.SPH_CANCEL_URL = 'sph-cancel-url';
FormBuilder.SPH_REQUEST_ID = 'sph-request-id';
FormBuilder.SPH_TIMESTAMP = 'sph-timestamp';
FormBuilder.SPH_TOKEN = 'sph-token';
FormBuilder.SPH_SKIP_FORM_NOTIFICATIONS = 'sph-skip-form-notifications';
FormBuilder.SPH_EXIT_IFRAME_ON_RESULT = 'sph-exit-iframe-on-result';
FormBuilder.SPH_EXIT_IFRAME_ON_THREE_D_SECURE = 'sph-exit-iframe-on-three-d-secure';
FormBuilder.SPH_USE_THREE_D_SECURE = 'sph-use-three-d-secure';
FormBuilder.SPH_MOBILEPAY_PHONE_NUMBER = 'sph-mobilepay-phone-number';
FormBuilder.SPH_MOBILEPAY_SHOP_NAME = 'sph-mobilepay-shop-name';
FormBuilder.SPH_SUB_MERCHANT_NAME = 'sph-sub-merchant-name';
FormBuilder.SPH_SUB_MERCHANT_ID = 'sph-sub-merchant-id';
FormBuilder.SPH_SHOP_LOGO_URL = 'sph-shop-logo-url';
FormBuilder.SPH_WEBHOOK_SUCCESS_URL = 'sph-webhook-success-url';
FormBuilder.SPH_WEBHOOK_FAILURE_URL = 'sph-webhook-failure-url';
FormBuilder.SPH_WEBHOOK_CANCEL_URL = 'sph-webhook-cancel-url';
FormBuilder.SPH_WEBHOOK_DELAY = 'sph-webhook-delay';
FormBuilder.SPH_SHOW_PAYMENT_METHOD_SELECTOR = 'sph-show-payment-method-selector';
FormBuilder.LANGUAGE = 'language';
FormBuilder.DESCRIPTION = 'description';
FormBuilder.SIGNATURE = 'signature';
exports.FormBuilder = FormBuilder;
//# sourceMappingURL=FormBuilder.js.map