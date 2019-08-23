"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PhRequest_1 = require("./PhRequest");
class MobilePayInitRequest extends PhRequest_1.Request {
    constructor(amount, currency, order, return_uri, webhook_success_url, webhook_cancel_url, webhook_failure_url, language, sub_merchant_name, sub_merchant_id, shop_name, shop_logo_url) {
        super();
        this.amount = amount;
        this.currency = currency;
        this.order = order;
        this.return_uri = return_uri;
        this.webhook_success_url = webhook_success_url;
        this.webhook_cancel_url = webhook_cancel_url;
        this.webhook_failure_url = webhook_failure_url;
        this.language = language;
        this.sub_merchant_name = sub_merchant_name;
        this.sub_merchant_id = sub_merchant_id;
        this.shop_name = shop_name;
        this.shop_logo_url = shop_logo_url;
    }
    static Builder(amount, currency) {
        return new MobilePayInit.RequestBuilder(amount, currency);
    }
}
exports.MobilePayInitRequest = MobilePayInitRequest;
var MobilePayInit;
(function (MobilePayInit) {
    class RequestBuilder {
        constructor(amount, currency) {
            this.amount = amount;
            this.currency = currency;
        }
        setOrder(order) {
            this.order = order;
            return this;
        }
        setReturnUri(uri) {
            this.return_uri = uri;
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
        setSubMerchantName(name) {
            this.sub_merchant_name = name;
            return this;
        }
        setSubMerchantId(id) {
            this.sub_merchant_id = id;
            return this;
        }
        setShopName(name) {
            this.shop_name = name;
            return this;
        }
        setShopLogoUrl(url) {
            this.shop_logo_url = url;
            return this;
        }
        build() {
            return new MobilePayInitRequest(this.amount, this.currency, this.order, this.return_uri, this.webhook_success_url, this.webhook_cancel_url, this.webhook_failure_url, this.language, this.sub_merchant_name, this.sub_merchant_id, this.shop_name, this.shop_logo_url);
        }
    }
    MobilePayInit.RequestBuilder = RequestBuilder;
})(MobilePayInit = exports.MobilePayInit || (exports.MobilePayInit = {}));
//# sourceMappingURL=MobilePayInitRequest.js.map