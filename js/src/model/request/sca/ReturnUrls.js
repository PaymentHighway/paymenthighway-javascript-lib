"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnUrlsBuilder = exports.ReturnUrls = void 0;
class ReturnUrls {
    constructor(success_url, cancel_url, failure_url, webhook_success_url, webhook_cancel_url, webhook_failure_url, webhook_delay) {
        this.success_url = success_url;
        this.cancel_url = cancel_url;
        this.failure_url = failure_url;
        this.webhook_success_url = webhook_success_url;
        this.webhook_cancel_url = webhook_cancel_url;
        this.webhook_failure_url = webhook_failure_url;
        this.webhook_delay = webhook_delay;
    }
    /**
     * @param successUrl The URL the user is redirected after the transaction is handled. The payment itself may still be rejected.
     * @param failureUrl The URL the user is redirected after a failure such as an authentication or connectivity error.
     * @param cancelUrl  The URL the user is redirected after cancelling the transaction (clicking on the cancel button).
     */
    static Builder(successUrl, cancelUrl, failureUrl) {
        return new ReturnUrlsBuilder.RequestBuilder(successUrl, cancelUrl, failureUrl);
    }
}
exports.ReturnUrls = ReturnUrls;
var ReturnUrlsBuilder;
(function (ReturnUrlsBuilder) {
    class RequestBuilder {
        constructor(success_url, cancel_url, failure_url) {
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
        setWebhookSuccessUrl(webhookSuccessUrl) {
            this.webhook_success_url = webhookSuccessUrl;
            return this;
        }
        /**
         * The URL the PH server makes request to after a failure such as an authentication or connectivity error.
         *
         * @param webhookFailureUrl Webhook url to call when request failed
         * @return a reference to this Builder
         */
        setWebhookFailureUrl(webhookFailureUrl) {
            this.webhook_failure_url = webhookFailureUrl;
            return this;
        }
        /**
         * The URL the PH server makes request to after cancelling the transaction (clicking on the cancel button).
         *
         * @param webhookCancelUrl Webhook url to call when user cancels request
         * @return a reference to this Builder
         */
        setWebhookCancelUrl(webhookCancelUrl) {
            this.webhook_cancel_url = webhookCancelUrl;
            return this;
        }
        /**
         * Delay for webhook in seconds. Between 0-900
         *
         * @param webhookDelay Webhook triggering delay in seconds
         * @return a reference to this Builder
         */
        setWebhookDelay(webhookDelay) {
            this.webhook_delay = webhookDelay;
            return this;
        }
        build() {
            return new ReturnUrls(this.success_url, this.cancel_url, this.failure_url, this.webhook_success_url, this.webhook_cancel_url, this.webhook_failure_url, this.webhook_delay);
        }
    }
    ReturnUrlsBuilder.RequestBuilder = RequestBuilder;
})(ReturnUrlsBuilder = exports.ReturnUrlsBuilder || (exports.ReturnUrlsBuilder = {}));
//# sourceMappingURL=ReturnUrls.js.map