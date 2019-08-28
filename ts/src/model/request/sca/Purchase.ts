export class Purchase {
    constructor(
        public shipping_indicator?: ShippingIndicator,
        public delivery_time_frame?: DeliveryTimeFrame,
        public delivery_email?: string,
        public reorder_items_indicator?: ReorderItemsIndicator,
        public pre_order_purchase_indicator?: PreOrderPurchaseIndicator,
        public pre_order_date?: string,
        public shipping_name_indicator?: ShippingNameIndicator,
        public gift_card_amount?: number,
        public gift_card_count?: number
    ) {
    }

    public static Builder(): PurchaseBuilder.RequestBuilder {
        return new PurchaseBuilder.RequestBuilder();
    }
}

export namespace PurchaseBuilder {
    export class RequestBuilder {
        private shipping_indicator: ShippingIndicator;
        private delivery_time_frame: DeliveryTimeFrame;
        private delivery_email: string;
        private reorder_items_indicator: ReorderItemsIndicator;
        private pre_order_purchase_indicator: PreOrderPurchaseIndicator;
        private pre_order_date: string;
        private shipping_name_indicator: ShippingNameIndicator;
        private gift_card_amount: number;
        private gift_card_count: number;

        /**
         * Merchants must choose the Shipping Indicator code that most accurately describes the cardholder’s specific transaction, not their general business.
         * If one or more items are included in the sale, use the Shipping Indicator code for the physical goods, or if all digital goods, use the Shipping Indicator code that describes the most expensive item.
         * @param shippingIndicator Indicates shipping method chosen for the transaction.
         * @return Builder
         */
        public setShippingIndicator(shippingIndicator: ShippingIndicator) {
            this.shipping_indicator = shippingIndicator;
            return this;
        }

        /**
         * @param deliveryTimeFrame Indicates the merchandise delivery timeframe.
         * @return Builder
         */
        public setDeliveryTimeFrame(deliveryTimeFrame: DeliveryTimeFrame) {
            this.delivery_time_frame = deliveryTimeFrame;
            return this;
        }

        /**
         * @param deliveryEmail For Electronic delivery, the email address to which the merchandise was delivered. Max length: 254
         * @return Builder
         */
        public setDeliveryEmail(deliveryEmail: string) {
            this.delivery_email = deliveryEmail;
            return this;
        }

        /**
         * @param reorderItemsIndicator Indicates whether the cardholder is reordering previously purchased merchandise.
         * @return Builder
         */
        public setReorderItemsIndicator(reorderItemsIndicator: ReorderItemsIndicator) {
            this.reorder_items_indicator = reorderItemsIndicator;
            return this;
        }

        /**
         * @param preOrderPurchaseIndicator Indicates whether Cardholder is placing an order for merchandise with a future availability or release date.
         * @return Builder
         */
        public setPreOrderPurchaseIndicator(preOrderPurchaseIndicator: PreOrderPurchaseIndicator) {
            this.pre_order_purchase_indicator = preOrderPurchaseIndicator;
            return this;
        }

        /**
         * For a pre-ordered purchase, the expected date that the merchandise will be available
         * @param preOrderDate Date format: yyyy-MM-dd
         * @return Builder
         */
        public setPreOrderDate(preOrderDate: string) {
            this.pre_order_date = preOrderDate;
            return this;
        }

        /**
         * @param shippingNameIndicator Indicates if the Cardholder Name on the account is identical to the shipping Name used for this transaction.
         * @return Builder
         */
        public setShippingNameIndicator(shippingNameIndicator: ShippingNameIndicator) {
            this.shipping_name_indicator = shippingNameIndicator;
            return this;
        }

        /**
         * For prepaid or gift card purchase, the purchase amount total of prepaid or gift card(s)
         * @param giftCardAmount Amount in the minor currency units. Max value: 999999999999999
         * @return Builder
         */
        public setGiftCardAmount(giftCardAmount: number) {
            this.gift_card_amount = giftCardAmount;
            return this;
        }

        /**
         * For prepaid or gift card purchase, total count of individual prepaid or gift cards/codes purchased.
         * @param giftCardCount Max value: 99
         * @return Builder
         */
        public setGiftCardCount(giftCardCount: number) {
            this.gift_card_count = giftCardCount;
            return this;
        }

        public build(): Purchase {
            return new Purchase(
                this.shipping_indicator,
                this.delivery_time_frame,
                this.delivery_email,
                this.reorder_items_indicator,
                this.pre_order_purchase_indicator,
                this.pre_order_date,
                this.shipping_name_indicator,
                this.gift_card_amount,
                this.gift_card_count
            );
        }
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
    TwoDarOrMoreShipping = '04'
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
    AccountNameDifferentThanShippingName = '02'
}