import { ScaPhoneNumber } from "./ScaPhoneNumber";

export class ScaCustomerDetails {

    /**
     * @param shipping_address_matches_billing_address Does the shipping address matches the billing address
     * @param name Customer name. max length 45
     * @param email Customer email. max length 254
     * @param home_phone
     * @param mobile_phone
     * @param work_phone 
     */
    constructor(
        public shipping_address_matches_billing_address?: boolean,
        public name?: string,
        public email?: string,
        public home_phone?: ScaPhoneNumber,
        public mobile_phone?: ScaPhoneNumber,
        public work_phone?: ScaPhoneNumber
    ){}
}