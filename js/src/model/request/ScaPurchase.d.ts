export declare class ScaPurchase {
    constructor(shipping_indicator?: ShippingIndicator, delivery_time_frame?: DeliveryTimeFrameIndicator, email?: string, reorder_items_indicator?: ReorderItemsIndicator, pre_order_purchase_indicator?: PreOrderPurchaseIndicator, pre_order_date?: string, shipping_name_indicator?: ShippingNameIndicator);
}
export declare enum ShippingIndicator {
    ShipToCardholdersAddress = "01",
    ShipToVerifiedAddress = "02",
    ShipToDifferentAddress = "03",
    ShipToStore = "04",
    DigitalGoods = "05",
    TravelAndEventTickets = "06",
    Other = "07"
}
export declare enum DeliveryTimeFrameIndicator {
    ElectroniceDelivery = "01",
    SameDayShipping = "02",
    OvernightShipping = "03",
    TwoDarOrMoreShipping = "04"
}
export declare enum ReorderItemsIndicator {
    FirstTimeOrdered = "01",
    Reorder = "02"
}
export declare enum PreOrderPurchaseIndicator {
    MerchandiseAvailable = "01",
    FutureAvailability = "02"
}
export declare enum ShippingNameIndicator {
    AccountNameMatchesShippingName = "01",
    AccountNameDifferentThanShippingName = "02"
}
