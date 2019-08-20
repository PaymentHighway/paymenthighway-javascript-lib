"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StrongCustomerAuthentication {
    constructor(return_urls, customer_details, customer_account, purchase, billing_address, shipping_address, desired_challenge_window_size, exit_iframe_on_result, exit_iframe_on_three_d_secure) {
        this.return_urls = return_urls;
        this.customer_details = customer_details;
        this.customer_account = customer_account;
        this.purchase = purchase;
        this.billing_address = billing_address;
        this.shipping_address = shipping_address;
        this.desired_challenge_window_size = desired_challenge_window_size;
        this.exit_iframe_on_result = exit_iframe_on_result;
        this.exit_iframe_on_three_d_secure = exit_iframe_on_three_d_secure;
    }
}
exports.StrongCustomerAuthentication = StrongCustomerAuthentication;
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