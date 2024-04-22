<template>
  <div
    v-if="userStore.user && comment.userId === userStore.user._id"
    class="btns"
  >
    <div v-if="!commentsStore.editingCommentId || commentsStore.editingCommentId === comment._id">
      <button
        class="edit-button btn"
        v-if="!commentsStore.showEditingCommentText"
        @click="showEdit(comment.text, comment._id)"
      >
        <i class="material-icons">edit</i>
      </button>
      <div v-if="!commentsStore.loadingCommentEdit">
        <button
          class="cancel-edit-button btn"
          v-if="commentsStore.showEditingCommentText"
          @click="cancelEditing"
        >
          <i class="material-icons">cancel</i>
        </button>

        <button
          class="edit-button btn"
          v-if="commentsStore.showEditingCommentText"
          @click="editCommentHandler(comment._id, comment.text)"
        >
          <i class="material-icons">check</i>
        </button>

        
      </div>
      <LoadingIcon v-else size="24px" />
    </div>
    <div v-if="!commentsStore.editingCommentId || commentsStore.editingCommentId === comment._id">
      <div v-if="!commentsStore.loadingCommentDelete || commentsStore.deletingCommentId !== comment._id">
        <button
          class="delete-button btn"
          @click="deleteCommentHandler(comment._id)"
        >
          <i class="material-icons">delete</i>
        </button>
      </div>
      <LoadingIcon v-else size="24px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IComment } from "@/interfaces";
import { useUser } from "@/store/user";
import { useComments } from "@/store/comments";
import { useCommentsUtil } from "@/helpers/comments";
import LoadingIcon from "@/components/UI/LoadingIcon.vue";

const userStore = useUser();
const commentsStore = useComments();

defineProps<{
  comment: IComment;
}>();

const { deleteCommentHandler, editCommentHandler, showEdit, cancelEditing } = useCommentsUtil();
</script>

<style scoped lang="scss">
.btns {
  display: flex;
  gap: 5px;
  border-top: 2px solid $brown-5;
  padding-top: 10px;

  .btn {
    border: none;
    outline: none;
    cursor: pointer;
    background: none;
  }

  .cancel-edit-button {
    i {
      color: $red-1;
    }
  }

  .edit-button {
    i {
      color: $green-1;
    }
  }

  .delete-button {
    i {
      color: $red-1;
    }
  }
}
</style>
