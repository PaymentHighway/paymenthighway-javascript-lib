import { ReturnUrls } from './ReturnUrls';
import { CustomerDetails } from './CustomerDetails';
import { CustomerAccount } from './CustomerAccount';
import { Purchase } from './Purchase';
import { Address } from './Address';
import { CustomerAuthenticationInfo } from './CustomerAuthenticationInfo';
export declare class StrongCustomerAuthentication {
    return_urls: ReturnUrls;
    customer_details?: CustomerDetails;
    customer_account?: CustomerAccount;
    purchase?: Purchase;
    billing_address?: Address;
    shipping_address?: Address;
    customer_authentication_info?: CustomerAuthenticationInfo;
    desired_challenge_window_size?: ChallengeWindowSize;
    exit_iframe_on_result?: boolean;
    exit_iframe_on_three_d_secure?: boolean;
    constructor(return_urls: ReturnUrls, customer_details?: CustomerDetails, customer_account?: CustomerAccount, purchase?: Purchase, billing_address?: Address, shipping_address?: Address, customer_authentication_info?: CustomerAuthenticationInfo, desired_challenge_window_size?: ChallengeWindowSize, exit_iframe_on_result?: boolean, exit_iframe_on_three_d_secure?: boolean);
    static Builder(returnUrls: ReturnUrls): StrongCustomerAuthenticationBuilder.RequestBuilder;
}
export declare namespace StrongCustomerAuthenticationBuilder {
    class RequestBuilder {
        private readonly return_urls;
        private customer_details;
        private customer_account;
        private purchase;
        private billing_address;
        private shipping_address;
        private customer_authentication_info;
        private desired_challenge_window_size;
        private exit_iframe_on_result;
        private exit_iframe_on_three_d_secure;
        constructor(returnUrls: ReturnUrls);
        setCustomerDetails(customerDetails: CustomerDetails): this;
        setCustomerAccount(customerAccount: CustomerAccount): this;
        setPurchase(purchase: Purchase): this;
        setBillingAddress(billingAddress: Address): this;
        setShippingAddress(shippingAddress: Address): this;
        setCustomerAuthenticationInfo(customerAuthenticationInfo: CustomerAuthenticationInfo): this;
        /**
         * Dimensions of the challenge window that has been displayed to the Cardholder.
         * The ACS shall reply with content that is formatted to appropriately render in this window to provide the best possible user experience.
         * @param desiredChallengeWindowSize Desired challenge window size for 3DS 2.x.
         * @return Builder
         */
        setDesiredChallengeWindowSize(desiredChallengeWindowSize: ChallengeWindowSize): this;
        /**
         * @param exitIframeOnResult Exit form iframe when redirecting user back to success, failure or cancel URLs.
         * @return Builder
         */
        setExitIframeOnResult(exitIframeOnResult: boolean): this;
        /**
         * @param exitIframeOnThreeDSecure Exit from iframe when redirecting the user to 3DS.
         * @return Builder
         */
        setExitIframeOnThreeDSecure(exitIframeOnThreeDSecure: boolean): this;
        build(): StrongCustomerAuthentication;
    }
}
/**
 * Desired challenge window size for 3DS 2.x.
 * 01 = 250 x 400
 * 02 = 390 x 400
 * 03 = 500 x 600
 * 04 = 600 x 400
 * 05 = Full screen
 */
export declare enum ChallengeWindowSize {
    Window250x400 = "01",
    Window390x400 = "02",
    Window500x600 = "03",
    Window600x400 = "04",
    FullScreen = "05"
}
