import { reactive, toRefs } from "vue";

import { defineStore } from "pinia";

import { getCommentsForNews } from "@/service/NewsService";
import {
  addComment,
  deleteCommentById,
  patchComment,
} from "@/service/CommentsService";

import { useUser } from "@/store/user";
import { useNews } from "@/store/news";

import {
  IComment,
  ApiCommentsResponse,
  IPostComment,
  IPatchComment,
} from "@/interfaces";
import { AxiosResponse } from "axios";

interface ICommentsStore {
  comments: IComment[];
  loadingComments: boolean;
  loadComment: boolean;
  totalCountComments: number;
}

export const useComments = defineStore("comments", () => {
  const state: ICommentsStore = reactive({
    comments: [],
    loadingComments: false,
    loadComment: false,
    totalCountComments: 0,
  });

  const userStore = useUser();
  const newsStore = useNews();

  const fetchCommentsForNews = async (newsId: string): Promise<void> => {
    state.loadingComments = true;

    try {
      const response: AxiosResponse<ApiCommentsResponse> =
        await getCommentsForNews(newsId, "createdAt");
      state.comments = response.data.comments;
      state.totalCountComments = response.data.totalDocuments;
    } catch (error) {
      console.log(error);
    } finally {
      state.loadingComments = false;
    }
  };

  const addCommentForNews = async (text: string): Promise<void> => {
    try {
      state.loadComment = true;
      if (userStore.user && newsStore.selectedNews) {
        const comment: IPostComment = {
          name: `${userStore.user.firstName} ${userStore.user.lastName}`,
          avatar: userStore.user.avatar,
          text: text,
          userId: userStore.user._id,
          newsId: newsStore.selectedNews._id,
        } as IPostComment;
        await addComment(comment);
      }
    } catch (error) {
      console.log(error);
    } finally {
      state.loadComment = false;
    }
  };

  const editCommentForNews = async (
    id: string,
    text: string
  ): Promise<void> => {
    try {
      state.loadComment = true;
      if (userStore.user && newsStore.selectedNews) {
        const comment: IPatchComment = {
          text: text,
        };
        await patchComment(id, comment);
      }
    } catch (error) {
      console.log(error);
    } finally {
      state.loadComment = false;
    }
  };

  const deleteComment = async (id: string): Promise<void> => {
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
    editCommentForNews,
  };
});
