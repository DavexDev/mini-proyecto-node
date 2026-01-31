export async function processPayment(data) {
  const existing = await db.query(
    'SELECT * FROM payments WHERE idempotency_key = $1',
    [data.idempotencyKey]
  );

  if (existing.rows.length > 0) {
    return existing.rows[0]; // idempotente 🔒
  }

  const payment = await db.query(
    `
    INSERT INTO payments
    (appointment_id, amount, method, status, idempotency_key)
    VALUES ($1, $2, $3, 'SUCCESS', $4)
    RETURNING *
    `,
    [
      data.appointmentId,
      data.amount,
      data.method,
      data.idempotencyKey
    ]
  );

  return payment.rows[0];
}
