export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned"

export type PaymentStatus =
  | "pending"
  | "completed"
  | "failed"
  | "refunded"

export type B2BCustomerTier =
  | "bronze"
  | "silver"
  | "gold"
  | "platinum"

export type B2BCustomerStatus =
  | "active"
  | "suspended"
  | "pending"

export type B2BOrderStatus =
  | "pending"
  | "approved"
  | "shipped"
  | "invoiced"

export type StockMovementType =
  | "in"
  | "out"
  | "adjustment"
  | "return"

export type ContentDraftStatus =
  | "draft"
  | "review"
  | "published"

export type PointTransactionType =
  | "earn"
  | "redeem"
  | "expire"
  | "bonus"

export interface Profile {
  id: string
  name: string | null
  email: string | null
  phone: string | null
  avatar_url: string | null
  role: string
  created_at: string
  updated_at: string
}

export interface AdminUser {
  id: string
  user_id: string
  role: string
  permissions: Record<string, unknown>[]
  created_at: string
}

export interface Address {
  id: string
  user_id: string
  street: string
  city: string
  state: string | null
  zip: string | null
  country: string
  is_default: boolean
  lat: number | null
  lng: number | null
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  parent_id: string | null
  sort_order: number | null
  is_active: boolean
  created_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  short_description: string | null
  base_price: number
  compare_price: number | null
  cost_price: number | null
  iva: number
  category_id: string | null
  images: Record<string, unknown>[]
  tags: string[]
  specs: Record<string, unknown>[]
  stock: number
  min_stock: number
  is_active: boolean
  is_featured: boolean
  seo_title: string | null
  seo_description: string | null
  created_at: string
  updated_at: string
}

export interface ProductVariant {
  id: string
  product_id: string
  name: string
  sku: string
  price: number | null
  stock: number | null
  attributes: Record<string, unknown>[]
  is_active: boolean
}

export interface StockMovement {
  id: string
  product_id: string
  variant_id: string | null
  quantity: number
  type: StockMovementType
  reason: string | null
  created_by: string | null
  created_at: string
}

export interface Cart {
  id: string
  user_id: string | null
  session_id: string | null
  status: string
  coupon_code: string | null
  coupon_discount: number
  notes: string | null
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  cart_id: string
  product_id: string | null
  variant_id: string | null
  name: string
  price: number
  quantity: number
  image_url: string | null
}

export interface Order {
  id: string
  user_id: string | null
  order_number: string
  status: OrderStatus
  items: Record<string, unknown>[]
  subtotal: number
  discount: number
  iva_10: number
  iva_5: number
  shipping_cost: number
  total: number
  payment_method: string | null
  payment_status: string | null
  shipping_address_id: string | null
  delivery_zone_id: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface OrderTimeline {
  id: string
  order_id: string
  status: OrderStatus
  note: string | null
  created_by: string | null
  created_at: string
}

export interface PaymentTransaction {
  id: string
  order_id: string
  gateway: string
  gateway_transaction_id: string | null
  amount: number
  currency: string
  status: PaymentStatus
  metadata: Record<string, unknown>[]
  created_at: string
  updated_at: string
}

export interface B2BCustomer {
  id: string
  user_id: string
  business_name: string
  ruc: string
  phone: string | null
  email: string | null
  tier: B2BCustomerTier
  credit_limit: number | null
  payment_terms: string | null
  status: B2BCustomerStatus
  created_at: string
}

export interface B2BPrice {
  id: string
  product_id: string
  tier: B2BCustomerTier
  unit_price: number
  min_quantity: number | null
}

export interface B2BOrder {
  id: string
  customer_id: string
  order_number: string
  subtotal: number
  discount: number
  iva_10: number
  iva_5: number
  total: number
  status: B2BOrderStatus
  created_at: string
}

export interface B2BOrderItem {
  id: string
  order_id: string
  product_id: string | null
  name: string
  quantity: number
  price: number
  iva: number
}

export interface DeliveryZone {
  id: string
  name: string
  cities: string[]
  base_fee: number
  free_threshold: number | null
  is_active: boolean
  created_at: string
}

export interface ShippingRate {
  id: string
  zone_id: string
  max_distance_km: number | null
  fee: number
  estimated_days: string | null
}

export interface Page {
  id: string
  slug: string
  title: string
  meta_title: string | null
  meta_description: string | null
  published: boolean
  created_at: string
  updated_at: string
}

export interface PageSection {
  id: string
  page_id: string
  type: string
  content: Record<string, unknown>[]
  sort_order: number
}

export interface ContentDraft {
  id: string
  page_id: string
  title: string
  content: Record<string, unknown>[]
  status: ContentDraftStatus
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description: string | null
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string | null
  featured_image: string | null
  category_id: string | null
  author_id: string | null
  published: boolean
  published_at: string | null
  seo_title: string | null
  seo_description: string | null
  created_at: string
  updated_at: string
}

export interface BlogComment {
  id: string
  post_id: string
  author_name: string
  author_email: string | null
  content: string
  approved: boolean
  created_at: string
}

export interface LoyaltyPoints {
  id: string
  user_id: string
  total_points: number
  tier: string
  created_at: string
  updated_at: string
}

export interface PointTransaction {
  id: string
  user_id: string
  type: PointTransactionType
  amount: number
  description: string | null
  reference_type: string | null
  reference_id: string | null
  expires_at: string | null
  created_at: string
}

export interface Reward {
  id: string
  name: string
  description: string | null
  points_required: number
  quantity_available: number | null
  image_url: string | null
  is_active: boolean
  created_at: string
}

export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile }
      admin_users: { Row: AdminUser }
      addresses: { Row: Address }
      categories: { Row: Category }
      products: { Row: Product }
      product_variants: { Row: ProductVariant }
      stock_movements: { Row: StockMovement }
      carts: { Row: Cart }
      cart_items: { Row: CartItem }
      orders: { Row: Order }
      order_timeline: { Row: OrderTimeline }
      payment_transactions: { Row: PaymentTransaction }
      b2b_customers: { Row: B2BCustomer }
      b2b_prices: { Row: B2BPrice }
      b2b_orders: { Row: B2BOrder }
      b2b_order_items: { Row: B2BOrderItem }
      delivery_zones: { Row: DeliveryZone }
      shipping_rates: { Row: ShippingRate }
      pages: { Row: Page }
      page_sections: { Row: PageSection }
      content_drafts: { Row: ContentDraft }
      blog_categories: { Row: BlogCategory }
      blog_posts: { Row: BlogPost }
      blog_comments: { Row: BlogComment }
      loyalty_points: { Row: LoyaltyPoints }
      point_transactions: { Row: PointTransaction }
      rewards: { Row: Reward }
    }
    Enums: {
      order_status: OrderStatus
      payment_status: PaymentStatus
      stock_movement_type: StockMovementType
      b2b_customer_tier: B2BCustomerTier
      b2b_customer_status: B2BCustomerStatus
      b2b_order_status: B2BOrderStatus
      content_draft_status: ContentDraftStatus
      point_transaction_type: PointTransactionType
    }
  }
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"]
export type TablesInsert<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T] extends { Insert: infer I } ? I : never
export type TablesUpdate<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T] extends { Update: infer U } ? U : never
export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T]
