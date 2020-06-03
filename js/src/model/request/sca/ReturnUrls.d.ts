export declare class ReturnUrls {
    success_url: string;
    cancel_url: string;
    failure_url: string;
    webhook_success_url?: string;
    webhook_cancel_url?: string;
    webhook_failure_url?: string;
    webhook_delay?: number;
    constructor(success_url: string, cancel_url: string, failure_url: string, webhook_success_url?: string, webhook_cancel_url?: string, webhook_failure_url?: string, webhook_delay?: number);
    /**
     * @param successUrl The URL the user is redirected after the transaction is handled. The payment itself may still be rejected.
     * @param failureUrl The URL the user is redirected after a failure such as an authentication or connectivity error.
     * @param cancelUrl  The URL the user is redirected after cancelling the transaction (clicking on the cancel button).
     */
    static Builder(successUrl: string, cancelUrl: string, failureUrl: string): ReturnUrlsBuilder.RequestBuilder;
}
export declare namespace ReturnUrlsBuilder {
    class RequestBuilder {
        private readonly success_url;
        private readonly cancel_url;
        private readonly failure_url;
        private webhook_success_url;
        private webhook_cancel_url;
        private webhook_failure_url;
        private webhook_delay;
        constructor(success_url: string, cancel_url: string, failure_url: string);
        /**
         /**
         * The URL the PH server makes request to after the transaction is handled. The payment itself may still be rejected.
         *
         * @param webhookSuccessUrl Webhook url to call when request is successfully handled
         * @return a reference to this Builder
         */
        setWebhookSuccessUrl(webhookSuccessUrl: string): this;
        /**
         * The URL the PH server makes request to after a failure such as an authentication or connectivity error.
         *
         * @param webhookFailureUrl Webhook url to call when request failed
         * @return a reference to this Builder
         */
        setWebhookFailureUrl(webhookFailureUrl: string): this;
        /**
         * The URL the PH server makes request to after cancelling the transaction (clicking on the cancel button).
         *
         * @param webhookCancelUrl Webhook url to call when user cancels request
         * @return a reference to this Builder
         */
        setWebhookCancelUrl(webhookCancelUrl: string): this;
        /**
         * Delay for webhook in seconds. Between 0-900
         *
         * @param webhookDelay Webhook triggering delay in seconds
         * @return a reference to this Builder
         */
        setWebhookDelay(webhookDelay: number): this;
        build(): ReturnUrls;
    }
}
