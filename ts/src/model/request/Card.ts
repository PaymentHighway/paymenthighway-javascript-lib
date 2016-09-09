export class Card {
    constructor(public pan: string,
                public expiry_year: string,
                public expiry_month: string,
                public cvc?: string,
                public verification?: string) {
    }
}
