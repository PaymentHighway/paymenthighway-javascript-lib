"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Purchase {
    /**
     * @param shipping_indicator
     * @param delivery_time_frame
     * @param email max length 254
     * @param reorder_items_indicator
     * @param pre_order_purchase_indicator
     * @param pre_order_date For a pre-ordered purchase, the expected date that the merchandise will be available
     * @param shipping_name_indicator
     */
    constructor(shipping_indicator, delivery_time_frame, email, reorder_items_indicator, pre_order_purchase_indicator, pre_order_date, shipping_name_indicator) { }
}
exports.Purchase = Purchase;
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