import { reactive, toRefs } from "vue";

import { defineStore } from "pinia";

import * as NewsService from "@/service/NewsService";
import { INews, ApiNewsResponse, GetNewsParams } from "@/interfaces";
import { AxiosResponse } from "axios";

interface INewsState {
  news: INews[];
  loading: boolean;
  searchQuery: string;
  page: number;
  limit: number;
  hasMore: boolean;
  selectedNews: INews | null;
  fetchNewsTimer: NodeJS.Timeout | null;
  loadingNewsById: boolean;
  totalCountNews: number;
}

export const useNews = defineStore("news", () => {
  const state: INewsState = reactive({
    news: [] as INews[],
    loading: false,
    searchQuery: "",
    page: 1,
    limit: 10,
    hasMore: true,
    selectedNews: null,
    fetchNewsTimer: null,
    loadingNewsById: false,
    totalCountNews: 0,
  });

  const fetchNews = async (): Promise<void> => {
    if (!state.hasMore || state.loading) return;
    state.loading = true;

    try {
      const params: GetNewsParams = {
        page: state.page,
        limit: state.limit,
        searchQuery: state.searchQuery ? state.searchQuery : "",
        sort: "published",
      };
      const response: AxiosResponse<ApiNewsResponse> =
        await NewsService.getNews(params);
      state.totalCountNews = response.data.totalDocuments;
      state.news = [...state.news, ...response.data.news];
      state.page++;
      state.hasMore = state.news.length < state.totalCountNews;
    } catch (e) {
      console.log(e);
    } finally {
      state.loading = false;
    }
  };

  const handleSearchInput = async (): Promise<void> => {
    state.loading = true;
    state.hasMore = true;
    state.page = 1;
    if (state.fetchNewsTimer !== null) {
      clearTimeout(state.fetchNewsTimer);
    }
    state.news = [];
    state.fetchNewsTimer = setTimeout(async () => {
      await fetchNews();
    }, 250);
    state.loading = false;
  };

  const handleScroll = async (): Promise<void> => {
    if (
      !state.loading &&
      state.hasMore &&
      window.innerHeight + Math.ceil(window.scrollY) + 1 >
        document.body.offsetHeight
    ) {
      await fetchNews();
    }
  };

  const getNewsById = async (id: string): Promise<void> => {
    try {
      const response: AxiosResponse<INews> = await NewsService.getNewsById(id);
      state.selectedNews = response.data;
    } catch (e) {
      console.log(e);
    }
  };

  return {
    ...toRefs(state),
    fetchNews,
    handleSearchInput,
    handleScroll,
    getNewsById,
  };
});
