import { InvalidateQueryFilters, QueryClient, QueryKey } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export const invalidateQueries = (queryKey: InvalidateQueryFilters["queryKey"]) => {
  queryClient.invalidateQueries({ queryKey });
};

export const invalidateQueriesWithDelay = (
  queryKey: InvalidateQueryFilters["queryKey"],
  delay: number = 1000
) =>
  new Promise<void>(resolve => {
    setTimeout(() => {
      queryClient.invalidateQueries({ queryKey });
      resolve();
    }, delay);
  });

export const evictAndRefetch = async (queryKey: QueryKey) => {
  // Remove the data from cache completely
  queryClient.removeQueries({ queryKey });

  // Force a fresh fetch
  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => queryClient.getQueryData(queryKey),
  });
};

export const clearCache = () => queryClient.clear();
