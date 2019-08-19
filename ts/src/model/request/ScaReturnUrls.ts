export class ScaReturnUrls {
    constructor(
        public success_url: string,
        public cancel_url: string,
        public failure_url: string,
        public webhook_success_url?: string,
        public webhook_cancel_url?: string,
        public webhook_failure_url?: string,
        public webhook_delay?: number,
    ){}
}