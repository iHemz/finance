import { Tag } from "@/app/store/formulaStore";
import { useQuery } from "@tanstack/react-query";

// This would normally be from your API
const mockVariables: Tag[] = [
  { id: "1", label: "Revenue", type: "variable", value: 1000 },
  { id: "2", label: "Costs", type: "variable", value: 500 },
  { id: "3", label: "Profit", type: "variable", value: 500 },
  { id: "4", label: "Tax Rate", type: "variable", value: 0.2 },
  { id: "5", label: "Growth Rate", type: "variable", value: 0.1 },
];

const mockFunctions: Tag[] = [
  { id: "f1", label: "SUM", type: "function" },
  { id: "f2", label: "AVG", type: "function" },
  { id: "f3", label: "MIN", type: "function" },
  { id: "f4", label: "MAX", type: "function" },
];

const mockConstants: Tag[] = [
  { id: "c1", label: "PI", type: "constant", value: Math.PI },
  { id: "c2", label: "E", type: "constant", value: Math.E },
];

// Simulate API call for autocomplete suggestions
const fetchSuggestions = async (query: string): Promise<Tag[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));

  // If no query, return empty array
  if (!query.trim()) return [];

  const allSuggestions = [...mockVariables, ...mockFunctions, ...mockConstants];

  // Filter suggestions based on the query
  return allSuggestions.filter(tag => tag.label.toLowerCase().includes(query.toLowerCase()));
};

export const useSuggestions = (query: string) => {
  return useQuery({
    queryKey: ["suggestions", query],
    queryFn: () => fetchSuggestions(query),
    enabled: query.length > 0,
    // Don't refetch on window focus
    refetchOnWindowFocus: false,
    // Cache the results for 5 minutes
    staleTime: 5 * 60 * 1000,
  });
};
