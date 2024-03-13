import { reactive, toRefs } from "vue";

import { defineStore } from "pinia";

import * as NewsService from "@/service/NewsService";

export const useNews = defineStore("news", () => {
  const state = reactive({
    news: [],
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

  const fetchNews = async () => {
    if (!state.hasMore || state.loading) return;
    state.loading = true;

    try {
      const response = await NewsService.getNews(
        state.page,
        state.limit,
        state.searchQuery ? state.searchQuery: null,
        "published"
      );
      state.totalCountNews = response.data.totalDocuments;
      state.news = [...state.news, ...response.data.news]
      state.page++;
      state.hasMore = state.news.length < state.totalCountNews;
    } catch (e) {
      console.log(e);
    } finally {
      state.loading = false;
    }
  };

  const handleSearchInput = () => {
    state.loading = true;
    state.hasMore = true;
    state.page = 1;
    clearTimeout(state.fetchNewsTimer);
    state.news = [];
    state.fetchNewsTimer = setTimeout(async () => {
      await fetchNews();
    }, 250);
    state.loading = false;
  };

  const handleScroll = async () => {
    if (
      !state.loading && state.hasMore &&
      window.innerHeight + Math.ceil(window.scrollY) + 1 >
        document.body.offsetHeight
    ) {
      await fetchNews();
    }
  };

  const getNewsById = async (id) => {
    try {
      const response = await NewsService.getNewsById(
        id
      );
      state.selectedNews = response.data
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
