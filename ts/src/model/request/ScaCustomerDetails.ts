import { ScaPhoneNumber } from "./ScaPhoneNumber";

export class ScaCustomerDetails {
    constructor(
        public shipping_address_matches_billing_address?: boolean,
        public name?: string,
        public email?: string,
        public home_phone?: ScaPhoneNumber,
        public mobile_phone?: ScaPhoneNumber,
        public work_phone?: ScaPhoneNumber
    ){}
}