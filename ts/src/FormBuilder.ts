import {Method} from './util/Method';
import {PaymentHighwayUtility} from './PaymentHighwayUtility';
import {Pair} from './util/Pair';
import {SecureSigner} from './security/SecureSigner';
import {FormContainer} from './FormContainer';

/**
 * Creates parameters that can used on the form that sends them to
 * Payment Highway.
 *
 * Creates a request id, timestamp and signature based on request parameters.
 */
export class FormBuilder {
    private static FORM_API_VERSION: string = '20191204';

    private static SPH_API_VERSION: string = 'sph-api-version';
    private static SPH_ACCEPT_CVC_REQUIRED: string = 'sph-accept-cvc-required';
    private static SPH_ACCOUNT: string = 'sph-account';
    private static SPH_MERCHANT: string = 'sph-merchant';
    private static SPH_AMOUNT: string = 'sph-amount';
    private static SPH_CURRENCY: string = 'sph-currency';
    private static SPH_ORDER: string = 'sph-order';
    private static SPH_SUCCESS_URL: string = 'sph-success-url';
    private static SPH_FAILURE_URL: string = 'sph-failure-url';
    private static SPH_CANCEL_URL: string = 'sph-cancel-url';
    private static SPH_REQUEST_ID: string = 'sph-request-id';
    private static SPH_TIMESTAMP: string = 'sph-timestamp';
    private static SPH_TOKEN: string = 'sph-token';
    private static SPH_SKIP_FORM_NOTIFICATIONS: string = 'sph-skip-form-notifications';
    private static SPH_EXIT_IFRAME_ON_RESULT: string = 'sph-exit-iframe-on-result';
    private static SPH_EXIT_IFRAME_ON_THREE_D_SECURE: string = 'sph-exit-iframe-on-three-d-secure';
    private static SPH_USE_THREE_D_SECURE: string = 'sph-use-three-d-secure';
    private static SPH_MOBILEPAY_PHONE_NUMBER: string = 'sph-mobilepay-phone-number';
    private static SPH_MOBILEPAY_SHOP_NAME: string = 'sph-mobilepay-shop-name';
    private static SPH_SUB_MERCHANT_NAME: string = 'sph-sub-merchant-name';
    private static SPH_SUB_MERCHANT_ID: string = 'sph-sub-merchant-id';
    private static SPH_SHOP_LOGO_URL: string = 'sph-shop-logo-url';
    private static SPH_WEBHOOK_SUCCESS_URL: string = 'sph-webhook-success-url';
    private static SPH_WEBHOOK_FAILURE_URL: string = 'sph-webhook-failure-url';
    private static SPH_WEBHOOK_CANCEL_URL: string = 'sph-webhook-cancel-url';
    private static SPH_WEBHOOK_DELAY: string = 'sph-webhook-delay';
    private static SPH_SHOW_PAYMENT_METHOD_SELECTOR: string = 'sph-show-payment-method-selector';
    private static SPH_REQUEST_SHIPPING_ADDRESS: string = 'sph-request-shipping-address';
    private static SPH_PHONE_NUMBER: string = 'sph-phone-number';
    private static SPH_REFERENCE_NUMBER: string = 'sph-reference-number';
    private static SPH_APP_URL: string = 'sph-app-url';
    private static SPH_ORDER_DESCRIPTION: string = 'sph-order-description';
    private static SPH_SOCIAL_SECURITY_NUMBER: string = 'sph-social-security-number';
    private static SPH_EMAIL_ADDRESS: string = 'sph-email-address';
    private static LANGUAGE: string = 'language';
    private static DESCRIPTION: string = 'description';
    private static SIGNATURE: string = 'signature';

    private secureSigner: SecureSigner;

    constructor(private method: Method,
                private signatureKeyId: string,
                private signatureSecret: string,
                private account: string,
                private merchant: string,
                private baseUrl: string) {
        this.secureSigner = new SecureSigner(this.signatureKeyId, this.signatureSecret);
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
    public generateAddCardParameters(successUrl: string, failureUrl: string, cancelUrl: string, language: string,
                                     acceptCvcRequired?: boolean, skipFormNotifications?: boolean,
                                     exitIframeOnResult?: boolean, exitIframeOn3ds?: boolean, use3ds?: boolean,
                                     webhookSuccessUrl?: string, webhookFailureUrl?: string,
                                     webhookCancelUrl?: string, webhookDelay?: number): FormContainer {
        const requestId = PaymentHighwayUtility.createRequestId();
        let nameValuePairs = this.createCommonNameValuePairs(successUrl, failureUrl, cancelUrl, language, requestId);

        if (typeof acceptCvcRequired !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_ACCEPT_CVC_REQUIRED, acceptCvcRequired.toString()));
        }
        if (typeof skipFormNotifications !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_SKIP_FORM_NOTIFICATIONS, skipFormNotifications.toString()));
        }
        if (typeof exitIframeOnResult !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_EXIT_IFRAME_ON_RESULT, exitIframeOnResult.toString()));
        }
        if (typeof exitIframeOn3ds !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_EXIT_IFRAME_ON_THREE_D_SECURE, exitIframeOn3ds.toString()));
        }
        if (typeof use3ds !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_USE_THREE_D_SECURE, use3ds.toString()));
        }
        nameValuePairs = nameValuePairs.concat(FormBuilder.createWebhookNameValuePairs(webhookSuccessUrl, webhookFailureUrl, webhookCancelUrl, webhookDelay));

        const addCardUri = '/form/view/add_card';
        const signature = this.createSignature(addCardUri, nameValuePairs);
        nameValuePairs.push(new Pair(FormBuilder.SIGNATURE, signature));

        return new FormContainer(this.method, this.baseUrl, addCardUri, nameValuePairs, requestId);
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
     * @param referenceNumber           Reference number in RF or Finnish reference format, used when settling the transaction to the merchant account. Only used if one-by-ony transaction settling is configured.
     * @returns {FormContainer}
     */
    public generatePaymentParameters(successUrl: string, failureUrl: string, cancelUrl: string, language: string,
                                     amount: number, currency: string, orderId: string, description: string,
                                     skipFormNotifications?: boolean, exitIframeOnResult?: boolean,
                                     exitIframeOn3ds?: boolean, use3ds?: boolean, webhookSuccessUrl?: string,
                                     webhookFailureUrl?: string, webhookCancelUrl?: string, webhookDelay?: number,
                                     showPaymentMethodSelector?: boolean, referenceNumber?: string): FormContainer {

        const requestId = PaymentHighwayUtility.createRequestId();
        let nameValuePairs = this.createCommonNameValuePairs(successUrl, failureUrl, cancelUrl, language, requestId);

        nameValuePairs.push(new Pair(FormBuilder.SPH_AMOUNT, amount.toString()));
        nameValuePairs.push(new Pair(FormBuilder.SPH_CURRENCY, currency));
        nameValuePairs.push(new Pair(FormBuilder.SPH_ORDER, orderId));
        nameValuePairs.push(new Pair(FormBuilder.DESCRIPTION, description));

        if (typeof skipFormNotifications !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_SKIP_FORM_NOTIFICATIONS, skipFormNotifications.toString()));
        }
        if (typeof exitIframeOnResult !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_EXIT_IFRAME_ON_RESULT, exitIframeOnResult.toString()));
        }
        if (typeof exitIframeOn3ds !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_EXIT_IFRAME_ON_THREE_D_SECURE, exitIframeOn3ds.toString()));
        }
        if (typeof use3ds !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_USE_THREE_D_SECURE, use3ds.toString()));
        }
        if (typeof showPaymentMethodSelector !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_SHOW_PAYMENT_METHOD_SELECTOR, showPaymentMethodSelector.toString()));
        }
        if (typeof referenceNumber !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_REFERENCE_NUMBER, referenceNumber));
        }

        nameValuePairs = nameValuePairs.concat(FormBuilder.createWebhookNameValuePairs(webhookSuccessUrl, webhookFailureUrl, webhookCancelUrl, webhookDelay));

        const payWithCardUri = '/form/view/pay_with_card';
        const signature = this.createSignature(payWithCardUri, nameValuePairs);
        nameValuePairs.push(new Pair(FormBuilder.SIGNATURE, signature));

        return new FormContainer(this.method, this.baseUrl, payWithCardUri, nameValuePairs, requestId);
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
     * @param referenceNumber       Reference number in RF or Finnish reference format, used when settling the transaction to the merchant account. Only used if one-by-ony transaction settling is configured.
     * @return {FormContainer}
     */
    public generateAddCardAndPaymentParameters(successUrl: string, failureUrl: string, cancelUrl: string,
                                               language: string, amount: number, currency: string, orderId: string,
                                               description: string, skipFormNotifications?: boolean,
                                               exitIframeOnResult?: boolean, exitIframeOn3ds?: boolean,
                                               use3ds?: boolean, webhookSuccessUrl?: string, webhookFailureUrl?: string,
                                               webhookCancelUrl?: string, webhookDelay?: number,
                                               referenceNumber?: string): FormContainer {
        const requestId = PaymentHighwayUtility.createRequestId();
        let nameValuePairs = this.createCommonNameValuePairs(successUrl, failureUrl, cancelUrl, language, requestId);

        nameValuePairs.push(new Pair(FormBuilder.SPH_AMOUNT, amount.toString()));
        nameValuePairs.push(new Pair(FormBuilder.SPH_CURRENCY, currency));
        nameValuePairs.push(new Pair(FormBuilder.SPH_ORDER, orderId));
        nameValuePairs.push(new Pair(FormBuilder.DESCRIPTION, description));
        if (typeof skipFormNotifications !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_SKIP_FORM_NOTIFICATIONS, skipFormNotifications.toString()));
        }
        if (typeof exitIframeOnResult !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_EXIT_IFRAME_ON_RESULT, exitIframeOnResult.toString()));
        }
        if (typeof exitIframeOn3ds !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_EXIT_IFRAME_ON_THREE_D_SECURE, exitIframeOn3ds.toString()));
        }
        if (typeof use3ds !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_USE_THREE_D_SECURE, use3ds.toString()));
        }
        if (typeof referenceNumber !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_REFERENCE_NUMBER, referenceNumber));
        }

        nameValuePairs = nameValuePairs.concat(FormBuilder.createWebhookNameValuePairs(webhookSuccessUrl, webhookFailureUrl, webhookCancelUrl, webhookDelay));

        const addCardAndPayUri = '/form/view/add_and_pay_with_card';
        const signature = this.createSignature(addCardAndPayUri, nameValuePairs);

        nameValuePairs.push(new Pair(FormBuilder.SIGNATURE, signature));

        return new FormContainer(this.method, this.baseUrl, addCardAndPayUri, nameValuePairs, requestId);

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
     * @param referenceNumber       Reference number in RF or Finnish reference format, used when settling the transaction to the merchant account. Only used if one-by-ony transaction settling is configured.
     * @returns {FormContainer}
     */
    public generatePayWithTokenAndCvcParameters(token: string, successUrl: string, failureUrl: string,
                                                cancelUrl: string, language: string, amount: number, currency: string,
                                                orderId: string, description: string, skipFormNotifications?: boolean,
                                                exitIframeOnResult?: boolean, exitIframeOn3ds?: boolean,
                                                use3ds?: boolean, webhookSuccessUrl?: string, webhookFailureUrl?: string,
                                                webhookCancelUrl?: string, webhookDelay?: number,
                                                referenceNumber?: string): FormContainer {

        const requestId = PaymentHighwayUtility.createRequestId();
        let nameValuePairs = this.createCommonNameValuePairs(successUrl, failureUrl, cancelUrl, language, requestId);

        nameValuePairs.push(new Pair(FormBuilder.SPH_AMOUNT, amount.toString()));
        nameValuePairs.push(new Pair(FormBuilder.SPH_CURRENCY, currency));
        nameValuePairs.push(new Pair(FormBuilder.SPH_ORDER, orderId));
        nameValuePairs.push(new Pair(FormBuilder.SPH_TOKEN, token));
        nameValuePairs.push(new Pair(FormBuilder.DESCRIPTION, description));
        if (typeof skipFormNotifications !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_SKIP_FORM_NOTIFICATIONS, skipFormNotifications.toString()));
        }
        if (typeof exitIframeOnResult !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_EXIT_IFRAME_ON_RESULT, exitIframeOnResult.toString()));
        }
        if (typeof exitIframeOn3ds !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_EXIT_IFRAME_ON_THREE_D_SECURE, exitIframeOn3ds.toString()));
        }
        if (typeof use3ds !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_USE_THREE_D_SECURE, use3ds.toString()));
        }
        if (typeof referenceNumber !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_REFERENCE_NUMBER, referenceNumber));
        }

        nameValuePairs = nameValuePairs.concat(FormBuilder.createWebhookNameValuePairs(webhookSuccessUrl, webhookFailureUrl, webhookCancelUrl, webhookDelay));

        const payWithTokenAndCvcUri = '/form/view/pay_with_token_and_cvc';
        const signature = this.createSignature(payWithTokenAndCvcUri, nameValuePairs);
        nameValuePairs.push(new Pair(FormBuilder.SIGNATURE, signature));

        return new FormContainer(this.method, this.baseUrl, payWithTokenAndCvcUri, nameValuePairs, requestId);
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
     * @param referenceNumber       Reference number in RF or Finnish reference format, used when settling the transaction to the merchant account. Only used if one-by-ony transaction settling is configured.
     * @return FormContainer
     */
    public generatePayWithMobilePayParameters(successUrl: string, failureUrl: string, cancelUrl: string, language: string,
                                              amount: number, currency: string, orderId: string, description: string,
                                              exitIframeOnResult?: boolean, shopLogoUrl?: string, phoneNumber?: string,
                                              shopName?: string, subMerchantId?: string, subMerchantName?: string,
                                              webhookSuccessUrl?: string, webhookFailureUrl?: string, webhookCancelUrl?: string,
                                              webhookDelay?: number, referenceNumber?: string): FormContainer {
        const requestId = PaymentHighwayUtility.createRequestId();
        let nameValuePairs = this.createCommonNameValuePairs(successUrl, failureUrl, cancelUrl, language, requestId);

        nameValuePairs.push(new Pair(FormBuilder.SPH_AMOUNT, amount.toString()));
        nameValuePairs.push(new Pair(FormBuilder.SPH_CURRENCY, currency));
        nameValuePairs.push(new Pair(FormBuilder.SPH_ORDER, orderId));
        nameValuePairs.push(new Pair(FormBuilder.DESCRIPTION, description));

        if (typeof exitIframeOnResult !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_EXIT_IFRAME_ON_RESULT, exitIframeOnResult.toString()));
        }
        if (typeof shopLogoUrl !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_SHOP_LOGO_URL, shopLogoUrl));
        }
        if (typeof phoneNumber !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_MOBILEPAY_PHONE_NUMBER, phoneNumber));
        }
        if (typeof shopName !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_MOBILEPAY_SHOP_NAME, shopName));
        }
        if (typeof subMerchantId !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_SUB_MERCHANT_ID, subMerchantId));
        }
        if (typeof subMerchantName !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_SUB_MERCHANT_NAME, subMerchantName));
        }
        if (typeof referenceNumber !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_REFERENCE_NUMBER, referenceNumber));
        }

        nameValuePairs = nameValuePairs.concat(FormBuilder.createWebhookNameValuePairs(webhookSuccessUrl, webhookFailureUrl, webhookCancelUrl, webhookDelay));

        const mobilePayUri = '/form/view/mobilepay';
        const signature = this.createSignature(mobilePayUri, nameValuePairs);

        nameValuePairs.push(new Pair(FormBuilder.SIGNATURE, signature));

        return new FormContainer(this.method, this.baseUrl, mobilePayUri, nameValuePairs, requestId);
    }

    /**
     * Get parameters for Masterpass request.
     *
     * @param successUrl             The URL the user is redirected after the transaction is handled. The payment itself may still be rejected.
     * @param failureUrl             The URL the user is redirected after a failure such as an authentication or connectivity error.
     * @param cancelUrl              The URL the user is redirected after cancelling the transaction (clicking on the cancel button).
     * @param language               The language the form is displayed in.
     * @param amount                 The amount to pay.
     * @param currency               In which currency is the amount, e.g. "EUR"
     * @param orderId                A generated order ID, may for example be always unique or used multiple times for recurring transactions.
     * @param description            Description of the payment shown in the form.
     * @param skipFormNotifications  Skip notifications displayed on the Payment Highway form. May be null.
     * @param exitIframeOnResult     Exit from iframe after a result. May be null.
     * @param exitIframeOn3ds        Exit from iframe when redirecting the user to 3DS. May be null.
     * @param use3ds                 Force enable/disable 3ds. Null to use default configured parameter.
     * @param webhookSuccessUrl      The URL the PH server makes request after the transaction is handled. The payment itself may still be rejected.
     * @param webhookFailureUrl      The URL the PH server makes request after a failure such as an authentication or connectivity error.
     * @param webhookCancelUrl       The URL the PH server makes request after cancelling the transaction (clicking on the cancel button).
     * @param webhookDelay           Delay for webhook in seconds. Between 0-900
     * @param requestShippingAddress Request shipping address from the user via Masterpass Wallet
     * @param referenceNumber       Reference number in RF or Finnish reference format, used when settling the transaction to the merchant account. Only used if one-by-ony transaction settling is configured.
     * @return FormContainer
     */
    public generateMasterPassParameters(successUrl: string, failureUrl: string, cancelUrl: string, language: string,
                                        amount: number, currency: string, orderId: string, description: string,
                                        skipFormNotifications?: boolean, exitIframeOnResult?: boolean,
                                        exitIframeOn3ds?: boolean, use3ds?: boolean, webhookSuccessUrl?: string,
                                        webhookFailureUrl?: string, webhookCancelUrl?: string, webhookDelay?: number,
                                        requestShippingAddress?: boolean, referenceNumber?: string): FormContainer {
        const requestId = PaymentHighwayUtility.createRequestId();
        let nameValuePairs = this.createCommonNameValuePairs(successUrl, failureUrl, cancelUrl, language, requestId);

        nameValuePairs.push(new Pair(FormBuilder.SPH_AMOUNT, amount.toString()));
        nameValuePairs.push(new Pair(FormBuilder.SPH_CURRENCY, currency));
        nameValuePairs.push(new Pair(FormBuilder.SPH_ORDER, orderId));
        nameValuePairs.push(new Pair(FormBuilder.DESCRIPTION, description));

        if (typeof skipFormNotifications !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_SKIP_FORM_NOTIFICATIONS, skipFormNotifications.toString()));
        }
        if (typeof exitIframeOnResult !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_EXIT_IFRAME_ON_RESULT, exitIframeOnResult.toString()));
        }
        if (typeof exitIframeOn3ds !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_EXIT_IFRAME_ON_THREE_D_SECURE, exitIframeOn3ds.toString()));
        }
        if (typeof use3ds !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_USE_THREE_D_SECURE, use3ds.toString()));
        }
        if (typeof requestShippingAddress !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_REQUEST_SHIPPING_ADDRESS, requestShippingAddress.toString()));
        }
        if (typeof referenceNumber !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_REFERENCE_NUMBER, referenceNumber));
        }

        nameValuePairs = nameValuePairs.concat(FormBuilder.createWebhookNameValuePairs(webhookSuccessUrl, webhookFailureUrl, webhookCancelUrl, webhookDelay));

        const masterpassUri = '/form/view/masterpass';
        const signature = this.createSignature(masterpassUri, nameValuePairs);

        nameValuePairs.push(new Pair(FormBuilder.SIGNATURE, signature));

        return new FormContainer(this.method, this.baseUrl, masterpassUri, nameValuePairs, requestId);
    }

    /**
     * Get parameters for Siirto request.
     *
     * @param successUrl            The URL the user is redirected after the transaction is handled. The payment itself may still be rejected.
     * @param failureUrl            The URL the user is redirected after a failure such as an authentication or connectivity error.
     * @param cancelUrl             The URL the user is redirected after cancelling the transaction (clicking on the cancel button).
     * @param language              The language the form is displayed in.
     * @param amount                The amount to pay in euro cents. Siirto supports only euros.
     * @param orderId               A generated order ID, may for example be always unique or used multiple times for recurring transactions.
     * @param description           Description of the payment shown in the form.
     * @param referenceNumber       Reference number
     * @param phoneNumber           User phone number with country code. Max AN 15. Optional
     * @param exitIframeOnResult     Exit from iframe after a result. May be null.
     * @param webhookSuccessUrl     The URL the PH server makes request after the transaction is handled. The payment itself may still be rejected.
     * @param webhookFailureUrl     The URL the PH server makes request after a failure such as an authentication or connectivity error.
     * @param webhookCancelUrl      The URL the PH server makes request after cancelling the transaction (clicking on the cancel button).
     * @param webhookDelay          Delay for webhook in seconds. Between 0-900
     * @return FormContainer
     */
    public generateSiirtoParameters(successUrl: string, failureUrl: string, cancelUrl: string, language: string,
                                    amount: number, orderId: string, description: string, referenceNumber: string,
                                    phoneNumber?: string, exitIframeOnResult?: boolean, webhookSuccessUrl?: string, webhookFailureUrl?: string,
                                    webhookCancelUrl?: string, webhookDelay?: number): FormContainer {
        const requestId = PaymentHighwayUtility.createRequestId();
        let nameValuePairs = this.createCommonNameValuePairs(successUrl, failureUrl, cancelUrl, language, requestId);

        nameValuePairs.push(new Pair(FormBuilder.SPH_AMOUNT, amount.toString()));
        // Siirto supports only euros
        nameValuePairs.push(new Pair(FormBuilder.SPH_CURRENCY, 'EUR'));
        nameValuePairs.push(new Pair(FormBuilder.SPH_ORDER, orderId));
        nameValuePairs.push(new Pair(FormBuilder.SPH_REFERENCE_NUMBER, referenceNumber));
        nameValuePairs.push(new Pair(FormBuilder.DESCRIPTION, description));

        if (typeof exitIframeOnResult !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_EXIT_IFRAME_ON_RESULT, exitIframeOnResult.toString()));
        }
        if (typeof phoneNumber !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_PHONE_NUMBER, phoneNumber));
        }

        nameValuePairs = nameValuePairs.concat(FormBuilder.createWebhookNameValuePairs(webhookSuccessUrl, webhookFailureUrl, webhookCancelUrl, webhookDelay));

        const siirtoUri = '/form/view/siirto';
        const signature = this.createSignature(siirtoUri, nameValuePairs);

        nameValuePairs.push(new Pair(FormBuilder.SIGNATURE, signature));

        return new FormContainer(this.method, this.baseUrl, siirtoUri, nameValuePairs, requestId);

    }

    /**
     * Get parameters for Pivo request.
     *
     * @param successUrl             The URL the user is redirected after the transaction is handled. The payment itself may still be rejected.
     * @param failureUrl             The URL the user is redirected after a failure such as an authentication or connectivity error.
     * @param cancelUrl              The URL the user is redirected after cancelling the transaction (clicking on the cancel button).
     * @param language               The language the form is displayed in.
     * @param amount                 The amount to pay in euro cents. Pivo supports only euros.
     * @param orderId                A generated order ID, may for example be always unique or used multiple times for recurring transactions.
     * @param description            Description of the payment shown in the form.
     * @param phoneNumber            User phone number with country code. Max AN 15. Optional.
     * @param referenceNumber        Reference number for payment. Optional.
     * @param appUrl                 When used, Pivo tries to open application with this url. Optional.
     * @param exitIframeOnResult     Exit from iframe after a result. May be null.
     * @param webhookSuccessUrl      The URL the PH server makes request after the transaction is handled. The payment itself may still be rejected.
     * @param webhookFailureUrl      The URL the PH server makes request after a failure such as an authentication or connectivity error.
     * @param webhookCancelUrl       The URL the PH server makes request after cancelling the transaction (clicking on the cancel button).
     * @param webhookDelay           Delay for webhook in seconds. Between 0-900
     * @return FormContainer
     */
    public generatePivoParameters(successUrl: string, failureUrl: string, cancelUrl: string, language: string,
                                  amount: number, orderId: string, description: string, referenceNumber?: string,
                                  phoneNumber?: string, appUrl?: string, exitIframeOnResult?: boolean,
                                  webhookSuccessUrl?: string, webhookFailureUrl?: string, webhookCancelUrl?: string,
                                  webhookDelay?: number): FormContainer {
        const requestId = PaymentHighwayUtility.createRequestId();
        let nameValuePairs = this.createCommonNameValuePairs(successUrl, failureUrl, cancelUrl, language, requestId);

        nameValuePairs.push(new Pair(FormBuilder.SPH_AMOUNT, amount.toString()));
        nameValuePairs.push(new Pair(FormBuilder.SPH_CURRENCY, 'EUR'));
        nameValuePairs.push(new Pair(FormBuilder.SPH_ORDER, orderId));
        nameValuePairs.push(new Pair(FormBuilder.DESCRIPTION, description));

        if (typeof exitIframeOnResult !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_EXIT_IFRAME_ON_RESULT, exitIframeOnResult.toString()));
        }
        if (typeof phoneNumber !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_PHONE_NUMBER, phoneNumber));
        }
        if (typeof referenceNumber !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_REFERENCE_NUMBER, referenceNumber));
        }
        if (typeof appUrl !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_APP_URL, appUrl));
        }

        nameValuePairs = nameValuePairs.concat(FormBuilder.createWebhookNameValuePairs(webhookSuccessUrl, webhookFailureUrl, webhookCancelUrl, webhookDelay));

        const pivoUri = '/form/view/pivo';

        const signature = this.createSignature(pivoUri, nameValuePairs);

        nameValuePairs.push(new Pair(FormBuilder.SIGNATURE, signature));

        return new FormContainer(this.method, this.baseUrl, pivoUri, nameValuePairs, requestId);
    }

    /**
     * Get parameters for AfterPay form request.
     *
     * @param successUrl             The URL the user is redirected after the transaction is handled. The payment itself may still be rejected.
     * @param failureUrl             The URL the user is redirected after a failure such as an authentication or connectivity error.
     * @param cancelUrl              The URL the user is redirected after cancelling the transaction (clicking on the cancel button).
     * @param language               The language the form is displayed in.
     * @param amount                 The amount to pay in euro cents.
     * @param orderId                A generated order ID, may for example be always unique or used multiple times for recurring transactions.
     * @param description            Description of the payment shown in the form.
     * @param orderDescription       Description of the purchase. Will be shown on the customer's invoice. Max length 255.
     * @param socialSecurityNumber   The customer's social security number. If set, the value will be pre-filled on the form.
     * @param emailAddress           The customer's email address. If set, the value will be pre-filled on the form.
     * @param exitIframeOnResult     Exit from iframe after a result. May be null.
     * @param webhookSuccessUrl      The URL the PH server makes request after the transaction is handled. The payment itself may still be rejected.
     * @param webhookFailureUrl      The URL the PH server makes request after a failure such as an authentication or connectivity error.
     * @param webhookCancelUrl       The URL the PH server makes request after cancelling the transaction (clicking on the cancel button).
     * @param webhookDelay           Delay for webhook in seconds. Between 0-900
     * @param referenceNumber       Reference number in RF or Finnish reference format, used when settling the transaction to the merchant account. Only used if one-by-ony transaction settling is configured.
     * @return FormContainer
     */
    public generateAfterPayParameters(successUrl: string, failureUrl: string, cancelUrl: string, language: string,
                                  amount: number, orderId: string, description: string, orderDescription: string,
                                  socialSecurityNumber?: string, emailAddress?: string, exitIframeOnResult?: boolean,
                                  webhookSuccessUrl?: string, webhookFailureUrl?: string, webhookCancelUrl?: string,
                                  webhookDelay?: number, referenceNumber?: string): FormContainer {
        const requestId = PaymentHighwayUtility.createRequestId();
        let nameValuePairs = this.createCommonNameValuePairs(successUrl, failureUrl, cancelUrl, language, requestId);

        nameValuePairs.push(new Pair(FormBuilder.SPH_AMOUNT, amount.toString()));
        nameValuePairs.push(new Pair(FormBuilder.SPH_CURRENCY, 'EUR'));
        nameValuePairs.push(new Pair(FormBuilder.SPH_ORDER, orderId));
        nameValuePairs.push(new Pair(FormBuilder.DESCRIPTION, description));
        nameValuePairs.push(new Pair(FormBuilder.SPH_ORDER_DESCRIPTION, orderDescription));

        if (typeof exitIframeOnResult !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_EXIT_IFRAME_ON_RESULT, exitIframeOnResult.toString()));
        }
        if (typeof socialSecurityNumber !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_SOCIAL_SECURITY_NUMBER, socialSecurityNumber));
        }
        if (typeof emailAddress !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_EMAIL_ADDRESS, emailAddress));
        }
        if (typeof referenceNumber !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_REFERENCE_NUMBER, referenceNumber));
        }

        nameValuePairs = nameValuePairs.concat(FormBuilder.createWebhookNameValuePairs(webhookSuccessUrl, webhookFailureUrl, webhookCancelUrl, webhookDelay));

        const uri = '/form/view/afterpay';

        const signature = this.createSignature(uri, nameValuePairs);

        nameValuePairs.push(new Pair(FormBuilder.SIGNATURE, signature));

        return new FormContainer(this.method, this.baseUrl, uri, nameValuePairs, requestId);
    }

    /**
     *
     * @param webhookSuccessUrl
     * @param webhookFailureUrl
     * @param webhookCancelUrl
     * @param webhookDelay
     * @returns {Array}
     */
    private static createWebhookNameValuePairs(webhookSuccessUrl?: string, webhookFailureUrl?: string, webhookCancelUrl?: string,
                                               webhookDelay?: number) {
        let nameValuePairs = [];
        if (typeof webhookSuccessUrl !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_WEBHOOK_SUCCESS_URL, webhookSuccessUrl));
        }
        if (typeof webhookFailureUrl !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_WEBHOOK_FAILURE_URL, webhookFailureUrl));
        }
        if (typeof webhookCancelUrl !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_WEBHOOK_CANCEL_URL, webhookCancelUrl));
        }
        if (typeof webhookDelay !== 'undefined') {
            nameValuePairs.push(new Pair(FormBuilder.SPH_WEBHOOK_DELAY, webhookDelay.toString()));
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
    private createCommonNameValuePairs(successUrl: string, failureUrl: string, cancelUrl: string, language: string,
                                       requestId: string): Pair<string, string>[] {
        return [
            new Pair(FormBuilder.SPH_API_VERSION, FormBuilder.FORM_API_VERSION),
            new Pair(FormBuilder.SPH_ACCOUNT, this.account),
            new Pair(FormBuilder.SPH_MERCHANT, this.merchant),
            new Pair(FormBuilder.SPH_TIMESTAMP, PaymentHighwayUtility.getUtcTimestamp()),
            new Pair(FormBuilder.SPH_CANCEL_URL, cancelUrl),
            new Pair(FormBuilder.SPH_FAILURE_URL, failureUrl),
            new Pair(FormBuilder.SPH_SUCCESS_URL, successUrl),
            new Pair(FormBuilder.SPH_REQUEST_ID, requestId),
            new Pair(FormBuilder.LANGUAGE, language)
        ];
    }

    /**
     *
     * @param uri
     * @param nameValuePairs
     * @returns {string}
     */
    private createSignature(uri: string, nameValuePairs: Pair<string, string>[]): string {
        return this.secureSigner.createSignature(this.method, uri, nameValuePairs, '');
    }
}
