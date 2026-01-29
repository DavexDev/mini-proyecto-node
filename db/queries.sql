-- 1. Agenda diaria de un veterinario
SELECT 
  a.id,
  a.start_time,
  a.end_time,
  p.name AS pet_name,
  s.name AS service_name,
  a.status
FROM appointments a
JOIN pets p ON a.pet_id = p.id
JOIN services s ON a.service_id = s.id
WHERE a.vet_id = $1
  AND DATE(a.start_time) = $2
ORDER BY a.start_time;

-- 2. Próximas citas de un cliente
SELECT
  a.id,
  a.start_time,
  a.end_time,
  p.name AS pet_name,
  s.name AS service_name,
  a.status
FROM appointments a
JOIN pets p ON a.pet_id = p.id
JOIN services s ON a.service_id = s.id
WHERE p.owner_id = $1
  AND a.start_time > NOW()
ORDER BY a.start_time;

-- 3. Tasa de cancelación por veterinario
SELECT
  v.id AS vet_id,
  COUNT(*) FILTER (WHERE a.status = 'CANCELLED')::decimal / COUNT(*) AS cancellation_rate
FROM appointments a
JOIN vets v ON a.vet_id = v.id
WHERE a.start_time BETWEEN $1 AND $2
GROUP BY v.id;

-- 4. Servicios más solicitados en el mes
SELECT
  s.name,
  COUNT(*) AS total_requests
FROM appointments a
JOIN services s ON a.service_id = s.id
WHERE DATE_TRUNC('month', a.start_time) = DATE_TRUNC('month', NOW())
GROUP BY s.name
ORDER BY total_requests DESC
LIMIT 5;

-- 5. Ingresos por veterinario
SELECT
  v.id AS vet_id,
  SUM(p.amount) AS total_income
FROM payments p
JOIN appointments a ON p.appointment_id = a.id
JOIN vets v ON a.vet_id = v.id
WHERE a.status = 'COMPLETED'
  AND p.paid_at BETWEEN $1 AND $2
GROUP BY v.id;
