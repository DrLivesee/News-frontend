import { useComments } from "@/store/comments";
import { computed, ComputedRef, ref, Ref } from "vue";
import { useRoute } from "vue-router";

interface CommentsUtil {
  addCommentText: Ref<string>;
  showComments: Ref<boolean>;
  isDisableAddingComment: ComputedRef<boolean>;
  addCommentHandler: () => Promise<void>;
  deleteCommentHandler: (id: string) => Promise<void>;
  toggleComments: () => Promise<void>;
  showEdit: (text: string, id: string) => void;
  editCommentHandler: (id: string, text: string) => Promise<void>;
  cancelEditing: () => void;
}

export function useCommentsUtil(): CommentsUtil {
  const route = useRoute();

  const commentsStore = useComments();

  const addCommentText = ref("");
  const showComments = ref(false);

  const isDisableAddingComment = computed(() => {
    return (
      commentsStore.loadingCommentDelete ||
      commentsStore.loadingCommentEdit ||
      commentsStore.loadingCommentAdd
    );
  });

  const routeId = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id;

  const addCommentHandler = async (): Promise<void> => {
    commentsStore.loadingCommentAdd = true;
    try {
      await commentsStore.addCommentForNews(addCommentText.value.trim());
      addCommentText.value = "";
      await commentsStore.fetchCommentsForNews(routeId);
    } catch (error) {
      console.log(error);
    } finally {
      commentsStore.loadingCommentAdd = false;
    }
  };

  const deleteCommentHandler = async (id: string): Promise<void> => {
    commentsStore.loadingCommentDelete = true;
    commentsStore.deletingCommentId = id;
    try {
      await commentsStore.deleteComment(id);
      await commentsStore.fetchCommentsForNews(routeId);
    } catch (error) {
      console.log(error);
    } finally {
      if (commentsStore.editingCommentText) {
        commentsStore.editingCommentText = "";
        commentsStore.showEditingCommentText = false;
      }

      commentsStore.loadingCommentDelete = false;
      commentsStore.deletingCommentId = "";
      commentsStore.editingCommentId = "";
    }
  };

  const toggleComments = async (): Promise<void> => {
    showComments.value = !showComments.value;

    if (!commentsStore.comments.length) {
      await commentsStore.fetchCommentsForNews(routeId);
    }
  };

  const showEdit = (text: string, id: string): void => {
    commentsStore.editingCommentId = id;
    commentsStore.editingCommentText = text.trim();
    commentsStore.showEditingCommentText = true;
  };

  const cancelEditing = (): void => {
    commentsStore.editingCommentId = "";
    commentsStore.editingCommentText = "";
    commentsStore.showEditingCommentText = false;
  };

  const editCommentHandler = async (
    id: string,
    text: string
  ): Promise<void> => {
    if (commentsStore.editingCommentText.trim() === text.trim()) {
      cancelEditing();
      commentsStore.loadingCommentEdit = false;
      return;
    }

    commentsStore.loadingCommentEdit = true;
    try {
      if (!commentsStore.editingCommentText.trim()) {
        await commentsStore.deleteComment(id);
      } else {
        await commentsStore.editCommentForNews(
          id,
          commentsStore.editingCommentText
        );
      }
      await commentsStore.fetchCommentsForNews(routeId);
    } catch (error) {
      console.log(error);
    } finally {
      cancelEditing();
      commentsStore.loadingCommentEdit = false;
    }
  };

  return {
    addCommentText,
    showComments,
    isDisableAddingComment,
    cancelEditing,
    addCommentHandler,
    deleteCommentHandler,
    toggleComments,
    showEdit,
    editCommentHandler,
  };
}
