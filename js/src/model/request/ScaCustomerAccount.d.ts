export declare class ScaCustomerAccount {
    constructor(account_age_indicator?: AccountAgeIndicator, account_date?: string, change_indicator?: AccountInformationChangeIndicator, change_date?: string, password_change_indicator?: AccountPasswordChangeIndicator, password_change_date?: string, number_of_recent_purchases?: number, number_of_add_card_attempts_day?: number, number_of_transaction_activity_day?: number, number_of_transaction_activity_year?: number, shipping_address_indicator?: ShippingAddressFirstUsedIndicator, shipping_address_usage_date?: string, suspicious_activity?: SuspiciousActivityIndicator);
}
export declare enum AccountAgeIndicator {
    NoAccount = "01",
    CreatedDuringTransaction = "02",
    LessThan30Days = "03",
    LessThan60Days = "04",
    MoreThan60Days = "05"
}
export declare enum AccountInformationChangeIndicator {
    ChangedDuringTransaction = "01",
    LessThan30Days = "02",
    LessThan60Days = "03",
    MoreThan60Days = "04"
}
export declare enum AccountPasswordChangeIndicator {
    NoChange = "01",
    ChangedDuringTransaction = "02",
    LessThan30Days = "03",
    LessThan60Days = "04",
    MoreThan60Days = "05"
}
export declare enum ShippingAddressFirstUsedIndicator {
    ThisTransaction = "01",
    LessThan30Days = "02",
    LessThan60Days = "03",
    MoreThan60Days = "04"
}
export declare enum SuspiciousActivityIndicator {
    NoSuspiciousActivity = "01",
    SuspiciousActivityObserved = "02"
}
