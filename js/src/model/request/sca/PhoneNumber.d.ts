export declare class PhoneNumber {
    countryCode: string;
    number: string;
    /**
     * @param countryCode 1-3 digits country code (ITU-E.164)
     * @param number 1-15 digits phone number
     */
    constructor(countryCode: string, number: string);
}
