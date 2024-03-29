import { useNews } from "@/store/news";

interface NewsSearchUtil {
  inputSearchHandler: (event: Event) => Promise<void>;
  clearInput: () => Promise<void>;
}

export function useNewsSearch(): NewsSearchUtil {
  const newsStore = useNews();

  const inputSearchHandler = async (event: Event): Promise<void> => {
    newsStore.searchQuery = (event.target as HTMLInputElement).value;
    await newsStore.handleSearchInput();
  };

  const clearInput = async (): Promise<void> => {
    newsStore.searchQuery = "";
    await newsStore.handleSearchInput();
  };

  return {
    inputSearchHandler,
    clearInput,
  };
}
