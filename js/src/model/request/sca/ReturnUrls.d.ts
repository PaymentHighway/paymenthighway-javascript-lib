export declare class ReturnUrls {
    success_url: string;
    cancel_url: string;
    failure_url: string;
    webhook_success_url?: string;
    webhook_cancel_url?: string;
    webhook_failure_url?: string;
    webhook_delay?: number;
    /**
     * @param success_url Success URL the user is redirected after 3DS if SCA is required
     * @param cancel_url Cancel URL the user is redirected after 3DS if SCA is required
     * @param failure_url Failure URL the user is redirected after 3DS if SCA is required
     * @param webhook_success_url Webhook URL that is called (server-to-server) after successful 3DS if SCA is required
     * @param webhook_cancel_url Webhook URL that is called (server-to-server) after cancelled 3DS if SCA is required
     * @param webhook_failure_url Webhook URL that is called (server-to-server) after failed 3DS if SCA is required
     * @param webhook_delay Value 0-900 seconds, the delay between the event and calling of the Webhook
     */
    constructor(success_url: string, cancel_url: string, failure_url: string, webhook_success_url?: string, webhook_cancel_url?: string, webhook_failure_url?: string, webhook_delay?: number);
}
