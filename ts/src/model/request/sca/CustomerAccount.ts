export class CustomerAccount {
    constructor(
        public account_age_indicator?: AccountAgeIndicator,
        public account_date?: string,
        public change_indicator?: AccountInformationChangeIndicator,
        public change_date?: string,
        public password_change_indicator?: AccountPasswordChangeIndicator,
        public password_change_date?: string,
        public number_of_recent_purchases?: number,
        public number_of_add_card_attempts_day?: number,
        public number_of_transaction_activity_day?: number,
        public number_of_transaction_activity_year?: number,
        public shipping_address_indicator?: ShippingAddressFirstUsedIndicator,
        public shipping_address_usage_date?: string,
        public suspicious_activity?: SuspiciousActivityIndicator
    ) {
    }

    public static Builder(): CustomerAccountBuilder.RequestBuilder {
        return new CustomerAccountBuilder.RequestBuilder();
    }
}

export namespace CustomerAccountBuilder {
    export class RequestBuilder {
        private account_age_indicator: AccountAgeIndicator;
        private account_date: string;
        private change_indicator: AccountInformationChangeIndicator;
        private change_date: string;
        private password_change_indicator: AccountPasswordChangeIndicator;
        private password_change_date: string;
        private number_of_recent_purchases: number;
        private number_of_add_card_attempts_day: number;
        private number_of_transaction_activity_day: number;
        private number_of_transaction_activity_year: number;
        private shipping_address_indicator: ShippingAddressFirstUsedIndicator;
        private shipping_address_usage_date: string;
        private suspicious_activity: SuspiciousActivityIndicator;

        /**
         * Length of time that the cardholder has had the account with the 3DS Requestor.
         * @param accountAgeIndicator 01 = No account (guest check-out), 02 = Created during this transaction, 03 = Less than 30 days, 04 = 30−60 days, 05 = More than 60 days
         * @return Builder
         */
        public setAccountAgeIndicator(accountAgeIndicator: AccountAgeIndicator) {
            this.account_age_indicator = accountAgeIndicator;
            return this;
        }

        /**
         * Date that the cardholder opened the account at merchant
         * @param accountDate Date format: yyyy-MM-dd
         * @return Builder
         */
        public setAccountDate(accountDate: string) {
            this.account_date = accountDate;
            return this;
        }

        /**
         * Length of time since the cardholder’s account information with the 3DS Requestor was last changed. Including Billing or Shipping address, new payment account, or new user(s) added.
         * @param changeIndicator 01 = Changed during this transaction, 02 = Less than 30 days, 03 = 30−60 days, 04 = More than 60 days
         * @return Builder
         */
        public setChangeIndicator(changeIndicator: AccountInformationChangeIndicator) {
            this.change_indicator = changeIndicator;
            return this;
        }

        /**
         * Date that the cardholder’s account with the 3DS Requestor was last changed. Including Billing or Shipping address
         * @param changeDate Date format: yyyy-MM-dd
         * @return Builder
         */
        public setChangeDate(changeDate: string) {
            this.change_date = changeDate;
            return this;
        }

        /**
         * Length of time since the cardholder’s account with the 3DS Requestor had a password change or account reset.
         * @param accountPasswordChangeIndicator 01 = No change, 02 = Changed during this transaction, 03 = Less than 30 days, 04 = 30−60 days, 05 = More than 60 days
         * @return Builder
         */
        public setPasswordChangeIndicator(accountPasswordChangeIndicator: AccountPasswordChangeIndicator) {
            this.password_change_indicator = accountPasswordChangeIndicator;
            return this;
        }

        /**
         * Date that cardholder’s account with the 3DS Requestor had a password change or account reset.
         * @param passwordChangeDate Date format: yyyy-MM-dd
         * @return Builder
         */
        public setPasswordChangeDate(passwordChangeDate: string) {
            this.password_change_date = passwordChangeDate;
            return this;
        }

        /**
         * Number of purchases with this cardholder account during the previous six months.
         * @param numberOfRecentPurchases Max value: 9999
         * @return Builder
         */
        public setNumberOfRecentPurchases(numberOfRecentPurchases: number) {
            this.number_of_recent_purchases = numberOfRecentPurchases;
            return this;
        }

        /**
         * Number of Add Card attempts in the last 24 hours.
         * @param numberOfAddCardAttemptsDay Max value: 999
         * @return Builder
         */
        public setNumberOfAddCardAttemptsDay(numberOfAddCardAttemptsDay: number) {
            this.number_of_add_card_attempts_day = numberOfAddCardAttemptsDay;
            return this;
        }

        /**
         * Number of transactions (successful and abandoned) for this cardholder account with the 3DS Requestor across all payment accounts in the previous 24 hours.
         * @param numberOfTransactionActivityDay Max value: 999
         * @return Builder
         */
        public setNumberOfTransactionActivityDay(numberOfTransactionActivityDay: number) {
            this.number_of_transaction_activity_day = numberOfTransactionActivityDay;
            return this;
        }

        /**
         * Number of transactions (successful and abandoned) for this cardholder account with the 3DS Requestor across all payment accounts in the previous year.
         * @param numberOfTransactionActivityYear Max value: 999
         * @return Builder
         */
        public setNumberOfTransactionActivityYear(numberOfTransactionActivityYear: number) {
            this.number_of_transaction_activity_year = numberOfTransactionActivityYear;
            return this;
        }

        /**
         * Indicates when the shipping address used for this transaction was first used with the 3DS Requestor.
         * @param shippingAddressIndicator 01 = This transaction, 02 = Less than 30 days, 03 = 30−60 days, 04 = More than 60 days
         * @return Builder
         */
        public setShippingAddressIndicator(shippingAddressIndicator: ShippingAddressFirstUsedIndicator) {
            this.shipping_address_indicator = shippingAddressIndicator;
            return this;
        }

        /**
         * Date when the shipping address used for this transaction was first used with the 3DS Requestor
         * @param shippingAddressUsageDate Date format: yyyy-MM-dd
         * @return Builder
         */
        public setShippingAddressUsageDate(shippingAddressUsageDate: string) {
            this.shipping_address_usage_date = shippingAddressUsageDate;
            return this;
        }

        /** Indicates whether the 3DS Requestor has experienced suspicious activity (including previous fraud) on the cardholder account.
         * @param suspiciousActivity  01 = No suspicious activity has been observed, 02 = Suspicious activity has been observed
         * @return Builder
         */
        public setSuspiciousActivity(suspiciousActivity: SuspiciousActivityIndicator) {
            this.suspicious_activity = suspiciousActivity;
            return this;
        }

        public build(): CustomerAccount {
            return new CustomerAccount(
                this.account_age_indicator,
                this.account_date,
                this.change_indicator,
                this.change_date,
                this.password_change_indicator,
                this.password_change_date,
                this.number_of_recent_purchases,
                this.number_of_add_card_attempts_day,
                this.number_of_transaction_activity_day,
                this.number_of_transaction_activity_year,
                this.shipping_address_indicator,
                this.shipping_address_usage_date,
                this.suspicious_activity,
            );
        }
    }
}

/**
 * Length of time that the cardholder has had the account.
 * 01 = No account (guest check-out)
 * 02 = Created during this transaction
 * 03 = Less than 30 days
 * 04 = 30−60 days
 * 05 = More than 60 days
 */
export enum AccountAgeIndicator {
    NoAccount = '01',
    CreatedDuringTransaction = '02',
    LessThan30Days = '03',
    Between30And60Days = '04',
    MoreThan60Days = '05'
}

/**
 * Length of time since the cardholder’s account information was last changed. Including Billing or Shipping address, new payment account, or new user(s) added.
 * 01 = Changed during this transaction
 * 02 = Less than 30 days
 * 03 = 30−60 days
 * 04 = More than 60 days
 */
export enum AccountInformationChangeIndicator {
    ChangedDuringTransaction = '01',
    LessThan30Days = '02',
    Between30And60Days = '03',
    MoreThan60Days = '04'
}

/**
 * Length of time since the cardholder’s account had a password change or account reset.
 * 01 = No change
 * 02 = Changed during this transaction
 * 03 = Less than 30 days
 * 04 = 30−60 days
 * 05 = More than 60 days
 */
export enum AccountPasswordChangeIndicator {
    NoChange = '01',
    ChangedDuringTransaction = '02',
    LessThan30Days = '03',
    Between30And60Days = '04',
    MoreThan60Days = '05'
}

/**
 * Indicates when the shipping address used for this transaction was first used.
 * 01 = This transaction
 * 02 = Less than 30 days
 * 03 = 30−60 days
 * 04 = More than 60 days
 */
export enum ShippingAddressFirstUsedIndicator {
    ThisTransaction = '01',
    LessThan30Days = '02',
    Between30And60Days = '03',
    MoreThan60Days = '04'
}

/**
 * Indicates whether suspicious activity has been experienced (including previous fraud) on the cardholder account.
 * 01 = No suspicious activity has been observed
 * 02 = Suspicious activity has been observed
 */
export enum SuspiciousActivityIndicator {
    NoSuspiciousActivity = '01',
    SuspiciousActivityObserved = '02'
}