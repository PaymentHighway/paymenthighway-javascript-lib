export declare class Purchase {
    shipping_indicator?: ShippingIndicator;
    delivery_time_frame?: DeliveryTimeFrame;
    delivery_email?: string;
    reorder_items_indicator?: ReorderItemsIndicator;
    pre_order_purchase_indicator?: PreOrderPurchaseIndicator;
    pre_order_date?: string;
    shipping_name_indicator?: ShippingNameIndicator;
    gift_card_amount?: number;
    gift_card_count?: number;
    constructor(shipping_indicator?: ShippingIndicator, delivery_time_frame?: DeliveryTimeFrame, delivery_email?: string, reorder_items_indicator?: ReorderItemsIndicator, pre_order_purchase_indicator?: PreOrderPurchaseIndicator, pre_order_date?: string, shipping_name_indicator?: ShippingNameIndicator, gift_card_amount?: number, gift_card_count?: number);
    static Builder(): PurchaseBuilder.RequestBuilder;
}
export declare namespace PurchaseBuilder {
    class RequestBuilder {
        private shipping_indicator;
        private delivery_time_frame;
        private delivery_email;
        private reorder_items_indicator;
        private pre_order_purchase_indicator;
        private pre_order_date;
        private shipping_name_indicator;
        private gift_card_amount;
        private gift_card_count;
        /**
         * Merchants must choose the Shipping Indicator code that most accurately describes the cardholder’s specific transaction, not their general business.
         * If one or more items are included in the sale, use the Shipping Indicator code for the physical goods, or if all digital goods, use the Shipping Indicator code that describes the most expensive item.
         * @param shippingIndicator Indicates shipping method chosen for the transaction.
         * @return Builder
         */
        setShippingIndicator(shippingIndicator: ShippingIndicator): this;
        /**
         * @param deliveryTimeFrame Indicates the merchandise delivery timeframe.
         * @return Builder
         */
        setDeliveryTimeFrame(deliveryTimeFrame: DeliveryTimeFrame): this;
        /**
         * @param deliveryEmail For Electronic delivery, the email address to which the merchandise was delivered. Max length: 254
         * @return Builder
         */
        setDeliveryEmail(deliveryEmail: string): this;
        /**
         * @param reorderItemsIndicator Indicates whether the cardholder is reordering previously purchased merchandise.
         * @return Builder
         */
        setReorderItemsIndicator(reorderItemsIndicator: ReorderItemsIndicator): this;
        /**
         * @param preOrderPurchaseIndicator Indicates whether Cardholder is placing an order for merchandise with a future availability or release date.
         * @return Builder
         */
        setPreOrderPurchaseIndicator(preOrderPurchaseIndicator: PreOrderPurchaseIndicator): this;
        /**
         * For a pre-ordered purchase, the expected date that the merchandise will be available
         * @param preOrderDate Date format: yyyy-MM-dd
         * @return Builder
         */
        setPreOrderDate(preOrderDate: string): this;
        /**
         * @param shippingNameIndicator Indicates if the Cardholder Name on the account is identical to the shipping Name used for this transaction.
         * @return Builder
         */
        setShippingNameIndicator(shippingNameIndicator: ShippingNameIndicator): this;
        /**
         * For prepaid or gift card purchase, the purchase amount total of prepaid or gift card(s)
         * @param giftCardAmount Amount in the minor currency units. Max value: 999999999999999
         * @return Builder
         */
        setGiftCardAmount(giftCardAmount: number): this;
        /**
         * For prepaid or gift card purchase, total count of individual prepaid or gift cards/codes purchased.
         * @param giftCardCount Max value: 99
         * @return Builder
         */
        setGiftCardCount(giftCardCount: number): this;
        build(): Purchase;
    }
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
export declare enum ShippingIndicator {
    ShipToCardholdersAddress = "01",
    ShipToVerifiedAddress = "02",
    ShipToDifferentAddress = "03",
    ShipToStore = "04",
    DigitalGoods = "05",
    TravelAndEventTickets = "06",
    Other = "07"
}
/**
 * Indicates the merchandise delivery timeframe.
 * 01 = Electronic Delivery
 * 02 = Same day shipping
 * 03 = Overnight shipping
 * 04 = Two-day or more shipping
 */
export declare enum DeliveryTimeFrame {
    ElectronicDelivery = "01",
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
/**
 * 01 = Account Name identical to shipping Name
 * 02 = Account Name different than shipping Name
 */
export declare enum ShippingNameIndicator {
    AccountNameMatchesShippingName = "01",
    AccountNameDifferentThanShippingName = "02"
}
