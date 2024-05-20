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
  totalCountComments: number;
  loadingCommentDelete: boolean;
  loadingCommentEdit: boolean;
  loadingCommentAdd: boolean;
  showEditingCommentText: boolean;
  editingCommentText: string;
  editingCommentId: string;
  deletingCommentId: string;
}

export const useComments = defineStore("comments", () => {
  const state: ICommentsStore = reactive({
    comments: [],
    loadingComments: false,
    totalCountComments: 0,
    loadingCommentDelete: false,
    loadingCommentEdit: false,
    loadingCommentAdd: false,
    showEditingCommentText: false,
    editingCommentText: '',
    editingCommentId: '',
    deletingCommentId: 'string',
  });

  const userStore = useUser();
  const newsStore = useNews();

  const fetchCommentsForNews = async (newsId: string): Promise<void> => {
    if (!state.comments.length) {
      state.loadingComments = true;
    }

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
      if (userStore.user && newsStore.selectedNews) {
        const comment: IPostComment = {
          name: `${userStore.user.firstName} ${userStore.user.lastName}`,
          avatar: userStore.user.avatar.avatarUrl,
          text: text,
          userId: userStore.user._id,
          newsId: newsStore.selectedNews._id,
        } as IPostComment;

        // console.log(comment)
        await addComment(comment);
        // console.log(state.loadingCommentAdd, 'add')
      }
    } catch (error) {
      console.log(error);
    } 
  };

  const editCommentForNews = async (
    id: string,
    text: string
  ): Promise<void> => {
    
    try {
      if (userStore.user && newsStore.selectedNews) {
        const comment: IPatchComment = {
          text: text,
        };
        await patchComment(id, comment);
        // console.log(state.loadingCommentEdit, 'edit')
      }
    } catch (error) {
      console.log(error);
    } 
  };

  // const editCommentsForNews = async (
  //   id: string,
  //   text: string
  // ): Promise<void> => {
    
  //   try {
  //     if (userStore.user && newsStore.selectedNews) {
  //       const comment: IPatchComment = {
  //         text: text,
  //       };
  //       await patchComment(id, comment);
  //       // console.log(state.loadingCommentEdit, 'edit')
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } 
  // };

  const deleteComment = async (id: string): Promise<void> => {
    
    try {
      await deleteCommentById(id);
      // console.log(state.loadingCommentDelete, 'delete')
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
