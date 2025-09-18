// src/utils/orderHandlers.js
import { createOrder } from "../orderforfriendcom/order_api/createOrder";
import Carthandler from "./Carthandler";
import { sendWhatsAppBill } from "../../messagecarrier/whatsappsendgift";
import { generateWhatsAppBulkLink } from "../../messagecarrier/WhatsAppmebulk";
import { generateWhatsAppLink } from "../../messagecarrier/Whatsappme";

export const handleSubmitOrder = async ({
  orderData,
  formData, // gift-specific fields, optional
  receiverName,
  phone,
  addressDetail,
  setPhone,
  setAddressDetail,
  setLoading,
  setErrorMsg,
  setSuccess,
  onClose,
  isGift = false, // flag to know if it's gift order
}) => {
  setErrorMsg("");

  // Validation
  if (!isGift && (!phone || !addressDetail)) {
    setErrorMsg("Please fill all required fields.");
    return;
  }

  if (
    isGift &&
    (!formData.receiverName || !formData.ageGroup || !formData.gender)
  ) {
    setErrorMsg("कृपया सबै आवश्यक फिल्डहरू भर्नुहोस्।");
    return;
  }

  // Prepare items with proper quantities
  let itemsOrdered = [];
  if (orderData.cart?.length) {
    // Aggregate same items
    const itemMap = {};
    orderData.cart.forEach((item) => {
      if (itemMap[item.name]) {
        itemMap[item.name].quantity += item.quantity;
        itemMap[item.name].price += item.price * item.quantity;
      } else {
        itemMap[item.name] = {
          name: item.name,
          quantity: item.quantity,
          price: item.price * item.quantity,
        };
      }
    });
    itemsOrdered = Object.values(itemMap);
  } else if (orderData.name && orderData.price) {
    itemsOrdered = [
      {
        name: orderData.name,
        price: orderData.price * (orderData.quantity || 1),
        quantity: orderData.quantity || 1,
      },
    ];
  } else {
    itemsOrdered = [
      {
        name: "Default Item",
        price: orderData.totalPrice || 0,
        quantity: 1,
      },
    ];
  }

  // Build order object
  const uniqueId = `order-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const orderObj = isGift
    ? {
        id: uniqueId,
        createdAt: new Date().toISOString(),
        senderName: formData.senderName || "Guest",
        senderPhone: formData.senderPhone || null,
        receiverName: formData.receiverName,
        receiverPhone: formData.receiverPhone || null,
        receiverAgeGroup: formData.ageGroup,
        receiverGender: formData.gender,
        relationship: formData.relationship,
        message: formData.message,
        occasion: formData.occasion,
        deliveryCharge: orderData.deliveryChargeFinal || 0,
        totalPrice:
          Number(orderData.totalPrice) +
          Number(formData.additionalCost || 0) +
          Number(formData.LINK_GENERATION_COST || 0),
        itemsOrdered,
        giftRange: formData.giftRange,
        giftCost: formData.giftCost || 0,
      }
    : {
        id: uniqueId,
        createdAt: new Date().toISOString(),
        senderName: "Guest",
        senderPhone: null,
        receiverName,
        receiverPhone: phone,
        receiverAddress: addressDetail,
        deliveryCharge:
          orderData.deliveryChargeFinal || orderData.shiftValue || 0,
        totalPrice: orderData.totalPrice || orderData.price || 0,
        itemsOrdered,
      };

  setLoading(true);

  try {
    const response = await createOrder(orderObj);

    if (!response.success) {
      setErrorMsg(response.error || "Failed to create order.");
      return;
    }

    // Clear inputs if needed
    if (!isGift) {
      setPhone("");
      setAddressDetail("");
    }

    localStorage.removeItem("cart");

    const orderWithId = { ...orderObj, id: response.data.orderId };
    let existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    existingOrders.push(orderWithId);
    if (existingOrders.length > 5) existingOrders = [orderWithId];
    localStorage.setItem("orders", JSON.stringify(existingOrders));

    setSuccess(true);

    // WhatsApp redirection (fixed to use aggregated itemsOrdered)
    if (isGift) {
      sendWhatsAppBill(orderObj, response.data.orderId);
    } else if (itemsOrdered.length > 0) {
      if (itemsOrdered.length === 1) {
        const item = itemsOrdered[0];
        const link = generateWhatsAppLink({
          name: item.name,
          price: item.price / item.quantity, // single unit price
          count: item.quantity,
        });
        window.open(link, "_blank");
      } else {
        const link = generateWhatsAppBulkLink(itemsOrdered);
        window.open(link, "_blank");
      }
    } else {
      console.warn("No items to send via WhatsApp");
    }

    // Delay for UI updates and cart handling
    setTimeout(() => {
      setSuccess(false);
      onClose();

      if (!isGift) {
        Carthandler(
          orderData.cart || [
            {
              name: orderData.name,
              price: orderData.price,
              quantity: orderData.quantity || 1,
              category: orderData.category || "General",
            },
          ],
          orderData.isNightShift || false,
          orderData.totalPrice || orderData.price || 0,
          orderData.setCheckoutMessage || (() => {}),
          orderData.setCart || (() => {})
        );
      }
    }, 2000);
  } catch (err) {
    console.error("❌ Unexpected error:", err.message);
    setErrorMsg("Something went wrong. Please try again.");
  } finally {
    setLoading(false);
  }
};
