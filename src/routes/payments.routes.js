router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const idempotencyKey = req.headers['idempotency-key'];

    if (!idempotencyKey) {
      throw new AppError(
        'Idempotency-Key header is required',
        400,
        'IDEMPOTENCY_KEY_REQUIRED'
      );
    }

    const result = await processPayment({
      ...req.body,
      idempotencyKey,
      userId: req.user.id
    });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});
