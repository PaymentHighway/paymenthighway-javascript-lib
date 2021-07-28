"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneNumber = void 0;
class PhoneNumber {
    /**
     * @param country_code 1-3 digits country code (ITU-E.164)
     * @param number 1-15 digits phone number
     */
    constructor(country_code, number) {
        this.country_code = country_code;
        this.number = number;
    }
}
exports.PhoneNumber = PhoneNumber;
//# sourceMappingURL=PhoneNumber.js.map