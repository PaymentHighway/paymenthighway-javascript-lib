"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomerAccount {
    /**
     * @param account_age_indicator Length of time that the cardholder has had the account.
     * @param account_date Date, when the cardholder opened the account at merchant (eg. "2019-07-05")
     * @param change_indicator Length of time since the cardholder’s account information was last changed.
     * @param change_date Date, when the cardholder’s account was last changed. Including Billing or Shipping address (eg. "2019-07-05")
     * @param password_change_indicator Length of time since the cardholder’s account had a password change or account reset.
     * @param password_change_date Date, when cardholder’s account with the 3DS Requestor had a password change or account reset. (eg. "2019-07-05")
     * @param number_of_recent_purchases Max value: 9999, Number of purchases with this cardholder account during the previous six months.
     * @param number_of_add_card_attempts_day Max value: 999, Number of Add Card attempts in the last 24 hours.
     * @param number_of_transaction_activity_day Max value: 999, Number of transactions (successful and abandoned) for this cardholder account across all payment accounts in the previous 24 hours.
     * @param number_of_transaction_activity_year Max value: 999, Number of transactions (successful and abandoned) for this cardholder account with the 3DS Requestor across all payment accounts in the previous year.
     * @param shipping_address_indicator Indicates when the shipping address used for this transaction was first used.
     * @param shipping_address_usage_date Date, when the shipping address used for this transaction was first used. (eg. "2019-07-05")
     * @param suspicious_activity Indicates whether suspicious activity has been experienced (including previous fraud) on the cardholder account.
     */
    constructor(account_age_indicator, account_date, change_indicator, change_date, password_change_indicator, password_change_date, number_of_recent_purchases, number_of_add_card_attempts_day, number_of_transaction_activity_day, number_of_transaction_activity_year, shipping_address_indicator, shipping_address_usage_date, suspicious_activity) { }
}
exports.CustomerAccount = CustomerAccount;
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