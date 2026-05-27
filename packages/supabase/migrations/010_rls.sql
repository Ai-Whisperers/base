ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_movements ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_timeline ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE b2b_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE b2b_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE b2b_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE b2b_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE shipping_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE loyalty_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE point_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION auth.is_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users WHERE user_id = auth.uid()
  );
$$;

CREATE OR REPLACE FUNCTION auth.is_admin_or_own(user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
AS $$
  SELECT auth.is_admin() OR auth.uid() = user_id;
$$;

-- profiles
CREATE POLICY "Users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Admins can read all profiles" ON profiles FOR SELECT USING (auth.is_admin());
CREATE POLICY "Admins can update all profiles" ON profiles FOR UPDATE USING (auth.is_admin());

-- admin_users
CREATE POLICY "Admins can read admin_users" ON admin_users FOR SELECT USING (auth.is_admin());
CREATE POLICY "Admins can insert admin_users" ON admin_users FOR INSERT WITH CHECK (auth.is_admin());
CREATE POLICY "Admins can update admin_users" ON admin_users FOR UPDATE USING (auth.is_admin());

-- addresses
CREATE POLICY "Users can read own addresses" ON addresses FOR SELECT USING (auth.is_admin_or_own(user_id));
CREATE POLICY "Users can insert own addresses" ON addresses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own addresses" ON addresses FOR UPDATE USING (auth.is_admin_or_own(user_id));
CREATE POLICY "Users can delete own addresses" ON addresses FOR DELETE USING (auth.uid() = user_id);

-- categories
CREATE POLICY "Public can read active categories" ON categories FOR SELECT USING (is_active = true OR auth.is_admin());
CREATE POLICY "Admins can manage categories" ON categories FOR INSERT WITH CHECK (auth.is_admin());
CREATE POLICY "Admins can update categories" ON categories FOR UPDATE USING (auth.is_admin());
CREATE POLICY "Admins can delete categories" ON categories FOR DELETE USING (auth.is_admin());

-- products
CREATE POLICY "Public can read active products" ON products FOR SELECT USING (is_active = true OR auth.is_admin());
CREATE POLICY "Admins can manage products" ON products FOR INSERT WITH CHECK (auth.is_admin());
CREATE POLICY "Admins can update products" ON products FOR UPDATE USING (auth.is_admin());
CREATE POLICY "Admins can delete products" ON products FOR DELETE USING (auth.is_admin());

-- product_variants
CREATE POLICY "Public can read active variants" ON product_variants FOR SELECT USING (is_active = true OR auth.is_admin());
CREATE POLICY "Admins can manage variants" ON product_variants FOR INSERT WITH CHECK (auth.is_admin());
CREATE POLICY "Admins can update variants" ON product_variants FOR UPDATE USING (auth.is_admin());
CREATE POLICY "Admins can delete variants" ON product_variants FOR DELETE USING (auth.is_admin());

-- stock_movements
CREATE POLICY "Admins can read stock_movements" ON stock_movements FOR SELECT USING (auth.is_admin());
CREATE POLICY "Admins can manage stock_movements" ON stock_movements FOR INSERT WITH CHECK (auth.is_admin());

-- carts
CREATE POLICY "Users can read own cart" ON carts FOR SELECT USING (auth.is_admin_or_own(user_id));
CREATE POLICY "Users can insert own cart" ON carts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cart" ON carts FOR UPDATE USING (auth.is_admin_or_own(user_id));
CREATE POLICY "Users can delete own cart" ON carts FOR DELETE USING (auth.uid() = user_id);

-- cart_items
CREATE POLICY "Users can read own cart items" ON cart_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM carts WHERE carts.id = cart_items.cart_id AND auth.is_admin_or_own(carts.user_id))
);
CREATE POLICY "Users can manage own cart items" ON cart_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM carts WHERE carts.id = cart_items.cart_id AND auth.uid() = carts.user_id)
);
CREATE POLICY "Users can update own cart items" ON cart_items FOR UPDATE USING (
  EXISTS (SELECT 1 FROM carts WHERE carts.id = cart_items.cart_id AND auth.is_admin_or_own(carts.user_id))
);
CREATE POLICY "Users can delete own cart items" ON cart_items FOR DELETE USING (
  EXISTS (SELECT 1 FROM carts WHERE carts.id = cart_items.cart_id AND auth.uid() = carts.user_id)
);

-- orders
CREATE POLICY "Users can read own orders" ON orders FOR SELECT USING (auth.is_admin_or_own(user_id));
CREATE POLICY "Users can insert own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can update orders" ON orders FOR UPDATE USING (auth.is_admin());

-- order_timeline
CREATE POLICY "Users can read own order timeline" ON order_timeline FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_timeline.order_id AND auth.is_admin_or_own(orders.user_id))
);
CREATE POLICY "Admins can insert order timeline" ON order_timeline FOR INSERT WITH CHECK (auth.is_admin());

-- payment_transactions
CREATE POLICY "Users can read own payment transactions" ON payment_transactions FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = payment_transactions.order_id AND auth.is_admin_or_own(orders.user_id))
);
CREATE POLICY "Admins can manage payment_transactions" ON payment_transactions FOR INSERT WITH CHECK (auth.is_admin());
CREATE POLICY "Admins can update payment_transactions" ON payment_transactions FOR UPDATE USING (auth.is_admin());

-- b2b_customers
CREATE POLICY "Users can read own b2b profile" ON b2b_customers FOR SELECT USING (auth.is_admin_or_own(user_id));
CREATE POLICY "Admins can manage b2b_customers" ON b2b_customers FOR INSERT WITH CHECK (auth.is_admin());
CREATE POLICY "Admins can update b2b_customers" ON b2b_customers FOR UPDATE USING (auth.is_admin());

-- b2b_prices
CREATE POLICY "Public can read b2b_prices" ON b2b_prices FOR SELECT USING (true);
CREATE POLICY "Admins can manage b2b_prices" ON b2b_prices FOR INSERT WITH CHECK (auth.is_admin());
CREATE POLICY "Admins can update b2b_prices" ON b2b_prices FOR UPDATE USING (auth.is_admin());

-- b2b_orders
CREATE POLICY "Users can read own b2b orders" ON b2b_orders FOR SELECT USING (
  EXISTS (SELECT 1 FROM b2b_customers WHERE b2b_customers.id = b2b_orders.customer_id AND auth.is_admin_or_own(b2b_customers.user_id))
);
CREATE POLICY "Admins can manage b2b_orders" ON b2b_orders FOR INSERT WITH CHECK (auth.is_admin());
CREATE POLICY "Admins can update b2b_orders" ON b2b_orders FOR UPDATE USING (auth.is_admin());

-- b2b_order_items
CREATE POLICY "Users can read own b2b order items" ON b2b_order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM b2b_orders WHERE b2b_orders.id = b2b_order_items.order_id
    AND EXISTS (SELECT 1 FROM b2b_customers WHERE b2b_customers.id = b2b_orders.customer_id AND auth.is_admin_or_own(b2b_customers.user_id)))
);
CREATE POLICY "Admins can manage b2b_order_items" ON b2b_order_items FOR INSERT WITH CHECK (auth.is_admin());

-- delivery_zones
CREATE POLICY "Public can read delivery_zones" ON delivery_zones FOR SELECT USING (true);
CREATE POLICY "Admins can manage delivery_zones" ON delivery_zones FOR INSERT WITH CHECK (auth.is_admin());
CREATE POLICY "Admins can update delivery_zones" ON delivery_zones FOR UPDATE USING (auth.is_admin());

-- shipping_rates
CREATE POLICY "Public can read shipping_rates" ON shipping_rates FOR SELECT USING (true);
CREATE POLICY "Admins can manage shipping_rates" ON shipping_rates FOR INSERT WITH CHECK (auth.is_admin());
CREATE POLICY "Admins can update shipping_rates" ON shipping_rates FOR UPDATE USING (auth.is_admin());

-- pages
CREATE POLICY "Public can read published pages" ON pages FOR SELECT USING (published = true OR auth.is_admin());
CREATE POLICY "Admins can manage pages" ON pages FOR INSERT WITH CHECK (auth.is_admin());
CREATE POLICY "Admins can update pages" ON pages FOR UPDATE USING (auth.is_admin());

-- page_sections
CREATE POLICY "Public can read published page sections" ON page_sections FOR SELECT USING (
  EXISTS (SELECT 1 FROM pages WHERE pages.id = page_sections.page_id AND (pages.published = true OR auth.is_admin()))
);
CREATE POLICY "Admins can manage page_sections" ON page_sections FOR INSERT WITH CHECK (auth.is_admin());
CREATE POLICY "Admins can update page_sections" ON page_sections FOR UPDATE USING (auth.is_admin());

-- content_drafts
CREATE POLICY "Admins can read content_drafts" ON content_drafts FOR SELECT USING (auth.is_admin());
CREATE POLICY "Admins can manage content_drafts" ON content_drafts FOR INSERT WITH CHECK (auth.is_admin());
CREATE POLICY "Admins can update content_drafts" ON content_drafts FOR UPDATE USING (auth.is_admin());

-- blog_categories
CREATE POLICY "Public can read blog_categories" ON blog_categories FOR SELECT USING (true);
CREATE POLICY "Admins can manage blog_categories" ON blog_categories FOR INSERT WITH CHECK (auth.is_admin());
CREATE POLICY "Admins can update blog_categories" ON blog_categories FOR UPDATE USING (auth.is_admin());

-- blog_posts
CREATE POLICY "Public can read published blog_posts" ON blog_posts FOR SELECT USING (published = true OR auth.is_admin());
CREATE POLICY "Admins can manage blog_posts" ON blog_posts FOR INSERT WITH CHECK (auth.is_admin());
CREATE POLICY "Admins can update blog_posts" ON blog_posts FOR UPDATE USING (auth.is_admin());

-- blog_comments
CREATE POLICY "Public can read approved comments" ON blog_comments FOR SELECT USING (approved = true OR auth.is_admin());
CREATE POLICY "Anyone can insert comments" ON blog_comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can update comments" ON blog_comments FOR UPDATE USING (auth.is_admin());

-- loyalty_points
CREATE POLICY "Users can read own loyalty_points" ON loyalty_points FOR SELECT USING (auth.is_admin_or_own(user_id));
CREATE POLICY "Admins can manage loyalty_points" ON loyalty_points FOR INSERT WITH CHECK (auth.is_admin());
CREATE POLICY "Admins can update loyalty_points" ON loyalty_points FOR UPDATE USING (auth.is_admin());

-- point_transactions
CREATE POLICY "Users can read own point_transactions" ON point_transactions FOR SELECT USING (auth.is_admin_or_own(user_id));
CREATE POLICY "Admins can manage point_transactions" ON point_transactions FOR INSERT WITH CHECK (auth.is_admin());

-- rewards
CREATE POLICY "Public can read active rewards" ON rewards FOR SELECT USING (is_active = true OR auth.is_admin());
CREATE POLICY "Admins can manage rewards" ON rewards FOR INSERT WITH CHECK (auth.is_admin());
CREATE POLICY "Admins can update rewards" ON rewards FOR UPDATE USING (auth.is_admin());
