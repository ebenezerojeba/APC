// utils/pixel.js — reusable helper
export const fbEvent = (event, data = {}) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, data);
  }
};

// Usage in your components:
fbEvent("ViewContent",      { content_name: "Straight Lace Wig", content_category: "Wigs", value: 120.00, currency: "CAD" });
fbEvent("AddToCart",        { content_name: "Hair Extension 18in", value: 85.00, currency: "CAD" });
fbEvent("InitiateCheckout", { value: 205.00, currency: "CAD", num_items: 2 });
fbEvent("Purchase",         { value: 205.00, currency: "CAD", transaction_id: "stripe_pi_xxx" });
fbEvent("Schedule",         {}); // appointment booked