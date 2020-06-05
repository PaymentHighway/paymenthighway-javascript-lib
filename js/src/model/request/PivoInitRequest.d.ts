import { Splitting } from '../Splitting';
import { Request } from './PhRequest';
export declare class PivoInitRequest extends Request {
    amount: number;
    currency: string;
    order: string;
    description?: string;
    app_url?: string;
    reference_number?: string;
    webhook_success_url?: string;
    webhook_cancel_url?: string;
    webhook_failure_url?: string;
    language?: string;
    phone_number?: string;
    splitting?: Splitting;
    constructor(amount: number, currency: string, order: string, description?: string, app_url?: string, reference_number?: string, webhook_success_url?: string, webhook_cancel_url?: string, webhook_failure_url?: string, language?: string, phone_number?: string, splitting?: Splitting);
    static Builder(amount: number, currency?: string): PivoInit.RequestBuilder;
}
export declare namespace PivoInit {
    class RequestBuilder {
        private readonly amount;
        private readonly currency;
        private order;
        private description;
        private app_url;
        private reference_number;
        private language;
        private webhook_success_url;
        private webhook_cancel_url;
        private webhook_failure_url;
        private phone_number;
        private splitting;
        constructor(amount: number, currency: string);
        setOrder(order: string): this;
        setDescription(description: string): this;
        setAppUrl(url: string): this;
        setReferenceNumber(ref: string): this;
        setPhoneNumber(phone_number: string): this;
        setLanguage(language: string): this;
        setWebhookSuccessUrl(url: string): this;
        setWebhookCancelUrl(url: string): this;
        setWebhookFailureUrl(url: string): this;
        setSplitting(splitting: Splitting): this;
        build(): PivoInitRequest;
    }
}
