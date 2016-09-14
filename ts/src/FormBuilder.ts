import {Method} from './util/Method';
import {PaymentHighwayUtility} from './PaymentHighwayUtility';
import {Pair} from './util/Pair';
import {SecureSigner} from './security/SecureSigner';
import {FormContainer} from './FormContainer';

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

    constructor(private method: Method = FormBuilder.METHOD_POST,
                private signatureKeyId: string,
                private signatureSecret: string,
                private account: string,
                private merchant: string,
                private baseUrl: string) {
    }

    public generateAddCardParameters(successUrl: string, failureUrl: string, cancelUrl: string, language: string,
                                     acceptCvcRequired?: boolean, skipFormNotifications?: boolean,
                                     exitIframeOnResult?: boolean, exitIframeOn3ds?: boolean, use3ds?: boolean): FormContainer {
        const requestId = PaymentHighwayUtility.createRequestId();
        let nameValuePairs = this.createCommonNameValuePairs(successUrl, failureUrl, cancelUrl, language, requestId);

        if (acceptCvcRequired) {
            nameValuePairs.push(new Pair(FormBuilder.SPH_ACCEPT_CVC_REQUIRED, acceptCvcRequired.toString()));
        }
        if (skipFormNotifications) {
            nameValuePairs.push(new Pair(FormBuilder.SPH_SKIP_FORM_NOTIFICATIONS, skipFormNotifications.toString()));
        }
        if (exitIframeOnResult) {
            nameValuePairs.push(new Pair(FormBuilder.SPH_EXIT_IFRAME_ON_RESULT, exitIframeOnResult.toString()));
        }
        if (exitIframeOn3ds) {
            nameValuePairs.push(new Pair(FormBuilder.SPH_EXIT_IFRAME_ON_THREE_D_SECURE, exitIframeOn3ds.toString()));
        }
        if (use3ds) {
            nameValuePairs.push(new Pair(FormBuilder.SPH_USE_THREE_D_SECURE, use3ds.toString()));
        }

        const addCardUri = '/form/view/add_card';
        const signature = this.createSignature(addCardUri, nameValuePairs);
        nameValuePairs.push(new Pair(FormBuilder.SIGNATURE, signature));

        return new FormContainer(this.method, this.baseUrl, addCardUri, nameValuePairs, requestId);
    }

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

        if (skipFormNotifications) {
            nameValuePairs.push(new Pair(FormBuilder.SPH_SKIP_FORM_NOTIFICATIONS, skipFormNotifications.toString()));
        }
        if (exitIframeOnResult) {
            nameValuePairs.push(new Pair(FormBuilder.SPH_EXIT_IFRAME_ON_RESULT, exitIframeOnResult.toString()));
        }
        if (exitIframeOn3ds) {
            nameValuePairs.push(new Pair(FormBuilder.SPH_EXIT_IFRAME_ON_THREE_D_SECURE, exitIframeOn3ds.toString()));
        }
        if (use3ds) {
            nameValuePairs.push(new Pair(FormBuilder.SPH_USE_THREE_D_SECURE, use3ds.toString()));
        }

        const payWithCardUri = '/form/view/pay_with_card';
        const signature = this.createSignature(payWithCardUri, nameValuePairs);
        nameValuePairs.push(new Pair(FormBuilder.SIGNATURE, signature));

        return new FormContainer(this.method, this.baseUrl, payWithCardUri, nameValuePairs, requestId);
    }

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
        if (skipFormNotifications) {
            nameValuePairs.push(new Pair(FormBuilder.SPH_SKIP_FORM_NOTIFICATIONS, skipFormNotifications.toString()));
        }
        if (exitIframeOnResult) {
            nameValuePairs.push(new Pair(FormBuilder.SPH_EXIT_IFRAME_ON_RESULT, exitIframeOnResult.toString()));
        }
        if (exitIframeOn3ds) {
            nameValuePairs.push(new Pair(FormBuilder.SPH_EXIT_IFRAME_ON_THREE_D_SECURE, exitIframeOn3ds.toString()));
        }
        if (use3ds) {
            nameValuePairs.push(new Pair(FormBuilder.SPH_USE_THREE_D_SECURE, use3ds.toString()));
        }

        const payWithTokenAndCvcUri = '/form/view/pay_with_token_and_cvc';
        const signature = this.createSignature(payWithTokenAndCvcUri, nameValuePairs);
        nameValuePairs.push(new Pair(FormBuilder.SIGNATURE, signature));

        return new FormContainer(this.method, this.baseUrl, payWithTokenAndCvcUri, nameValuePairs, requestId);
    }

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

    private createSignature(uri: string, nameValuePairs: Pair<string, string>[]): string {
        const ss = new SecureSigner(this.signatureKeyId, this.signatureSecret);
        return ss.createSignature(this.method, uri, nameValuePairs, '');
    }
}
