"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuspiciousActivityIndicator = exports.ShippingAddressFirstUsedIndicator = exports.AccountPasswordChangeIndicator = exports.AccountInformationChangeIndicator = exports.AccountAgeIndicator = exports.CustomerAccountBuilder = exports.CustomerAccount = void 0;
class CustomerAccount {
    constructor(account_age_indicator, account_date, change_indicator, change_date, password_change_indicator, password_change_date, number_of_recent_purchases, number_of_add_card_attempts_day, number_of_transaction_activity_day, number_of_transaction_activity_year, shipping_address_indicator, shipping_address_usage_date, suspicious_activity) {
        this.account_age_indicator = account_age_indicator;
        this.account_date = account_date;
        this.change_indicator = change_indicator;
        this.change_date = change_date;
        this.password_change_indicator = password_change_indicator;
        this.password_change_date = password_change_date;
        this.number_of_recent_purchases = number_of_recent_purchases;
        this.number_of_add_card_attempts_day = number_of_add_card_attempts_day;
        this.number_of_transaction_activity_day = number_of_transaction_activity_day;
        this.number_of_transaction_activity_year = number_of_transaction_activity_year;
        this.shipping_address_indicator = shipping_address_indicator;
        this.shipping_address_usage_date = shipping_address_usage_date;
        this.suspicious_activity = suspicious_activity;
    }
    static Builder() {
        return new CustomerAccountBuilder.RequestBuilder();
    }
}
exports.CustomerAccount = CustomerAccount;
var CustomerAccountBuilder;
(function (CustomerAccountBuilder) {
    class RequestBuilder {
        /**
         * Length of time that the cardholder has had the account with the 3DS Requestor.
         * @param accountAgeIndicator 01 = No account (guest check-out), 02 = Created during this transaction, 03 = Less than 30 days, 04 = 30−60 days, 05 = More than 60 days
         * @return Builder
         */
        setAccountAgeIndicator(accountAgeIndicator) {
            this.account_age_indicator = accountAgeIndicator;
            return this;
        }
        /**
         * Date that the cardholder opened the account at merchant
         * @param accountDate Date format: yyyy-MM-dd
         * @return Builder
         */
        setAccountDate(accountDate) {
            this.account_date = accountDate;
            return this;
        }
        /**
         * Length of time since the cardholder’s account information with the 3DS Requestor was last changed. Including Billing or Shipping address, new payment account, or new user(s) added.
         * @param changeIndicator 01 = Changed during this transaction, 02 = Less than 30 days, 03 = 30−60 days, 04 = More than 60 days
         * @return Builder
         */
        setChangeIndicator(changeIndicator) {
            this.change_indicator = changeIndicator;
            return this;
        }
        /**
         * Date that the cardholder’s account with the 3DS Requestor was last changed. Including Billing or Shipping address
         * @param changeDate Date format: yyyy-MM-dd
         * @return Builder
         */
        setChangeDate(changeDate) {
            this.change_date = changeDate;
            return this;
        }
        /**
         * Length of time since the cardholder’s account with the 3DS Requestor had a password change or account reset.
         * @param accountPasswordChangeIndicator 01 = No change, 02 = Changed during this transaction, 03 = Less than 30 days, 04 = 30−60 days, 05 = More than 60 days
         * @return Builder
         */
        setPasswordChangeIndicator(accountPasswordChangeIndicator) {
            this.password_change_indicator = accountPasswordChangeIndicator;
            return this;
        }
        /**
         * Date that cardholder’s account with the 3DS Requestor had a password change or account reset.
         * @param passwordChangeDate Date format: yyyy-MM-dd
         * @return Builder
         */
        setPasswordChangeDate(passwordChangeDate) {
            this.password_change_date = passwordChangeDate;
            return this;
        }
        /**
         * Number of purchases with this cardholder account during the previous six months.
         * @param numberOfRecentPurchases Max value: 9999
         * @return Builder
         */
        setNumberOfRecentPurchases(numberOfRecentPurchases) {
            this.number_of_recent_purchases = numberOfRecentPurchases;
            return this;
        }
        /**
         * Number of Add Card attempts in the last 24 hours.
         * @param numberOfAddCardAttemptsDay Max value: 999
         * @return Builder
         */
        setNumberOfAddCardAttemptsDay(numberOfAddCardAttemptsDay) {
            this.number_of_add_card_attempts_day = numberOfAddCardAttemptsDay;
            return this;
        }
        /**
         * Number of transactions (successful and abandoned) for this cardholder account with the 3DS Requestor across all payment accounts in the previous 24 hours.
         * @param numberOfTransactionActivityDay Max value: 999
         * @return Builder
         */
        setNumberOfTransactionActivityDay(numberOfTransactionActivityDay) {
            this.number_of_transaction_activity_day = numberOfTransactionActivityDay;
            return this;
        }
        /**
         * Number of transactions (successful and abandoned) for this cardholder account with the 3DS Requestor across all payment accounts in the previous year.
         * @param numberOfTransactionActivityYear Max value: 999
         * @return Builder
         */
        setNumberOfTransactionActivityYear(numberOfTransactionActivityYear) {
            this.number_of_transaction_activity_year = numberOfTransactionActivityYear;
            return this;
        }
        /**
         * Indicates when the shipping address used for this transaction was first used with the 3DS Requestor.
         * @param shippingAddressIndicator 01 = This transaction, 02 = Less than 30 days, 03 = 30−60 days, 04 = More than 60 days
         * @return Builder
         */
        setShippingAddressIndicator(shippingAddressIndicator) {
            this.shipping_address_indicator = shippingAddressIndicator;
            return this;
        }
        /**
         * Date when the shipping address used for this transaction was first used with the 3DS Requestor
         * @param shippingAddressUsageDate Date format: yyyy-MM-dd
         * @return Builder
         */
        setShippingAddressUsageDate(shippingAddressUsageDate) {
            this.shipping_address_usage_date = shippingAddressUsageDate;
            return this;
        }
        /** Indicates whether the 3DS Requestor has experienced suspicious activity (including previous fraud) on the cardholder account.
         * @param suspiciousActivity  01 = No suspicious activity has been observed, 02 = Suspicious activity has been observed
         * @return Builder
         */
        setSuspiciousActivity(suspiciousActivity) {
            this.suspicious_activity = suspiciousActivity;
            return this;
        }
        build() {
            return new CustomerAccount(this.account_age_indicator, this.account_date, this.change_indicator, this.change_date, this.password_change_indicator, this.password_change_date, this.number_of_recent_purchases, this.number_of_add_card_attempts_day, this.number_of_transaction_activity_day, this.number_of_transaction_activity_year, this.shipping_address_indicator, this.shipping_address_usage_date, this.suspicious_activity);
        }
    }
    CustomerAccountBuilder.RequestBuilder = RequestBuilder;
})(CustomerAccountBuilder = exports.CustomerAccountBuilder || (exports.CustomerAccountBuilder = {}));
/**
 * Length of time that the cardholder has had the account.
 * 01 = No account (guest check-out)
 * 02 = Created during this transaction
 * 03 = Less than 30 days
 * 04 = 30−60 days
 * 05 = More than 60 days
 */
var AccountAgeIndicator;
(function (AccountAgeIndicator) {
    AccountAgeIndicator["NoAccount"] = "01";
    AccountAgeIndicator["CreatedDuringTransaction"] = "02";
    AccountAgeIndicator["LessThan30Days"] = "03";
    AccountAgeIndicator["Between30And60Days"] = "04";
    AccountAgeIndicator["MoreThan60Days"] = "05";
})(AccountAgeIndicator = exports.AccountAgeIndicator || (exports.AccountAgeIndicator = {}));
/**
 * Length of time since the cardholder’s account information was last changed. Including Billing or Shipping address, new payment account, or new user(s) added.
 * 01 = Changed during this transaction
 * 02 = Less than 30 days
 * 03 = 30−60 days
 * 04 = More than 60 days
 */
var AccountInformationChangeIndicator;
(function (AccountInformationChangeIndicator) {
    AccountInformationChangeIndicator["ChangedDuringTransaction"] = "01";
    AccountInformationChangeIndicator["LessThan30Days"] = "02";
    AccountInformationChangeIndicator["Between30And60Days"] = "03";
    AccountInformationChangeIndicator["MoreThan60Days"] = "04";
})(AccountInformationChangeIndicator = exports.AccountInformationChangeIndicator || (exports.AccountInformationChangeIndicator = {}));
/**
 * Length of time since the cardholder’s account had a password change or account reset.
 * 01 = No change
 * 02 = Changed during this transaction
 * 03 = Less than 30 days
 * 04 = 30−60 days
 * 05 = More than 60 days
 */
var AccountPasswordChangeIndicator;
(function (AccountPasswordChangeIndicator) {
    AccountPasswordChangeIndicator["NoChange"] = "01";
    AccountPasswordChangeIndicator["ChangedDuringTransaction"] = "02";
    AccountPasswordChangeIndicator["LessThan30Days"] = "03";
    AccountPasswordChangeIndicator["Between30And60Days"] = "04";
    AccountPasswordChangeIndicator["MoreThan60Days"] = "05";
})(AccountPasswordChangeIndicator = exports.AccountPasswordChangeIndicator || (exports.AccountPasswordChangeIndicator = {}));
/**
 * Indicates when the shipping address used for this transaction was first used.
 * 01 = This transaction
 * 02 = Less than 30 days
 * 03 = 30−60 days
 * 04 = More than 60 days
 */
var ShippingAddressFirstUsedIndicator;
(function (ShippingAddressFirstUsedIndicator) {
    ShippingAddressFirstUsedIndicator["ThisTransaction"] = "01";
    ShippingAddressFirstUsedIndicator["LessThan30Days"] = "02";
    ShippingAddressFirstUsedIndicator["Between30And60Days"] = "03";
    ShippingAddressFirstUsedIndicator["MoreThan60Days"] = "04";
})(ShippingAddressFirstUsedIndicator = exports.ShippingAddressFirstUsedIndicator || (exports.ShippingAddressFirstUsedIndicator = {}));
/**
 * Indicates whether suspicious activity has been experienced (including previous fraud) on the cardholder account.
 * 01 = No suspicious activity has been observed
 * 02 = Suspicious activity has been observed
 */
var SuspiciousActivityIndicator;
(function (SuspiciousActivityIndicator) {
    SuspiciousActivityIndicator["NoSuspiciousActivity"] = "01";
    SuspiciousActivityIndicator["SuspiciousActivityObserved"] = "02";
})(SuspiciousActivityIndicator = exports.SuspiciousActivityIndicator || (exports.SuspiciousActivityIndicator = {}));
//# sourceMappingURL=CustomerAccount.js.map