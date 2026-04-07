import { isAxiosError } from 'axios';

export interface ApiErrorResponse {
  message?: string;
  error?: string;
}

export function getErrorMessage(error: unknown, fallbackMessage = 'An unexpected error occurred'): string {
  if (isAxiosError<ApiErrorResponse>(error)) {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }

    switch (error.response?.status) {
      case 400:
        return 'Invalid data. Please check the submitted information.';
      case 401:
        return 'Invalid credentials or session expired.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'Resource not found.';
      case 500:
        return 'Internal server error. Please try again later.';
      case 502:
      case 503:
        return 'Server is currently unavailable.';
    }

    if (!error.response) return 'Check your internet connection. The server may be offline.';

    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
}
