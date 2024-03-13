import { reactive, toRefs } from "vue";

import { defineStore } from "pinia";

import { getCommentsForNews } from "@/service/NewsService";
import { addComment, deleteCommentById, patchComment } from "@/service/CommentsService";

import { useUser } from "@/store/user";
import { useNews } from "@/store/news";

export const useComments = defineStore("comments", () => {
  const state = reactive({
    comments: [],
    loading: false,
    loadComment: false,
    totalCountNews: 0,
  });

  const userStore = useUser();
  const newsStore = useNews();

  const fetchCommentsForNews = async (newsId) => {
    state.loading = true;

    try {
      const response = await getCommentsForNews(newsId, "createdAt");
      state.comments = response.data;
    } catch (error) {
      console.log(error);
    } finally {
      state.loading = false
    }
  };

  const addCommentForNews = async (text) => {
    try {
      state.loadComment = true;
      if (userStore.user && newsStore.selectedNews) {
        const comment = {
          name: `${userStore.user.firstName} ${userStore.user.lastName}`,
          avatar: userStore.user.avatar,
          text: text,
          userId: userStore.user.id,
          newsId: newsStore.selectedNews._id,
        };
        await addComment(comment);
      }
    } catch (error) {
      console.log(error);
    } finally {
      state.loadComment = false;
    }
  };

  const editCommentForNews = async (id, text) => {
    try {
      state.loadComment = true;
      if (userStore.user && newsStore.selectedNews) {
        const comment = {
          name: `${userStore.user.firstName} ${userStore.user.lastName}`,
          avatar: userStore.user.avatar,
          text: text,
          userId: userStore.user.id,
          newsId: newsStore.selectedNews._id,
        };
        await patchComment(id, comment);
      }
    } catch (error) {
      console.log(error);
    } finally {
      state.loadComment = false;
    }
  };

  const deleteComment = async (id) => {
    try {
      await deleteCommentById(id);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    ...toRefs(state),
    fetchCommentsForNews,
    addCommentForNews,
    deleteComment,
    editCommentForNews
  };
});
