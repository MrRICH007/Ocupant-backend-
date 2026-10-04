// Seed the database with demo users and the 8 houses from the frontend.
// Run once:  npm run seed
const bcrypt = require('bcryptjs');
const db = require('./db');

const houses = [
  (1, 'Luxury Lakeside Villa', 'Beverly Hills, California', 'West Coast, USA', 'Three Bedroom', 'vacant', 3, 2, '2,400 sqft', 45000, 42000, 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800', 'Stunning lakeside villa with panoramic views, modern amenities, and private dock access.', 'James Richardson', '+1 (555) 234-5678', '15552345678'),
  (2, 'Modern Downtown Loft', 'Manhattan, New York', 'East Coast, USA', 'Two Bedroom', 'occupied', 2, 1, '1,200 sqft', 38000, 36000, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800', 'Contemporary loft in the heart of the city with floor-to-ceiling windows and rooftop access.', 'Sarah Chen', '+1 (555) 876-5432', '15558765432'),
  (3, 'Cozy Garden Apartment', 'Portland, Oregon', 'Pacific Northwest, USA', 'Self-Contain', 'vacant', 1, 1, '650 sqft', 18000, 16500, 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800', 'Charming self-contained unit with private garden, perfect for solo living.', 'Michael Torres', '+1 (555) 345-6789', '15553456789'),
  (4, 'Executive Penthouse Suite', 'Miami Beach, Florida', 'Southeast, USA', 'Three Bedroom', 'vacant', 3, 3, '3,100 sqft', 62000, 58000, 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800', 'Luxurious penthouse with ocean views, private pool, and smart home technology.', 'Victoria Sterling', '+1 (555) 987-6543', '15559876543'),
  (5, 'Minimalist Studio', 'Austin, Texas', 'South Central, USA', 'Bedsitter', 'occupied', 1, 1, '450 sqft', 14000, 13000, 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800', 'Efficient and stylish bedsitter in a vibrant neighborhood close to tech hubs.', 'David Park', '+1 (555) 456-7890', '15554567890'),
  (6, 'Suburban Family Home', 'Naperville, Illinois', 'Midwest, USA', 'Three Bedroom', 'vacant', 3, 2, '2,000 sqft', 32000, 30000, 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800', 'Spacious family home in a quiet suburb with excellent schools and parks nearby.', 'Robert & Lisa Johnson', '+1 (555) 567-8901', '15555678901'),
  (7, 'Urban Micro-Loft', 'Seattle, Washington', 'Pacific Northwest, USA', 'Bedsitter', 'vacant', 1, 1, '380 sqft', 16000, 15000, 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800', 'Smart-designed micro-loft maximizing every square foot with innovative storage solutions.', 'Emma Wilson', '+1 (555) 678-9012', '15556789012'),
  (8, 'Riverside Townhouse', 'Boston, Massachusetts', 'New England, USA', 'Two Bedroom', 'occupied', 2, 2, '1,500 sqft', 35000, 33000, 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800', 'Historic townhouse with modern renovations, featuring river views and private patio.', 'Thomas Blake', '+1 (555) 789-0123', '15557890123')
];

const insertHouse = db.prepare(`
  INSERT INTO houses (id, title, location, generic_location, type, status, beds, baths, area,
                      first_year_price, subsequent_price, image, description,
                      owner_name, owner_phone, owner_whatsapp)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const seed = db.transaction(() => {
  for (const h of houses) {
    insertHouse.run(...h);
  }

  db.prepare(`INSERT INTO users (name, email, password_hash, is_admin)
              VALUES ('Admin', 'admin@ocupant.com', ?, 1)`)
    .run(bcrypt.hashSync('admin1234', 10));

  db.prepare(`INSERT INTO users (name, email, password_hash, plan, premium_until)
              VALUES ('Demo Premium', 'demo@ocupant.com', ?, 'premium', datetime('now', '+30 days'))`)
    .run(bcrypt.hashSync('demo1234', 10));

  db.prepare(`INSERT INTO users (name, email, password_hash)
              VALUES ('Alex Mwangi', 'alex@example.com', ?)`)
    .run(bcrypt.hashSync('password123', 10));

  db.prepare(`INSERT INTO roommate_requests (user_id, house_id, budget, message)
              VALUES (3, 1, 20000, 'Quiet professional, looking to split a 3-bedroom.')`).run();
});

seed();
console.log('Seeded ' + houses.length + ' houses, 3 users, 1 roommate request.');
