export declare class Card {
    pan: string;
    expiry_year: string;
    expiry_month: string;
    cvc?: string;
    verification?: string;
    constructor(pan: string, expiry_year: string, expiry_month: string, cvc?: string, verification?: string);
}
