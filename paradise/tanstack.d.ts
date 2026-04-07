declare module '@tanstack/react-query' {
    interface Register {
        queryMeta: {
            errorMessage?: string;
            suppressErrorToast?: boolean;
        };
        mutationMeta: {
            successMessage?: string;
            errorMessage?: string;
            invalidates?: string[];
            suppressErrorToast?: boolean;
        };
    }
}
