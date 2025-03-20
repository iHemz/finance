import { getSuggestions } from "@/app/requests/suggestions/query";
import { queryClient } from "@/app/utils/reactQuery";
import { InvalidateQueryFilters, useQuery } from "@tanstack/react-query";

const cacheTime = 5 * 60 * 1000; // 5 minutes
const commonQueryActions = (queryKey: InvalidateQueryFilters["queryKey"]) => {
  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey });
  };
  const refetch = () => {
    queryClient.refetchQueries({ queryKey });
  };
  return { invalidate, refetch };
};

export const useSuggestions = (query: string) => {
  const queryKey = ["suggestions", query];
  const queryResult = useQuery<Suggestions, Error>({
    queryKey,
    queryFn: () => getSuggestions(query),
    enabled: query.length > 0,
    refetchOnWindowFocus: false,
    staleTime: cacheTime,
  });

  return { ...queryResult, ...commonQueryActions(queryKey) };
};
