export const config = {
  port: Number(process.env.PORT) || 3000,
  jwtSecret: 'supersecretkey',
  jwtExpiresIn: '24h',
  wsUpdateIntervalMs: 5000,
} as const;
