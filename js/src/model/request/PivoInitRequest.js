"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PivoInitRequest {
    constructor(amount, currency, order, description, app_url, reference_number, webhook_success_url, webhook_cancel_url, webhook_failure_url, language, phone_number) {
        this.amount = amount;
        this.currency = currency;
        this.order = order;
        this.description = description;
        this.app_url = app_url;
        this.reference_number = reference_number;
        this.webhook_success_url = webhook_success_url;
        this.webhook_cancel_url = webhook_cancel_url;
        this.webhook_failure_url = webhook_failure_url;
        this.language = language;
        this.phone_number = phone_number;
    }
    static Builder(amount, currency = 'EUR') {
        return new PivoInit.RequestBuilder(amount, currency);
    }
}
exports.PivoInitRequest = PivoInitRequest;
var PivoInit;
(function (PivoInit) {
    class RequestBuilder {
        constructor(amount, currency) {
            this.amount = amount;
            this.currency = currency;
        }
        setOrder(order) {
            this.order = order;
            return this;
        }
        setDescription(description) {
            this.description = description;
            return this;
        }
        setAppUrl(url) {
            this.app_url = url;
            return this;
        }
        setReferenceNumber(ref) {
            this.reference_number = ref;
            return this;
        }
        setPhoneNumber(phone_number) {
            this.phone_number = phone_number;
            return this;
        }
        setLanguage(language) {
            this.language = language;
            return this;
        }
        setWebhookSuccessUrl(url) {
            this.webhook_success_url = url;
            return this;
        }
        setWebhookCancelUrl(url) {
            this.webhook_cancel_url = url;
            return this;
        }
        setWebhookFailureUrl(url) {
            this.webhook_failure_url = url;
            return this;
        }
        build() {
            return new PivoInitRequest(this.amount, this.currency, this.order, this.description, this.app_url, this.reference_number, this.webhook_success_url, this.webhook_cancel_url, this.webhook_failure_url, this.language, this.phone_number);
        }
    }
    PivoInit.RequestBuilder = RequestBuilder;
})(PivoInit = exports.PivoInit || (exports.PivoInit = {}));
//# sourceMappingURL=PivoInitRequest.js.map