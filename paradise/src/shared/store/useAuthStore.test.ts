import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from './useAuthStore';
import type { UserDTO } from '../services/dto/auth';

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.getState().clearAuth();
  });

  it('should initialize with null user and token and isAuthenticated false', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('should securely set authentication state and token via setAuth', () => {
    const mockUser: UserDTO = { id: 1, username: 'johndoe', name: 'John Doe', role: 'administrator' };
    const mockToken = 'mock-jwt-header.payload.signature';

    useAuthStore.getState().setAuth(mockToken, mockUser);

    const state = useAuthStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.token).toBe(mockToken);
    expect(state.isAuthenticated).toBe(true);
  });

  it('should completely expunge auth state on clearAuth', () => {
    const mockUser: UserDTO = { id: 2, username: 'janedoe', name: 'Jane', role: 'viewer' };
    useAuthStore.getState().setAuth('temp-token', mockUser);

    expect(useAuthStore.getState().isAuthenticated).toBe(true);

    useAuthStore.getState().clearAuth();

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});
