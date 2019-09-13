export declare class PhoneNumber {
    country_code: string;
    number: string;
    /**
     * @param country_code 1-3 digits country code (ITU-E.164)
     * @param number 1-15 digits phone number
     */
    constructor(country_code: string, number: string);
}
