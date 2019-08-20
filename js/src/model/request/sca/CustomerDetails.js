"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomerDetails {
    /**
     * @param shipping_address_matches_billing_address Does the shipping address matches the billing address
     * @param name Customer name. max length 45
     * @param email Customer email. max length 254
     * @param home_phone
     * @param mobile_phone
     * @param work_phone
     */
    constructor(shipping_address_matches_billing_address, name, email, home_phone, mobile_phone, work_phone) {
        this.shipping_address_matches_billing_address = shipping_address_matches_billing_address;
        this.name = name;
        this.email = email;
        this.home_phone = home_phone;
        this.mobile_phone = mobile_phone;
        this.work_phone = work_phone;
    }
}
exports.CustomerDetails = CustomerDetails;
//# sourceMappingURL=CustomerDetails.js.map