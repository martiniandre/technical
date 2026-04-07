import { z } from 'zod';

export const loginRequestSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export const SYSTEM_ROLES = {
  administrator: "Administrator",
  engineer: "Engineer",
  viewer: "Viewer",
} as const

export type UserRoles = keyof typeof SYSTEM_ROLES
const ROLE_KEYS = Object.keys(SYSTEM_ROLES) as [UserRoles, ...UserRoles[]];

export const userSchema = z.object({
  id: z.number(),
  username: z.string(),
  name: z.string(),
  role: z.enum(ROLE_KEYS),
});

export const loginResponseSchema = z.object({
  user: userSchema,
  token: z.string(),
});

export type LoginRequestDTO = z.infer<typeof loginRequestSchema>;
export type UserDTO = z.infer<typeof userSchema>;
export type LoginResponseDTO = z.infer<typeof loginResponseSchema>;
