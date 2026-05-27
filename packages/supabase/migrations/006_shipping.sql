CREATE TABLE delivery_zones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  cities TEXT[] NOT NULL DEFAULT '{}',
  base_fee INTEGER NOT NULL DEFAULT 0,
  free_threshold INTEGER,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE shipping_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  zone_id UUID NOT NULL REFERENCES delivery_zones(id) ON DELETE CASCADE,
  max_distance_km NUMERIC,
  fee INTEGER NOT NULL,
  estimated_days TEXT
);
