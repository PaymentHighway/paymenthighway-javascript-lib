export class PivoInitRequest {
    constructor(
        public amount: number,
        public currency: string,
        public order: string,
        public app_url?: string,
        public reference_number?: string,
        public webhook_success_url?: string,
        public webhook_cancel_url?: string,
        public webhook_failure_url?: string,
        public language?: string,
        public phone_number?: string
    ) {
    }

    public static Builder(amount: number, currency: string = 'EUR') {
        return new PivoInit.RequestBuilder(amount, currency);
    }
}

export namespace PivoInit {
    export class RequestBuilder {
        private readonly amount: number;
        private readonly currency: string;
        private order: string;
        private app_url: string;
        private reference_number: string;
        private language: string;
        private webhook_success_url: string;
        private webhook_cancel_url: string;
        private webhook_failure_url: string;
        private phone_number: string;

        constructor(amount: number, currency: string) {
            this.amount = amount;
            this.currency = currency;
        }

        public setOrder(order: string) {
            this.order = order;
            return this;
        }

        public setAppUrl(url: string) {
            this.app_url = url;
            return this;
        }

        public setReferenceNumber(ref: string) {
            this.reference_number = ref;
            return this;
        }

        public setPhoneNumber(phone_number: string) {
            this.phone_number = phone_number;
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

        public build(): PivoInitRequest {
            return new PivoInitRequest(
                this.amount,
                this.currency,
                this.order,
                this.app_url,
                this.reference_number,
                this.webhook_success_url,
                this.webhook_cancel_url,
                this.webhook_failure_url,
                this.language,
                this.phone_number
            );
        }
    }
}