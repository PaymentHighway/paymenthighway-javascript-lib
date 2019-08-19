"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ScaCustomerAccount {
    constructor(account_age_indicator, account_date, change_indicator, change_date, password_change_indicator, password_change_date, number_of_recent_purchases, number_of_add_card_attempts_day, number_of_transaction_activity_day, number_of_transaction_activity_year, shipping_address_indicator, shipping_address_usage_date, suspicious_activity) { }
}
exports.ScaCustomerAccount = ScaCustomerAccount;
var AccountAgeIndicator;
(function (AccountAgeIndicator) {
    AccountAgeIndicator["NoAccount"] = "01";
    AccountAgeIndicator["CreatedDuringTransaction"] = "02";
    AccountAgeIndicator["LessThan30Days"] = "03";
    AccountAgeIndicator["LessThan60Days"] = "04";
    AccountAgeIndicator["MoreThan60Days"] = "05";
})(AccountAgeIndicator = exports.AccountAgeIndicator || (exports.AccountAgeIndicator = {}));
var AccountInformationChangeIndicator;
(function (AccountInformationChangeIndicator) {
    AccountInformationChangeIndicator["ChangedDuringTransaction"] = "01";
    AccountInformationChangeIndicator["LessThan30Days"] = "02";
    AccountInformationChangeIndicator["LessThan60Days"] = "03";
    AccountInformationChangeIndicator["MoreThan60Days"] = "04";
})(AccountInformationChangeIndicator = exports.AccountInformationChangeIndicator || (exports.AccountInformationChangeIndicator = {}));
var AccountPasswordChangeIndicator;
(function (AccountPasswordChangeIndicator) {
    AccountPasswordChangeIndicator["NoChange"] = "01";
    AccountPasswordChangeIndicator["ChangedDuringTransaction"] = "02";
    AccountPasswordChangeIndicator["LessThan30Days"] = "03";
    AccountPasswordChangeIndicator["LessThan60Days"] = "04";
    AccountPasswordChangeIndicator["MoreThan60Days"] = "05";
})(AccountPasswordChangeIndicator = exports.AccountPasswordChangeIndicator || (exports.AccountPasswordChangeIndicator = {}));
var ShippingAddressFirstUsedIndicator;
(function (ShippingAddressFirstUsedIndicator) {
    ShippingAddressFirstUsedIndicator["ThisTransaction"] = "01";
    ShippingAddressFirstUsedIndicator["LessThan30Days"] = "02";
    ShippingAddressFirstUsedIndicator["LessThan60Days"] = "03";
    ShippingAddressFirstUsedIndicator["MoreThan60Days"] = "04";
})(ShippingAddressFirstUsedIndicator = exports.ShippingAddressFirstUsedIndicator || (exports.ShippingAddressFirstUsedIndicator = {}));
var SuspiciousActivityIndicator;
(function (SuspiciousActivityIndicator) {
    SuspiciousActivityIndicator["NoSuspiciousActivity"] = "01";
    SuspiciousActivityIndicator["SuspiciousActivityObserved"] = "02";
})(SuspiciousActivityIndicator = exports.SuspiciousActivityIndicator || (exports.SuspiciousActivityIndicator = {}));
//# sourceMappingURL=ScaCustomerAccount.js.map