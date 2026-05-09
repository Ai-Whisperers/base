// ─── Cart (factory pattern) ─────────────────────────────────────────────────
export { createCart } from "./cart/cart-context"
export type { CartConfig } from "./cart/cart-context"
export { CartMerger } from "./cart/cart-merger"
export { CartToastListener } from "./cart/cart-toast-listener"

// ─── Checkout ───────────────────────────────────────────────────────────────
export { CheckoutStepper } from "./checkout/checkout-stepper"
export { DeliveryCalculator } from "./checkout/delivery-calculator"

// ─── Payment ────────────────────────────────────────────────────────────────
export { registerGateway, getGateway, getRegisteredGateways } from "./payment/factory"
export type { PaymentRequest, GatewayResult, GatewayAdapter } from "./payment/factory"
// Payment gateway files import side-effects to register themselves

// ─── Product ────────────────────────────────────────────────────────────────
export { BulkPriceDisplay } from "./product/bulk-price"
export { ProductReviews } from "./product/product-reviews"

// ─── UI ─────────────────────────────────────────────────────────────────────
export { CouponInput } from "./coupon-input"

// ─── Types ──────────────────────────────────────────────────────────────────
export type { CartItem } from "./types"
