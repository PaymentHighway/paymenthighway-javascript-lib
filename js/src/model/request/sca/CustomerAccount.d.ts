export declare class CustomerAccount {
    account_age_indicator?: AccountAgeIndicator;
    account_date?: string;
    change_indicator?: AccountInformationChangeIndicator;
    change_date?: string;
    password_change_indicator?: AccountPasswordChangeIndicator;
    password_change_date?: string;
    number_of_recent_purchases?: number;
    number_of_add_card_attempts_day?: number;
    number_of_transaction_activity_day?: number;
    number_of_transaction_activity_year?: number;
    shipping_address_indicator?: ShippingAddressFirstUsedIndicator;
    shipping_address_usage_date?: string;
    suspicious_activity?: SuspiciousActivityIndicator;
    constructor(account_age_indicator?: AccountAgeIndicator, account_date?: string, change_indicator?: AccountInformationChangeIndicator, change_date?: string, password_change_indicator?: AccountPasswordChangeIndicator, password_change_date?: string, number_of_recent_purchases?: number, number_of_add_card_attempts_day?: number, number_of_transaction_activity_day?: number, number_of_transaction_activity_year?: number, shipping_address_indicator?: ShippingAddressFirstUsedIndicator, shipping_address_usage_date?: string, suspicious_activity?: SuspiciousActivityIndicator);
    static Builder(): CustomerAccountBuilder.RequestBuilder;
}
export declare namespace CustomerAccountBuilder {
    class RequestBuilder {
        private account_age_indicator;
        private account_date;
        private change_indicator;
        private change_date;
        private password_change_indicator;
        private password_change_date;
        private number_of_recent_purchases;
        private number_of_add_card_attempts_day;
        private number_of_transaction_activity_day;
        private number_of_transaction_activity_year;
        private shipping_address_indicator;
        private shipping_address_usage_date;
        private suspicious_activity;
        /**
         * Length of time that the cardholder has had the account with the 3DS Requestor.
         * @param accountAgeIndicator 01 = No account (guest check-out), 02 = Created during this transaction, 03 = Less than 30 days, 04 = 30−60 days, 05 = More than 60 days
         * @return Builder
         */
        setAccountAgeIndicator(accountAgeIndicator: AccountAgeIndicator): this;
        /**
         * Date that the cardholder opened the account at merchant
         * @param accountDate Date format: yyyy-MM-dd
         * @return Builder
         */
        setAccountDate(accountDate: string): this;
        /**
         * Length of time since the cardholder’s account information with the 3DS Requestor was last changed. Including Billing or Shipping address, new payment account, or new user(s) added.
         * @param changeIndicator 01 = Changed during this transaction, 02 = Less than 30 days, 03 = 30−60 days, 04 = More than 60 days
         * @return Builder
         */
        setChangeIndicator(changeIndicator: AccountInformationChangeIndicator): this;
        /**
         * Date that the cardholder’s account with the 3DS Requestor was last changed. Including Billing or Shipping address
         * @param changeDate Date format: yyyy-MM-dd
         * @return Builder
         */
        setChangeDate(changeDate: string): this;
        /**
         * Length of time since the cardholder’s account with the 3DS Requestor had a password change or account reset.
         * @param accountPasswordChangeIndicator 01 = No change, 02 = Changed during this transaction, 03 = Less than 30 days, 04 = 30−60 days, 05 = More than 60 days
         * @return Builder
         */
        setPasswordChangeIndicator(accountPasswordChangeIndicator: AccountPasswordChangeIndicator): this;
        /**
         * Date that cardholder’s account with the 3DS Requestor had a password change or account reset.
         * @param passwordChangeDate Date format: yyyy-MM-dd
         * @return Builder
         */
        setPasswordChangeDate(passwordChangeDate: string): this;
        /**
         * Number of purchases with this cardholder account during the previous six months.
         * @param numberOfRecentPurchases Max value: 9999
         * @return Builder
         */
        setNumberOfRecentPurchases(numberOfRecentPurchases: number): this;
        /**
         * Number of Add Card attempts in the last 24 hours.
         * @param numberOfAddCardAttemptsDay Max value: 999
         * @return Builder
         */
        setNumberOfAddCardAttemptsDay(numberOfAddCardAttemptsDay: number): this;
        /**
         * Number of transactions (successful and abandoned) for this cardholder account with the 3DS Requestor across all payment accounts in the previous 24 hours.
         * @param numberOfTransactionActivityDay Max value: 999
         * @return Builder
         */
        setNumberOfTransactionActivityDay(numberOfTransactionActivityDay: number): this;
        /**
         * Number of transactions (successful and abandoned) for this cardholder account with the 3DS Requestor across all payment accounts in the previous year.
         * @param numberOfTransactionActivityYear Max value: 999
         * @return Builder
         */
        setNumberOfTransactionActivityYear(numberOfTransactionActivityYear: number): this;
        /**
         * Indicates when the shipping address used for this transaction was first used with the 3DS Requestor.
         * @param shippingAddressIndicator 01 = This transaction, 02 = Less than 30 days, 03 = 30−60 days, 04 = More than 60 days
         * @return Builder
         */
        setShippingAddressIndicator(shippingAddressIndicator: ShippingAddressFirstUsedIndicator): this;
        /**
         * Date when the shipping address used for this transaction was first used with the 3DS Requestor
         * @param shippingAddressUsageDate Date format: yyyy-MM-dd
         * @return Builder
         */
        setShippingAddressUsageDate(shippingAddressUsageDate: string): this;
        /** Indicates whether the 3DS Requestor has experienced suspicious activity (including previous fraud) on the cardholder account.
         * @param suspiciousActivity  01 = No suspicious activity has been observed, 02 = Suspicious activity has been observed
         * @return Builder
         */
        setSuspiciousActivity(suspiciousActivity: SuspiciousActivityIndicator): this;
        build(): CustomerAccount;
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
export declare enum AccountAgeIndicator {
    NoAccount = "01",
    CreatedDuringTransaction = "02",
    LessThan30Days = "03",
    Between30And60Days = "04",
    MoreThan60Days = "05"
}
/**
 * Length of time since the cardholder’s account information was last changed. Including Billing or Shipping address, new payment account, or new user(s) added.
 * 01 = Changed during this transaction
 * 02 = Less than 30 days
 * 03 = 30−60 days
 * 04 = More than 60 days
 */
export declare enum AccountInformationChangeIndicator {
    ChangedDuringTransaction = "01",
    LessThan30Days = "02",
    Between30And60Days = "03",
    MoreThan60Days = "04"
}
/**
 * Length of time since the cardholder’s account had a password change or account reset.
 * 01 = No change
 * 02 = Changed during this transaction
 * 03 = Less than 30 days
 * 04 = 30−60 days
 * 05 = More than 60 days
 */
export declare enum AccountPasswordChangeIndicator {
    NoChange = "01",
    ChangedDuringTransaction = "02",
    LessThan30Days = "03",
    Between30And60Days = "04",
    MoreThan60Days = "05"
}
/**
 * Indicates when the shipping address used for this transaction was first used.
 * 01 = This transaction
 * 02 = Less than 30 days
 * 03 = 30−60 days
 * 04 = More than 60 days
 */
export declare enum ShippingAddressFirstUsedIndicator {
    ThisTransaction = "01",
    LessThan30Days = "02",
    Between30And60Days = "03",
    MoreThan60Days = "04"
}
/**
 * Indicates whether suspicious activity has been experienced (including previous fraud) on the cardholder account.
 * 01 = No suspicious activity has been observed
 * 02 = Suspicious activity has been observed
 */
export declare enum SuspiciousActivityIndicator {
    NoSuspiciousActivity = "01",
    SuspiciousActivityObserved = "02"
}
