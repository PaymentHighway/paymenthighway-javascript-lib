import * as Uuid from 'node-uuid';

export class PaymentHighwayUtility {

    /**
     * Cryptographically strong pseudo random number generator.
     *
     * @return String UUID.
     */
    public static createRequestId(): string {
        return Uuid.v4();
    }

    /**
     * Request timestamp in ISO 8601 combined date and time in UTC.
     *
     * @return String timestamp Example: 2014-09-18T10:32:59Z
     */
    public static getUtcTimestamp(): string {
        const date = new Date();
        return date.toISOString().replace(/\.[0-9]{3}/, '');
    }
}
