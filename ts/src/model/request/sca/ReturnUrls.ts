export class ReturnUrls {
    constructor(
        public success_url: string,
        public cancel_url: string,
        public failure_url: string,
        public webhook_success_url?: string,
        public webhook_cancel_url?: string,
        public webhook_failure_url?: string,
        public webhook_delay?: number
    ) {
    }

    /**
     * @param successUrl The URL the user is redirected after the transaction is handled. The payment itself may still be rejected.
     * @param failureUrl The URL the user is redirected after a failure such as an authentication or connectivity error.
     * @param cancelUrl  The URL the user is redirected after cancelling the transaction (clicking on the cancel button).
     */
    public static Builder(
        successUrl: string,
        cancelUrl: string,
        failureUrl: string
    ): ReturnUrlsBuilder.RequestBuilder {
        return new ReturnUrlsBuilder.RequestBuilder(
            successUrl,
            cancelUrl,
            failureUrl
        );
    }
}

export namespace ReturnUrlsBuilder {
    export class RequestBuilder {
        private readonly success_url: string;
        private readonly cancel_url: string;
        private readonly failure_url: string;
        private webhook_success_url: string;
        private webhook_cancel_url: string;
        private webhook_failure_url: string;
        private webhook_delay: number;

        constructor(success_url: string, cancel_url: string, failure_url: string) {
            this.success_url = success_url;
            this.cancel_url = cancel_url;
            this.failure_url = failure_url;
        }

        /**
         /**
         * The URL the PH server makes request to after the transaction is handled. The payment itself may still be rejected.
         *
         * @param webhookSuccessUrl Webhook url to call when request is successfully handled
         * @return a reference to this Builder
         */
        public setWebhookSuccessUrl(webhookSuccessUrl: string) {
            this.webhook_success_url = webhookSuccessUrl;
            return this;
        }

        /**
         * The URL the PH server makes request to after a failure such as an authentication or connectivity error.
         *
         * @param webhookFailureUrl Webhook url to call when request failed
         * @return a reference to this Builder
         */
        public setWebhookFailureUrl(webhookFailureUrl: string) {
            this.webhook_failure_url = webhookFailureUrl;
            return this;
        }

        /**
         * The URL the PH server makes request to after cancelling the transaction (clicking on the cancel button).
         *
         * @param webhookCancelUrl Webhook url to call when user cancels request
         * @return a reference to this Builder
         */
        public setWebhookCancelUrl(webhookCancelUrl: string) {
            this.webhook_cancel_url = webhookCancelUrl;
            return this;
        }

        /**
         * Delay for webhook in seconds. Between 0-900
         *
         * @param webhookDelay Webhook triggering delay in seconds
         * @return a reference to this Builder
         */
        public setWebhookDelay(webhookDelay: number) {
            this.webhook_delay = webhookDelay;
            return this;
        }

        public build(): ReturnUrls {
            return new ReturnUrls(
                this.success_url,
                this.cancel_url,
                this.failure_url,
                this.webhook_success_url,
                this.webhook_cancel_url,
                this.webhook_failure_url,
                this.webhook_delay
            );
        }
    }
}