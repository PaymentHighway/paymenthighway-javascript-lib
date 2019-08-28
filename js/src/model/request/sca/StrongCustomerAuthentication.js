"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StrongCustomerAuthentication {
    constructor(return_urls, customer_details, customer_account, purchase, billing_address, shipping_address, customer_authentication_info, desired_challenge_window_size, exit_iframe_on_result, exit_iframe_on_three_d_secure) {
        this.return_urls = return_urls;
        this.customer_details = customer_details;
        this.customer_account = customer_account;
        this.purchase = purchase;
        this.billing_address = billing_address;
        this.shipping_address = shipping_address;
        this.customer_authentication_info = customer_authentication_info;
        this.desired_challenge_window_size = desired_challenge_window_size;
        this.exit_iframe_on_result = exit_iframe_on_result;
        this.exit_iframe_on_three_d_secure = exit_iframe_on_three_d_secure;
    }
    static Builder(returnUrls) {
        return new StrongCustomerAuthenticationBuilder.RequestBuilder(returnUrls);
    }
}
exports.StrongCustomerAuthentication = StrongCustomerAuthentication;
var StrongCustomerAuthenticationBuilder;
(function (StrongCustomerAuthenticationBuilder) {
    class RequestBuilder {
        constructor(returnUrls) {
            this.return_urls = returnUrls;
        }
        setCustomerDetails(customerDetails) {
            this.customer_details = customerDetails;
            return this;
        }
        setCustomerAccount(customerAccount) {
            this.customer_account = customerAccount;
            return this;
        }
        setPurchase(purchase) {
            this.purchase = purchase;
            return this;
        }
        setBillingAddress(billingAddress) {
            this.billing_address = billingAddress;
            return this;
        }
        setShippingAddress(shippingAddress) {
            this.shipping_address = shippingAddress;
            return this;
        }
        setCustomerAuthenticationInfo(customerAuthenticationInfo) {
            this.customer_authentication_info = customerAuthenticationInfo;
            return this;
        }
        /**
         * Dimensions of the challenge window that has been displayed to the Cardholder.
         * The ACS shall reply with content that is formatted to appropriately render in this window to provide the best possible user experience.
         * @param desiredChallengeWindowSize Desired challenge window size for 3DS 2.x.
         * @return Builder
         */
        setDesiredChallengeWindowSize(desiredChallengeWindowSize) {
            this.desired_challenge_window_size = desiredChallengeWindowSize;
            return this;
        }
        /**
         * @param exitIframeOnResult Exit form iframe when redirecting user back to success, failure or cancel URLs.
         * @return Builder
         */
        setExitIframeOnResult(exitIframeOnResult) {
            this.exit_iframe_on_result = exitIframeOnResult;
            return this;
        }
        /**
         * @param exitIframeOnThreeDSecure Exit from iframe when redirecting the user to 3DS.
         * @return Builder
         */
        setExitIframeOnThreeDSecure(exitIframeOnThreeDSecure) {
            this.exit_iframe_on_three_d_secure = exitIframeOnThreeDSecure;
            return this;
        }
        build() {
            return new StrongCustomerAuthentication(this.return_urls, this.customer_details, this.customer_account, this.purchase, this.billing_address, this.shipping_address, this.customer_authentication_info, this.desired_challenge_window_size, this.exit_iframe_on_result, this.exit_iframe_on_three_d_secure);
        }
    }
    StrongCustomerAuthenticationBuilder.RequestBuilder = RequestBuilder;
})(StrongCustomerAuthenticationBuilder = exports.StrongCustomerAuthenticationBuilder || (exports.StrongCustomerAuthenticationBuilder = {}));
/**
 * Desired challenge window size for 3DS 2.x.
 * 01 = 250 x 400
 * 02 = 390 x 400
 * 03 = 500 x 600
 * 04 = 600 x 400
 * 05 = Full screen
 */
var ChallengeWindowSize;
(function (ChallengeWindowSize) {
    ChallengeWindowSize["Window250x400"] = "01";
    ChallengeWindowSize["Window390x400"] = "02";
    ChallengeWindowSize["Window500x600"] = "03";
    ChallengeWindowSize["Window600x400"] = "04";
    ChallengeWindowSize["FullScreen"] = "05";
})(ChallengeWindowSize = exports.ChallengeWindowSize || (exports.ChallengeWindowSize = {}));
//# sourceMappingURL=StrongCustomerAuthentication.js.map