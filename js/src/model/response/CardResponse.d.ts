export interface CardResponse {
    partial_pan: string;
    type: string;
    expire_year: string;
    expire_month: string;
    cvc_required: string;
    bin: string;
    funding: string;
    category: string;
    country_code?: string;
    card_fingerprint?: string;
    pan_fingerprint?: string;
}
