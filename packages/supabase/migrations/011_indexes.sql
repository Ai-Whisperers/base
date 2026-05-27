-- products
CREATE INDEX idx_products_category_active ON products(category_id, is_active);
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_created_at ON products(created_at DESC);

-- orders
CREATE INDEX idx_orders_user_created ON orders(user_id, created_at DESC);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- order_timeline
CREATE INDEX idx_order_timeline_order_created ON order_timeline(order_id, created_at DESC);

-- cart_items
CREATE INDEX idx_cart_items_cart ON cart_items(cart_id);

-- stock_movements
CREATE INDEX idx_stock_movements_product_created ON stock_movements(product_id, created_at DESC);

-- b2b_orders
CREATE INDEX idx_b2b_orders_customer_created ON b2b_orders(customer_id, created_at DESC);

-- blog_posts
CREATE INDEX idx_blog_posts_published_date ON blog_posts(published, published_at DESC);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);

-- addresses
CREATE INDEX idx_addresses_user ON addresses(user_id);
