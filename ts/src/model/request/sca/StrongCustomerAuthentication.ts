import {ReturnUrls} from './ReturnUrls';
import {CustomerDetails} from './CustomerDetails';
import {CustomerAccount} from './CustomerAccount';
import {Purchase} from './Purchase';
import {Address} from './Address';
import {CustomerAuthenticationInfo} from './CustomerAuthenticationInfo';

export class StrongCustomerAuthentication {
    constructor(
        public return_urls: ReturnUrls,
        public customer_details?: CustomerDetails,
        public customer_account?: CustomerAccount,
        public purchase?: Purchase,
        public billing_address?: Address,
        public shipping_address?: Address,
        public customer_authentication_info?: CustomerAuthenticationInfo,
        public desired_challenge_window_size?: ChallengeWindowSize,
        public exit_iframe_on_result?: boolean,
        public exit_iframe_on_three_d_secure?: boolean
    ) {
    }

    public static Builder(returnUrls: ReturnUrls) {
        return new StrongCustomerAuthenticationBuilder.RequestBuilder(returnUrls);
    }
}

export namespace StrongCustomerAuthenticationBuilder {
    export class RequestBuilder {
        private readonly return_urls: ReturnUrls;
        private customer_details: CustomerDetails;
        private customer_account: CustomerAccount;
        private purchase: Purchase;
        private billing_address: Address;
        private shipping_address: Address;
        private customer_authentication_info: CustomerAuthenticationInfo;
        private desired_challenge_window_size: ChallengeWindowSize;
        private exit_iframe_on_result: boolean;
        private exit_iframe_on_three_d_secure: boolean;

        constructor(returnUrls: ReturnUrls) {
            this.return_urls = returnUrls;
        }

        public setCustomerDetails(customerDetails: CustomerDetails) {
            this.customer_details = customerDetails;
            return this;
        }

        public setCustomerAccount(customerAccount: CustomerAccount) {
            this.customer_account = customerAccount;
            return this;
        }

        public setPurchase(purchase: Purchase) {
            this.purchase = purchase;
            return this;
        }

        public setBillingAddress(billingAddress: Address) {
            this.billing_address = billingAddress;
            return this;
        }

        public setShippingAddress(shippingAddress: Address) {
            this.shipping_address = shippingAddress;
            return this;
        }

        public setCustomerAuthenticationInfo(customerAuthenticationInfo: CustomerAuthenticationInfo) {
            this.customer_authentication_info = customerAuthenticationInfo;
            return this;
        }

        /**
         * Dimensions of the challenge window that has been displayed to the Cardholder.
         * The ACS shall reply with content that is formatted to appropriately render in this window to provide the best possible user experience.
         * @param desiredChallengeWindowSize Desired challenge window size for 3DS 2.x.
         * @return Builder
         */
        public setDesiredChallengeWindowSize(desiredChallengeWindowSize: ChallengeWindowSize) {
            this.desired_challenge_window_size = desiredChallengeWindowSize;
            return this;
        }

        /**
         * @param exitIframeOnResult Exit form iframe when redirecting user back to success, failure or cancel URLs.
         * @return Builder
         */
        public setExitIframeOnResult(exitIframeOnResult: boolean) {
            this.exit_iframe_on_result = exitIframeOnResult;
            return this;
        }

        /**
         * @param exitIframeOnThreeDSecure Exit from iframe when redirecting the user to 3DS.
         * @return Builder
         */
        public setExitIframeOnThreeDSecure(exitIframeOnThreeDSecure: boolean) {
            this.exit_iframe_on_three_d_secure = exitIframeOnThreeDSecure;
            return this;
        }

        public build(): StrongCustomerAuthentication {
            return new StrongCustomerAuthentication(
                this.return_urls,
                this.customer_details,
                this.customer_account,
                this.purchase,
                this.billing_address,
                this.shipping_address,
                this.customer_authentication_info,
                this.desired_challenge_window_size,
                this.exit_iframe_on_result,
                this.exit_iframe_on_three_d_secure,
            );
        }
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
export enum ChallengeWindowSize {
    Window250x400 = '01',
    Window390x400 = '02',
    Window500x600 = '03',
    Window600x400 = '04',
    FullScreen = '05'
}