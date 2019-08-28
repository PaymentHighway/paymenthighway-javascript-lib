export class PhoneNumber {

    /**
     * @param country_code 1-3 digits country code (ITU-E.164)
     * @param number 1-15 digits phone number
     */
    constructor(
        public country_code: string,
        public number: string
    ) {
    }
}