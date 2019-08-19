export declare class ScaReturnUrls {
    success_url: string;
    cancel_url: string;
    failure_url: string;
    webhook_success_url?: string;
    webhook_cancel_url?: string;
    webhook_failure_url?: string;
    webhook_delay?: number;
    constructor(success_url: string, cancel_url: string, failure_url: string, webhook_success_url?: string, webhook_cancel_url?: string, webhook_failure_url?: string, webhook_delay?: number);
}
