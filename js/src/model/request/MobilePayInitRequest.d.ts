import { Request } from './PhRequest';
import { Splitting } from '../Splitting';
export declare class MobilePayInitRequest extends Request {
    amount: number;
    currency: string;
    order: string;
    return_uri: string;
    webhook_success_url: string;
    webhook_cancel_url: string;
    webhook_failure_url: string;
    language?: string;
    sub_merchant_name?: string;
    sub_merchant_id?: string;
    shop_name?: string;
    shop_logo_url?: string;
    reference_number?: string;
    splitting?: Splitting;
    constructor(amount: number, currency: string, order: string, return_uri: string, webhook_success_url: string, webhook_cancel_url: string, webhook_failure_url: string, language?: string, sub_merchant_name?: string, sub_merchant_id?: string, shop_name?: string, shop_logo_url?: string, reference_number?: string, splitting?: Splitting);
    static Builder(amount: number, currency: string): MobilePayInit.RequestBuilder;
}
export declare namespace MobilePayInit {
    class RequestBuilder {
        private readonly amount;
        private readonly currency;
        private order;
        private return_uri;
        private language;
        private webhook_success_url;
        private webhook_cancel_url;
        private webhook_failure_url;
        private sub_merchant_name;
        private sub_merchant_id;
        private shop_name;
        private shop_logo_url;
        private reference_number;
        private splitting;
        constructor(amount: number, currency: string);
        setOrder(order: string): this;
        setReturnUri(uri: string): this;
        setLanguage(language: string): this;
        setWebhookSuccessUrl(url: string): this;
        setWebhookCancelUrl(url: string): this;
        setWebhookFailureUrl(url: string): this;
        setSubMerchantName(name: string): this;
        setSubMerchantId(id: string): this;
        setShopName(name: string): this;
        setShopLogoUrl(url: string): this;
        setSplitting(splitting: Splitting): this;
        /**
         * Reference number used when settling the transaction to the merchant account.
         * Only used if one-by-ony transaction settling is configured.
         * @param referenceNumber In RF or Finnish reference number format.
         */
        setReferenceNumber(referenceNumber: string): this;
        build(): MobilePayInitRequest;
    }
}
