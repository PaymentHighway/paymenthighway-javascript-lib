import { ReturnUrls } from "./ReturnUrls";
import { CustomerDetails } from "./CustomerDetails";
import { CustomerAccount } from "./CustomerAccount";
import { Purchase } from "./Purchase";
import { Address } from "./Address";
export declare class StrongCustomerAuthentication {
    return_urls: ReturnUrls;
    customer_details?: CustomerDetails;
    customer_account?: CustomerAccount;
    purchase?: Purchase;
    billing_address?: Address;
    shipping_address?: Address;
    desired_challenge_window_size?: ChallengeWindowSize;
    exit_iframe_on_result?: boolean;
    exit_iframe_on_three_d_secure?: boolean;
    constructor(return_urls: ReturnUrls, customer_details?: CustomerDetails, customer_account?: CustomerAccount, purchase?: Purchase, billing_address?: Address, shipping_address?: Address, desired_challenge_window_size?: ChallengeWindowSize, exit_iframe_on_result?: boolean, exit_iframe_on_three_d_secure?: boolean);
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
