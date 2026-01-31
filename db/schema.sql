-- =========================
-- ENUMS
-- =========================

CREATE TYPE user_role AS ENUM ('CLIENT', 'VET', 'ADMIN');

CREATE TYPE appointment_status AS ENUM (
  'REQUESTED',
  'CONFIRMED',
  'CANCELLED',
  'COMPLETED',
  'NO_SHOW'
);

-- =========================
-- USERS
-- =========================

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role user_role NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- VETS
-- =========================

CREATE TABLE vets (
  id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  specialty TEXT,
  active BOOLEAN DEFAULT TRUE
);

-- =========================
-- PETS
-- =========================

CREATE TABLE pets (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  species TEXT NOT NULL,
  breed TEXT,
  birth_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- SERVICES
-- =========================

CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
  price NUMERIC(10,2) NOT NULL CHECK (price >= 0)
);

-- =========================
-- APPOINTMENTS
-- =========================

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  client_id INTEGER NOT NULL REFERENCES users(id),
  pet_id INTEGER NOT NULL REFERENCES pets(id),
  vet_id INTEGER NOT NULL REFERENCES vets(id),
  service_id INTEGER NOT NULL REFERENCES services(id),
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  status appointment_status NOT NULL DEFAULT 'REQUESTED',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  CHECK (start_time < end_time)
);

-- =========================
-- ANTI OVERLAP
-- =========================

CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE appointments
ADD CONSTRAINT no_vet_overlap
EXCLUDE USING GIST (
  vet_id WITH =,
  tsrange(start_time, end_time) WITH &&
)
WHERE (status <> 'CANCELLED');

-- =========================
-- STATUS HISTORY (BITÁCORA)
-- =========================

CREATE TABLE appointment_status_history (
  id SERIAL PRIMARY KEY,
  appointment_id INTEGER REFERENCES appointments(id) ON DELETE CASCADE,
  old_status appointment_status,
  new_status appointment_status,
  changed_by INTEGER REFERENCES users(id),
  changed_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- PAYMENTS
-- =========================

CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  appointment_id INTEGER UNIQUE REFERENCES appointments(id),
  amount NUMERIC(10,2) NOT NULL,
  payment_id TEXT UNIQUE NOT NULL, -- idempotencia
  paid_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- INDEXES (PERFORMANCE)
-- =========================

CREATE INDEX idx_appointments_vet_date
ON appointments (vet_id, start_time);

CREATE INDEX idx_appointments_client
ON appointments (client_id);

CREATE INDEX idx_appointments_status_date
ON appointments (status, start_time);
