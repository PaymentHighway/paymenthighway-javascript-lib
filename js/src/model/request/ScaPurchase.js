"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ScaPurchase {
    constructor(shipping_indicator, delivery_time_frame, email, reorder_items_indicator, pre_order_purchase_indicator, pre_order_date, shipping_name_indicator) { }
}
exports.ScaPurchase = ScaPurchase;
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
var DeliveryTimeFrameIndicator;
(function (DeliveryTimeFrameIndicator) {
    DeliveryTimeFrameIndicator["ElectroniceDelivery"] = "01";
    DeliveryTimeFrameIndicator["SameDayShipping"] = "02";
    DeliveryTimeFrameIndicator["OvernightShipping"] = "03";
    DeliveryTimeFrameIndicator["TwoDarOrMoreShipping"] = "04";
})(DeliveryTimeFrameIndicator = exports.DeliveryTimeFrameIndicator || (exports.DeliveryTimeFrameIndicator = {}));
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
var ShippingNameIndicator;
(function (ShippingNameIndicator) {
    ShippingNameIndicator["AccountNameMatchesShippingName"] = "01";
    ShippingNameIndicator["AccountNameDifferentThanShippingName"] = "02";
})(ShippingNameIndicator = exports.ShippingNameIndicator || (exports.ShippingNameIndicator = {}));
//# sourceMappingURL=ScaPurchase.js.map