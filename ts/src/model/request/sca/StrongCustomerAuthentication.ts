import { ReturnUrls } from "./ReturnUrls";
import { CustomerDetails } from "./CustomerDetails";
import { CustomerAccount } from "./CustomerAccount";
import { Purchase } from "./Purchase";
import { Address } from "./Address";

export class StrongCustomerAuthentication {
    constructor(
        public return_urls: ReturnUrls,
        public customer_details?: CustomerDetails,
        public customer_account?: CustomerAccount,
        public purchase?: Purchase,
        public billing_address?: Address,
        public shipping_address?: Address,
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