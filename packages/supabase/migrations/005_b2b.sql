CREATE TYPE b2b_customer_tier AS ENUM ('bronze', 'silver', 'gold', 'platinum');
CREATE TYPE b2b_customer_status AS ENUM ('active', 'suspended', 'pending');
CREATE TYPE b2b_order_status AS ENUM ('pending', 'approved', 'shipped', 'invoiced');

CREATE TABLE b2b_customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  business_name TEXT NOT NULL,
  ruc TEXT NOT NULL UNIQUE,
  phone TEXT,
  email TEXT,
  tier b2b_customer_tier NOT NULL DEFAULT 'bronze',
  credit_limit INTEGER,
  payment_terms TEXT,
  status b2b_customer_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE b2b_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  tier b2b_customer_tier NOT NULL,
  unit_price INTEGER NOT NULL,
  min_quantity INTEGER
);

CREATE TABLE b2b_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES b2b_customers(id) ON DELETE CASCADE,
  order_number TEXT NOT NULL,
  subtotal INTEGER NOT NULL,
  discount INTEGER NOT NULL DEFAULT 0,
  iva_10 INTEGER NOT NULL DEFAULT 0,
  iva_5 INTEGER NOT NULL DEFAULT 0,
  total INTEGER NOT NULL,
  status b2b_order_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE b2b_order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES b2b_orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price INTEGER NOT NULL,
  iva INTEGER NOT NULL DEFAULT 10
);
