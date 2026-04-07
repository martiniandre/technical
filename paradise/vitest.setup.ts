import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('recharts', async () => {
  const actual = await vi.importActual('recharts');
  return {
    ...actual as any,
    ResponsiveContainer: ({ children }: any) => children,
  };
});
