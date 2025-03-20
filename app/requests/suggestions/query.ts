import { get } from "@/app/utils/api";

export const getSuggestions = async (query: string) => {
  const url = "/autocomplete";
  const response = (await get<Suggestions>(url, {})) as Suggestions;

  return response.filter(q => q.name.includes(query));
};
