export class ReturnUrls {

    /**
     * @param success_url Success URL the user is redirected after 3DS if SCA is required
     * @param cancel_url Cancel URL the user is redirected after 3DS if SCA is required
     * @param failure_url Failure URL the user is redirected after 3DS if SCA is required
     * @param webhook_success_url Webhook URL that is called (server-to-server) after successful 3DS if SCA is required
     * @param webhook_cancel_url Webhook URL that is called (server-to-server) after cancelled 3DS if SCA is required
     * @param webhook_failure_url Webhook URL that is called (server-to-server) after failed 3DS if SCA is required
     * @param webhook_delay Value 0-900 seconds, the delay between the event and calling of the Webhook
     */
    constructor(
        public success_url: string,
        public cancel_url: string,
        public failure_url: string,
        public webhook_success_url?: string,
        public webhook_cancel_url?: string,
        public webhook_failure_url?: string,
        public webhook_delay?: number
    ){}
}