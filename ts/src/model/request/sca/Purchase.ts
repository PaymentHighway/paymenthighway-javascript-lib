export class Purchase {
    /**
     * @param shipping_indicator
     * @param delivery_time_frame
     * @param delivery_email max length 254
     * @param reorder_items_indicator
     * @param pre_order_purchase_indicator
     * @param pre_order_date For a pre-ordered purchase, the expected date that the merchandise will be available
     * @param shipping_name_indicator
     */
    constructor(
        shipping_indicator?: ShippingIndicator,
        delivery_time_frame?: DeliveryTimeFrame,
        delivery_email?: string,
        reorder_items_indicator?: ReorderItemsIndicator,
        pre_order_purchase_indicator?: PreOrderPurchaseIndicator,
        pre_order_date?: string,
        shipping_name_indicator?: ShippingNameIndicator
    ){}
}

/**
 * 01 = Ship to cardholder’s billing address,
 * 02 = Ship to another verified address on file with merchant
 * 03 = Ship to address that is different than the cardholder’s billing address
 * 04 = “Ship to Store” / Pick-up at local store (Store address shall be populated in shipping address fields)
 * 05 = Digital goods (includes online services, electronic gift cards and redemption codes)
 * 06 = Travel and Event tickets, not shipped
 * 07 = Other (for example, Gaming, digital services not shipped, emedia subscriptions, etc.)
 */
export enum ShippingIndicator {
    ShipToCardholdersAddress = '01',
    ShipToVerifiedAddress = '02',
    ShipToDifferentAddress = '03',
    ShipToStore = '04',
    DigitalGoods = '05',
    TravelAndEventTickets = '06',
    Other = '07'
}

/**
 * Indicates the merchandise delivery timeframe.
 * 01 = Electronic Delivery
 * 02 = Same day shipping
 * 03 = Overnight shipping
 * 04 = Two-day or more shipping
 */
export enum DeliveryTimeFrame {
    ElectronicDelivery = '01',
    SameDayShipping = '02',
    OvernightShipping = '03',
    TwoDarOrMoreShipping= '04'
}

export enum ReorderItemsIndicator {
    FirstTimeOrdered = '01',
    Reorder = '02'
}

export enum PreOrderPurchaseIndicator {
    MerchandiseAvailable = '01',
    FutureAvailability = '02'
}

/**
 * 01 = Account Name identical to shipping Name
 * 02 = Account Name different than shipping Name
 */
export enum ShippingNameIndicator {
    AccountNameMatchesShippingName = '01',
    AccountNameDifferentThanShippingName= '02'
}