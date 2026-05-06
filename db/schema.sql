-- Void Vision — Database Schema
-- Cloudflare D1

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  price REAL NOT NULL,
  description TEXT,
  stock INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active',
  images TEXT, -- JSON array of R2 image keys
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_number TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER DEFAULT 1,
  total REAL NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, shipped, delivered, cancelled
  tracking_number TEXT,
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Seed sample products
INSERT INTO products (name, brand, price, description, stock) VALUES
  ('Radar EV Path', 'Oakley', 4499, 'Performance sport sunglasses with Prizm lens technology', 25),
  ('SPR 17W Symbole', 'Prada', 5999, 'Iconic Prada geometric frame with gradient lenses', 15),
  ('Panthère de Cartier', 'Cartier', 7499, 'Timeless Cartier design with gold-finish hardware', 10),
  ('Hearts IV', 'Chrome Hearts', 8999, 'Handcrafted chrome accents with premium acetate', 8),
  ('DL0325', 'Diesel', 3499, 'Bold industrial design with polarized lenses', 30),
  ('Millionaires', 'Louis Vuitton', 9999, 'Iconic LV monogram detail with gradient lenses', 5);