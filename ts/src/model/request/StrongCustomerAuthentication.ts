import { ScaReturnUrls } from "./ScaReturnUrls";
import { ScaCustomerDetails } from "./ScaCustomerDetails";
import { ScaCustomerAccount } from "./ScaCustomerAccount";
import { ScaPurchase } from "./ScaPurchase";
import { ScaAddress } from "./ScaAddress";

export class StrongCustomerAuthentication {
    constructor(
        public return_urls: ScaReturnUrls,
        public customer_details?: ScaCustomerDetails,
        public customer_account?: ScaCustomerAccount,
        public purchase?: ScaPurchase,
        public billing_address?: ScaAddress,
        public shipping_address?: ScaAddress,
        public desired_challenge_window_size?: ChallengeWindowSize,
        public exit_iframe_on_result?: boolean,
        public exit_iframe_on_three_d_secure?: boolean
    ) {}
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
    Window250x400 = "01",
    Window390x400 = "02",
    Window500x600 = "03",
    Window600x400 = "04",
    FullScreen = "05"
}