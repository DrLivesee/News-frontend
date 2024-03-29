import { useComments } from "@/store/comments";
import { ref, Ref } from "vue";
import { useRoute } from "vue-router";

interface CommentsUtil {
  commentText: Ref<string>;
  editingCommentText: Ref<string>;
  showComments: Ref<boolean>;
  showEditInput: Ref<boolean>;
  addCommentHandler: () => Promise<void>;
  deleteCommentHandler: (id: string) => Promise<void>;
  toggleComments: () => void;
  showEdit: (text: string) => void;
  editCommentHandler: (id: string) => Promise<void>;
}

export function useCommentsUtil(): CommentsUtil {
  const route = useRoute();

  const commentsStore = useComments();

  const commentText = ref("");
  const editingCommentText = ref("");
  const showComments = ref(false);
  const showEditInput = ref(false);

  const routeId = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id;

  const addCommentHandler = async () => {
    await commentsStore.addCommentForNews(commentText.value);
    commentText.value = "";
    await commentsStore.fetchCommentsForNews(routeId);
  };

  const deleteCommentHandler = async (id: string) => {
    await commentsStore.deleteComment(id);
    await commentsStore.fetchCommentsForNews(routeId);

    if (editingCommentText.value) {
      editingCommentText.value = "";
      showEditInput.value = false;
    }
  };

  const toggleComments = () => {
    showComments.value = !showComments.value;
  };

  const showEdit = (text: string) => {
    editingCommentText.value = text;
    showEditInput.value = true;
  };

  const editCommentHandler = async (id: string) => {
    if (!editingCommentText.value) {
      await commentsStore.deleteComment(id);
    } else {
      await commentsStore.editCommentForNews(id, editingCommentText.value);
    }
    await commentsStore.fetchCommentsForNews(routeId);
    editingCommentText.value = "";
    showEditInput.value = false;
  };

  return {
    commentText,
    editingCommentText,
    showComments,
    showEditInput,
    addCommentHandler,
    deleteCommentHandler,
    toggleComments,
    showEdit,
    editCommentHandler,
  };
}
