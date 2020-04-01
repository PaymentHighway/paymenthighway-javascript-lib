import { Method } from './util/Method';
import { FormContainer } from './FormContainer';
/**
 * Creates parameters that can used on the form that sends them to
 * Payment Highway.
 *
 * Creates a request id, timestamp and signature based on request parameters.
 */
export declare class FormBuilder {
    private method;
    private signatureKeyId;
    private signatureSecret;
    private account;
    private merchant;
    private baseUrl;
    private static FORM_API_VERSION;
    private static SPH_API_VERSION;
    private static SPH_ACCEPT_CVC_REQUIRED;
    private static SPH_ACCOUNT;
    private static SPH_MERCHANT;
    private static SPH_AMOUNT;
    private static SPH_CURRENCY;
    private static SPH_ORDER;
    private static SPH_SUCCESS_URL;
    private static SPH_FAILURE_URL;
    private static SPH_CANCEL_URL;
    private static SPH_REQUEST_ID;
    private static SPH_TIMESTAMP;
    private static SPH_TOKEN;
    private static SPH_SKIP_FORM_NOTIFICATIONS;
    private static SPH_EXIT_IFRAME_ON_RESULT;
    private static SPH_EXIT_IFRAME_ON_THREE_D_SECURE;
    private static SPH_USE_THREE_D_SECURE;
    private static SPH_MOBILEPAY_PHONE_NUMBER;
    private static SPH_MOBILEPAY_SHOP_NAME;
    private static SPH_SUB_MERCHANT_NAME;
    private static SPH_SUB_MERCHANT_ID;
    private static SPH_SHOP_LOGO_URL;
    private static SPH_WEBHOOK_SUCCESS_URL;
    private static SPH_WEBHOOK_FAILURE_URL;
    private static SPH_WEBHOOK_CANCEL_URL;
    private static SPH_WEBHOOK_DELAY;
    private static SPH_REQUEST_SHIPPING_ADDRESS;
    private static SPH_PHONE_NUMBER;
    private static SPH_REFERENCE_NUMBER;
    private static SPH_APP_URL;
    private static SPH_ORDER_DESCRIPTION;
    private static SPH_SOCIAL_SECURITY_NUMBER;
    private static SPH_EMAIL_ADDRESS;
    private static LANGUAGE;
    private static DESCRIPTION;
    private static SIGNATURE;
    private secureSigner;
    constructor(method: Method, signatureKeyId: string, signatureSecret: string, account: string, merchant: string, baseUrl: string);
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
    generateAddCardParameters(successUrl: string, failureUrl: string, cancelUrl: string, language: string, acceptCvcRequired?: boolean, skipFormNotifications?: boolean, exitIframeOnResult?: boolean, exitIframeOn3ds?: boolean, use3ds?: boolean, webhookSuccessUrl?: string, webhookFailureUrl?: string, webhookCancelUrl?: string, webhookDelay?: number): FormContainer;
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
     * @param showPaymentMethodSelector Deprecated
     * @param referenceNumber           Reference number in RF or Finnish reference format, used when settling the transaction to the merchant account. Only used if one-by-ony transaction settling is configured.
     * @returns {FormContainer}
     */
    generatePaymentParameters(successUrl: string, failureUrl: string, cancelUrl: string, language: string, amount: number, currency: string, orderId: string, description: string, skipFormNotifications?: boolean, exitIframeOnResult?: boolean, exitIframeOn3ds?: boolean, use3ds?: boolean, webhookSuccessUrl?: string, webhookFailureUrl?: string, webhookCancelUrl?: string, webhookDelay?: number, showPaymentMethodSelector?: boolean, referenceNumber?: string): FormContainer;
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
    generateAddCardAndPaymentParameters(successUrl: string, failureUrl: string, cancelUrl: string, language: string, amount: number, currency: string, orderId: string, description: string, skipFormNotifications?: boolean, exitIframeOnResult?: boolean, exitIframeOn3ds?: boolean, use3ds?: boolean, webhookSuccessUrl?: string, webhookFailureUrl?: string, webhookCancelUrl?: string, webhookDelay?: number, referenceNumber?: string): FormContainer;
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
    generatePayWithTokenAndCvcParameters(token: string, successUrl: string, failureUrl: string, cancelUrl: string, language: string, amount: number, currency: string, orderId: string, description: string, skipFormNotifications?: boolean, exitIframeOnResult?: boolean, exitIframeOn3ds?: boolean, use3ds?: boolean, webhookSuccessUrl?: string, webhookFailureUrl?: string, webhookCancelUrl?: string, webhookDelay?: number, referenceNumber?: string): FormContainer;
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
    generatePayWithMobilePayParameters(successUrl: string, failureUrl: string, cancelUrl: string, language: string, amount: number, currency: string, orderId: string, description: string, exitIframeOnResult?: boolean, shopLogoUrl?: string, phoneNumber?: string, shopName?: string, subMerchantId?: string, subMerchantName?: string, webhookSuccessUrl?: string, webhookFailureUrl?: string, webhookCancelUrl?: string, webhookDelay?: number, referenceNumber?: string): FormContainer;
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
    generateMasterPassParameters(successUrl: string, failureUrl: string, cancelUrl: string, language: string, amount: number, currency: string, orderId: string, description: string, skipFormNotifications?: boolean, exitIframeOnResult?: boolean, exitIframeOn3ds?: boolean, use3ds?: boolean, webhookSuccessUrl?: string, webhookFailureUrl?: string, webhookCancelUrl?: string, webhookDelay?: number, requestShippingAddress?: boolean, referenceNumber?: string): FormContainer;
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
    generatePivoParameters(successUrl: string, failureUrl: string, cancelUrl: string, language: string, amount: number, orderId: string, description: string, referenceNumber?: string, phoneNumber?: string, appUrl?: string, exitIframeOnResult?: boolean, webhookSuccessUrl?: string, webhookFailureUrl?: string, webhookCancelUrl?: string, webhookDelay?: number): FormContainer;
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
    generateAfterPayParameters(successUrl: string, failureUrl: string, cancelUrl: string, language: string, amount: number, orderId: string, description: string, orderDescription: string, socialSecurityNumber?: string, emailAddress?: string, exitIframeOnResult?: boolean, webhookSuccessUrl?: string, webhookFailureUrl?: string, webhookCancelUrl?: string, webhookDelay?: number, referenceNumber?: string): FormContainer;
    /**
     *
     * @param webhookSuccessUrl
     * @param webhookFailureUrl
     * @param webhookCancelUrl
     * @param webhookDelay
     * @returns {Array}
     */
    private static createWebhookNameValuePairs;
    /**
     *
     * @param successUrl
     * @param failureUrl
     * @param cancelUrl
     * @param language
     * @param requestId
     * @returns {Pair[]}
     */
    private createCommonNameValuePairs;
    /**
     *
     * @param uri
     * @param nameValuePairs
     * @returns {string}
     */
    private createSignature;
}
