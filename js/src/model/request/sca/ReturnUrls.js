"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ReturnUrls {
    /**
     * @param success_url Success URL the user is redirected after 3DS if SCA is required
     * @param cancel_url Cancel URL the user is redirected after 3DS if SCA is required
     * @param failure_url Failure URL the user is redirected after 3DS if SCA is required
     * @param webhook_success_url Webhook URL that is called (server-to-server) after successful 3DS if SCA is required
     * @param webhook_cancel_url Webhook URL that is called (server-to-server) after cancelled 3DS if SCA is required
     * @param webhook_failure_url Webhook URL that is called (server-to-server) after failed 3DS if SCA is required
     * @param webhook_delay Value 0-900 seconds, the delay between the event and calling of the Webhook
     */
    constructor(success_url, cancel_url, failure_url, webhook_success_url, webhook_cancel_url, webhook_failure_url, webhook_delay) {
        this.success_url = success_url;
        this.cancel_url = cancel_url;
        this.failure_url = failure_url;
        this.webhook_success_url = webhook_success_url;
        this.webhook_cancel_url = webhook_cancel_url;
        this.webhook_failure_url = webhook_failure_url;
        this.webhook_delay = webhook_delay;
    }
}
exports.ReturnUrls = ReturnUrls;
//# sourceMappingURL=ReturnUrls.js.map