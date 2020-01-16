import { Request } from './PhRequest';

export class MobilePayInitRequest extends Request {
    constructor(
        public amount: number,
        public currency: string,
        public order: string,
        public return_uri: string,
        public webhook_success_url: string,
        public webhook_cancel_url: string,
        public webhook_failure_url: string,
        public language?: string,
        public sub_merchant_name?: string,
        public sub_merchant_id?: string,
        public shop_name?: string,
        public shop_logo_url?: string,
        public reference_number?: string
    ) {
            super();
    }

    public static Builder(amount: number, currency: string) {
        return new MobilePayInit.RequestBuilder(amount, currency);
    }
}

export namespace MobilePayInit {
    export class RequestBuilder {
        private readonly amount: number;
        private readonly currency: string;
        private order: string;
        private return_uri: string;
        private language: string;
        private webhook_success_url: string;
        private webhook_cancel_url: string;
        private webhook_failure_url: string;
        private sub_merchant_name: string;
        private sub_merchant_id: string;
        private shop_name: string;
        private shop_logo_url: string;
        private reference_number: string;

        constructor(amount: number, currency: string) {
            this.amount = amount;
            this.currency = currency;
        }

        public setOrder(order: string) {
            this.order = order;
            return this;
        }

        public setReturnUri(uri: string) {
            this.return_uri = uri;
            return this;
        }

        public setLanguage(language: string) {
            this.language = language;
            return this;
        }

        public setWebhookSuccessUrl(url: string) {
            this.webhook_success_url = url;
            return this;
        }

        public setWebhookCancelUrl(url: string) {
            this.webhook_cancel_url = url;
            return this;
        }

        public setWebhookFailureUrl(url: string) {
            this.webhook_failure_url = url;
            return this;
        }

        public setSubMerchantName(name: string) {
            this.sub_merchant_name = name;
            return this;
        }

        public setSubMerchantId(id: string) {
            this.sub_merchant_id = id;
            return this;
        }

        public setShopName(name: string) {
            this.shop_name = name;
            return this;
        }

        public setShopLogoUrl(url: string) {
            this.shop_logo_url = url;
            return this;
        }

        /**
         * Reference number used when settling the transaction to the merchant account.
         * Only used if one-by-ony transaction settling is configured.
         * @param referenceNumber In RF or Finnish reference number format.
         */
        public setReferenceNumber(referenceNumber: string) {
            this.reference_number = referenceNumber;
            return this;
        }

        public build(): MobilePayInitRequest {
            return new MobilePayInitRequest(
                this.amount,
                this.currency,
                this.order,
                this.return_uri,
                this.webhook_success_url,
                this.webhook_cancel_url,
                this.webhook_failure_url,
                this.language,
                this.sub_merchant_name,
                this.sub_merchant_id,
                this.shop_name,
                this.shop_logo_url,
                this.reference_number
            );
        }
    }
}