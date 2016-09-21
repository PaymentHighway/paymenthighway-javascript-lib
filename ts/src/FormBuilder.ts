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
    private static METHOD_POST: Method = 'POST';
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
    private static LANGUAGE: string = 'language';
    private static DESCRIPTION: string = 'description';
    private static SIGNATURE: string = 'signature';

    constructor(private method: Method,
                private signatureKeyId: string,
                private signatureSecret: string,
                private account: string,
                private merchant: string,
                private baseUrl: string) {
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
     * @returns {FormContainer}
     */
    public generateAddCardParameters(successUrl: string, failureUrl: string, cancelUrl: string, language: string,
                                     acceptCvcRequired?: boolean, skipFormNotifications?: boolean,
                                     exitIframeOnResult?: boolean, exitIframeOn3ds?: boolean, use3ds?: boolean): FormContainer {
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
     * @returns {FormContainer}
     */
    public generatePaymentParameters(successUrl: string, failureUrl: string, cancelUrl: string, language: string,
                                     amount: number, currency: string, orderId: string, description: string,
                                     skipFormNotifications?: boolean, exitIframeOnResult?: boolean,
                                     exitIframeOn3ds?: boolean, use3ds?: boolean): FormContainer {

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
     * @return {FormContainer}
     */
    public generateAddCardAndPaymentParameters(successUrl: string, failureUrl: string, cancelUrl: string,
                                               language: string, amount: number, currency: string, orderId: string,
                                               description: string, skipFormNotifications?: boolean,
                                               exitIframeOnResult?: boolean, exitIframeOn3ds?: boolean,
                                               use3ds?: boolean): FormContainer {
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
     * @returns {FormContainer}
     */
    public generatePayWithTokenAndCvcParameters(token: string, successUrl: string, failureUrl: string,
                                                cancelUrl: string, language: string, amount: number, currency: string,
                                                orderId: string, description: string, skipFormNotifications?: boolean,
                                                exitIframeOnResult?: boolean, exitIframeOn3ds?: boolean,
                                                use3ds?: boolean): FormContainer {

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

        const payWithTokenAndCvcUri = '/form/view/pay_with_token_and_cvc';
        const signature = this.createSignature(payWithTokenAndCvcUri, nameValuePairs);
        nameValuePairs.push(new Pair(FormBuilder.SIGNATURE, signature));

        return new FormContainer(this.method, this.baseUrl, payWithTokenAndCvcUri, nameValuePairs, requestId);
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
            new Pair(FormBuilder.SPH_API_VERSION, '20151028'),
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
        const ss = new SecureSigner(this.signatureKeyId, this.signatureSecret);
        return ss.createSignature(this.method, uri, nameValuePairs, '');
    }
}
