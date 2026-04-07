import { MutationCache, QueryCache, QueryClient, type QueryKey } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getErrorMessage } from '../helpers/errorHandler';
import { TOAST_DEFAULT_DURATION } from '../constants';


const handleGlobalError = (error: unknown, queryOrMutation?: any) => {
  if (queryOrMutation?.meta?.suppressErrorToast) return;

  const customMessage = queryOrMutation?.meta?.errorMessage as string | undefined;
  const message = customMessage ?? getErrorMessage(error);

  toast.error(message, { duration: TOAST_DEFAULT_DURATION, closeButton: true });
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => handleGlobalError(error, query),
  }),
  mutationCache: new MutationCache({
    onError: (error, _vars, _context, mutation) => handleGlobalError(error, mutation),
    onSuccess: (_data, _vars, _context, mutation) => {
      if (mutation.meta?.successMessage) {
        toast.success(mutation.meta.successMessage as string, {
          duration: TOAST_DEFAULT_DURATION,
          closeButton: true
        });
      }

      if (mutation.meta?.invalidates) {
        const keys = mutation.meta.invalidates as QueryKey[];
        keys.forEach((queryKey) => {
          queryClient.invalidateQueries({ queryKey });
        });
      }
    },
  }),
});
