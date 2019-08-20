export declare class Address {
    city?: string;
    country?: string;
    address_line_1?: string;
    address_line_2?: string;
    address_line_3?: string;
    post_code?: string;
    state?: string;
    /**
     * @param city max length 50, City name
     * @param country 3 digits country code, 3166-1 numeric (eg. "246")
     * @param address_line_1 max length 50, Address line 1
     * @param address_line_2 max length 50, Address line 2
     * @param address_line_3 max length 50, Address line 3
     * @param post_code max length 16, Zip code
     * @param state String length 2, ISO 3166-2 country subdivision code (eg. "18")
     */
    constructor(city?: string, country?: string, address_line_1?: string, address_line_2?: string, address_line_3?: string, post_code?: string, state?: string);
}
