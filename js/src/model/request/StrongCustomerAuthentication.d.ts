import { ScaReturnUrls } from "./ScaReturnUrls";
import { ScaCustomerDetails } from "./ScaCustomerDetails";
import { ScaCustomerAccount } from "./ScaCustomerAccount";
import { ScaPurchase } from "./ScaPurchase";
import { ScaAddress } from "./ScaAddress";
export declare class StrongCustomerAuthentication {
    return_urls: ScaReturnUrls;
    customer_details?: ScaCustomerDetails;
    customer_account?: ScaCustomerAccount;
    purchase?: ScaPurchase;
    billing_address?: ScaAddress;
    shipping_address?: ScaAddress;
    desired_challenge_window_size?: ChallengeWindowSize;
    exit_iframe_on_result?: boolean;
    exit_iframe_on_three_d_secure?: boolean;
    constructor(return_urls: ScaReturnUrls, customer_details?: ScaCustomerDetails, customer_account?: ScaCustomerAccount, purchase?: ScaPurchase, billing_address?: ScaAddress, shipping_address?: ScaAddress, desired_challenge_window_size?: ChallengeWindowSize, exit_iframe_on_result?: boolean, exit_iframe_on_three_d_secure?: boolean);
}
export declare enum ChallengeWindowSize {
    Window250x400 = "01",
    Window390x400 = "02",
    Window500x600 = "03",
    Window600x400 = "04",
    FullScreen = "05"
}
