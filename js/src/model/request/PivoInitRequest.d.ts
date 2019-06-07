export declare class PivoInitRequest {
    amount: number;
    currency: string;
    order: string;
    app_url?: string;
    reference_number?: string;
    webhook_success_url?: string;
    webhook_cancel_url?: string;
    webhook_failure_url?: string;
    language?: string;
    phone_number?: string;
    constructor(amount: number, currency: string, order: string, app_url?: string, reference_number?: string, webhook_success_url?: string, webhook_cancel_url?: string, webhook_failure_url?: string, language?: string, phone_number?: string);
    static Builder(amount: number, currency?: string): PivoInit.RequestBuilder;
}
export declare namespace PivoInit {
    class RequestBuilder {
        private readonly amount;
        private readonly currency;
        private order;
        private app_url;
        private reference_number;
        private language;
        private webhook_success_url;
        private webhook_cancel_url;
        private webhook_failure_url;
        private phone_number;
        constructor(amount: number, currency: string);
        setOrder(order: string): this;
        setAppUrl(url: string): this;
        setReferenceNumber(ref: string): this;
        setPhoneNumber(phone_number: string): this;
        setLanguage(language: string): this;
        setWebhookSuccessUrl(url: string): this;
        setWebhookCancelUrl(url: string): this;
        setWebhookFailureUrl(url: string): this;
        build(): PivoInitRequest;
    }
}
