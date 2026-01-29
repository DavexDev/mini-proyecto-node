-- Roles
CREATE TYPE user_role AS ENUM ('CLIENT', 'VET', 'ADMIN');

CREATE TYPE appointment_status AS ENUM (
  'REQUESTED',
  'CONFIRMED',
  'CANCELLED',
  'COMPLETED',
  'NO_SHOW'
);

-- Usuarios
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role user_role NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Veterinarios (perfil)
CREATE TABLE vets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  specialty VARCHAR(100)
);

-- Mascotas
CREATE TABLE pets (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(50) NOT NULL,
  species VARCHAR(50) NOT NULL,
  breed VARCHAR(50),
  birth_date DATE
);

-- Servicios
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  duration_minutes INTEGER NOT NULL,
  price NUMERIC(10,2) NOT NULL
);

-- Citas
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  pet_id INTEGER REFERENCES pets(id),
  vet_id INTEGER REFERENCES vets(id),
  service_id INTEGER REFERENCES services(id),
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  status appointment_status DEFAULT 'REQUESTED',
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),

  CHECK (end_time > start_time)
);

-- Pagos
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  appointment_id INTEGER UNIQUE REFERENCES appointments(id) ON DELETE CASCADE,
  amount NUMERIC(10,2) NOT NULL,
  paid_at TIMESTAMP DEFAULT NOW()
);
-- Evitar doble reserva por veterinario
CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE appointments
ADD CONSTRAINT no_vet_overlap
EXCLUDE USING GIST (
  vet_id WITH =,
  tsrange(start_time, end_time) WITH &&
)
WHERE (status IN ('REQUESTED', 'CONFIRMED'));
