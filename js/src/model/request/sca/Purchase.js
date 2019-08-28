"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Purchase {
    constructor(shipping_indicator, delivery_time_frame, delivery_email, reorder_items_indicator, pre_order_purchase_indicator, pre_order_date, shipping_name_indicator, gift_card_amount, gift_card_count) {
        this.shipping_indicator = shipping_indicator;
        this.delivery_time_frame = delivery_time_frame;
        this.delivery_email = delivery_email;
        this.reorder_items_indicator = reorder_items_indicator;
        this.pre_order_purchase_indicator = pre_order_purchase_indicator;
        this.pre_order_date = pre_order_date;
        this.shipping_name_indicator = shipping_name_indicator;
        this.gift_card_amount = gift_card_amount;
        this.gift_card_count = gift_card_count;
    }
    static Builder() {
        return new PurchaseBuilder.RequestBuilder();
    }
}
exports.Purchase = Purchase;
var PurchaseBuilder;
(function (PurchaseBuilder) {
    class RequestBuilder {
        /**
         * Merchants must choose the Shipping Indicator code that most accurately describes the cardholder’s specific transaction, not their general business.
         * If one or more items are included in the sale, use the Shipping Indicator code for the physical goods, or if all digital goods, use the Shipping Indicator code that describes the most expensive item.
         * @param shippingIndicator Indicates shipping method chosen for the transaction.
         * @return Builder
         */
        setShippingIndicator(shippingIndicator) {
            this.shipping_indicator = shippingIndicator;
            return this;
        }
        /**
         * @param deliveryTimeFrame Indicates the merchandise delivery timeframe.
         * @return Builder
         */
        setDeliveryTimeFrame(deliveryTimeFrame) {
            this.delivery_time_frame = deliveryTimeFrame;
            return this;
        }
        /**
         * @param deliveryEmail For Electronic delivery, the email address to which the merchandise was delivered. Max length: 254
         * @return Builder
         */
        setDeliveryEmail(deliveryEmail) {
            this.delivery_email = deliveryEmail;
            return this;
        }
        /**
         * @param reorderItemsIndicator Indicates whether the cardholder is reordering previously purchased merchandise.
         * @return Builder
         */
        setReorderItemsIndicator(reorderItemsIndicator) {
            this.reorder_items_indicator = reorderItemsIndicator;
            return this;
        }
        /**
         * @param preOrderPurchaseIndicator Indicates whether Cardholder is placing an order for merchandise with a future availability or release date.
         * @return Builder
         */
        setPreOrderPurchaseIndicator(preOrderPurchaseIndicator) {
            this.pre_order_purchase_indicator = preOrderPurchaseIndicator;
            return this;
        }
        /**
         * For a pre-ordered purchase, the expected date that the merchandise will be available
         * @param preOrderDate Date format: yyyy-MM-dd
         * @return Builder
         */
        setPreOrderDate(preOrderDate) {
            this.pre_order_date = preOrderDate;
            return this;
        }
        /**
         * @param shippingNameIndicator Indicates if the Cardholder Name on the account is identical to the shipping Name used for this transaction.
         * @return Builder
         */
        setShippingNameIndicator(shippingNameIndicator) {
            this.shipping_name_indicator = shippingNameIndicator;
            return this;
        }
        /**
         * For prepaid or gift card purchase, the purchase amount total of prepaid or gift card(s)
         * @param giftCardAmount Amount in the minor currency units. Max value: 999999999999999
         * @return Builder
         */
        setGiftCardAmount(giftCardAmount) {
            this.gift_card_amount = giftCardAmount;
            return this;
        }
        /**
         * For prepaid or gift card purchase, total count of individual prepaid or gift cards/codes purchased.
         * @param giftCardCount Max value: 99
         * @return Builder
         */
        setGiftCardCount(giftCardCount) {
            this.gift_card_count = giftCardCount;
            return this;
        }
        build() {
            return new Purchase(this.shipping_indicator, this.delivery_time_frame, this.delivery_email, this.reorder_items_indicator, this.pre_order_purchase_indicator, this.pre_order_date, this.shipping_name_indicator, this.gift_card_amount, this.gift_card_count);
        }
    }
    PurchaseBuilder.RequestBuilder = RequestBuilder;
})(PurchaseBuilder = exports.PurchaseBuilder || (exports.PurchaseBuilder = {}));
/**
 * 01 = Ship to cardholder’s billing address,
 * 02 = Ship to another verified address on file with merchant
 * 03 = Ship to address that is different than the cardholder’s billing address
 * 04 = “Ship to Store” / Pick-up at local store (Store address shall be populated in shipping address fields)
 * 05 = Digital goods (includes online services, electronic gift cards and redemption codes)
 * 06 = Travel and Event tickets, not shipped
 * 07 = Other (for example, Gaming, digital services not shipped, emedia subscriptions, etc.)
 */
var ShippingIndicator;
(function (ShippingIndicator) {
    ShippingIndicator["ShipToCardholdersAddress"] = "01";
    ShippingIndicator["ShipToVerifiedAddress"] = "02";
    ShippingIndicator["ShipToDifferentAddress"] = "03";
    ShippingIndicator["ShipToStore"] = "04";
    ShippingIndicator["DigitalGoods"] = "05";
    ShippingIndicator["TravelAndEventTickets"] = "06";
    ShippingIndicator["Other"] = "07";
})(ShippingIndicator = exports.ShippingIndicator || (exports.ShippingIndicator = {}));
/**
 * Indicates the merchandise delivery timeframe.
 * 01 = Electronic Delivery
 * 02 = Same day shipping
 * 03 = Overnight shipping
 * 04 = Two-day or more shipping
 */
var DeliveryTimeFrame;
(function (DeliveryTimeFrame) {
    DeliveryTimeFrame["ElectronicDelivery"] = "01";
    DeliveryTimeFrame["SameDayShipping"] = "02";
    DeliveryTimeFrame["OvernightShipping"] = "03";
    DeliveryTimeFrame["TwoDarOrMoreShipping"] = "04";
})(DeliveryTimeFrame = exports.DeliveryTimeFrame || (exports.DeliveryTimeFrame = {}));
var ReorderItemsIndicator;
(function (ReorderItemsIndicator) {
    ReorderItemsIndicator["FirstTimeOrdered"] = "01";
    ReorderItemsIndicator["Reorder"] = "02";
})(ReorderItemsIndicator = exports.ReorderItemsIndicator || (exports.ReorderItemsIndicator = {}));
var PreOrderPurchaseIndicator;
(function (PreOrderPurchaseIndicator) {
    PreOrderPurchaseIndicator["MerchandiseAvailable"] = "01";
    PreOrderPurchaseIndicator["FutureAvailability"] = "02";
})(PreOrderPurchaseIndicator = exports.PreOrderPurchaseIndicator || (exports.PreOrderPurchaseIndicator = {}));
/**
 * 01 = Account Name identical to shipping Name
 * 02 = Account Name different than shipping Name
 */
var ShippingNameIndicator;
(function (ShippingNameIndicator) {
    ShippingNameIndicator["AccountNameMatchesShippingName"] = "01";
    ShippingNameIndicator["AccountNameDifferentThanShippingName"] = "02";
})(ShippingNameIndicator = exports.ShippingNameIndicator || (exports.ShippingNameIndicator = {}));
//# sourceMappingURL=Purchase.js.map