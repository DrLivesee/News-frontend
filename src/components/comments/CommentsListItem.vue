<template>
  <div class="comment">
    <div class="user-avatar-container">
      <img
        v-if="comment.avatar"
        :src="comment.avatar"
        alt="User Avatar"
        class="user-avatar"
      />
      <span v-else class="no-avatar">no avatar</span>
    </div>
    <div class="comment-content">
      <p class="comment-author">
        {{ comment.name }}
      </p>

      <input
        class="edit-input"
        v-if="
          commentsStore.showEditingCommentText &&
          userStore.user &&
          comment.userId === userStore.user._id &&
          commentsStore.editingCommentId === comment._id
        "
        @keyup.enter="editCommentHandler(comment._id, comment.text)"
        @keyup.esc="cancelEditing"
        type="text"
        v-model="commentsStore.editingCommentText"
      />
      <div v-else class="comment-text">{{ comment.text }}</div>
      <p class="comment-date">
        {{ format(new Date(comment.createdAt), "MMMM d, yyyy HH:mm:ss") }}
      </p>
    </div>

    <CommentControls
      v-if="userStore.user && comment.userId === userStore.user._id"
      :comment="comment"
    />
  </div>
</template>

<script setup lang="ts">
import { IComment } from "@/interfaces";
import { format } from "date-fns";
import { useUser } from "@/store/user";
import { useComments } from "@/store/comments";

import { useCommentsUtil } from "@/helpers/comments";

import CommentControls from "@/components/comments/CommentControls.vue";

const userStore = useUser();
const commentsStore = useComments();

defineProps<{
  comment: IComment;
}>();


const { editCommentHandler, cancelEditing } = useCommentsUtil();

</script>

<style lang="scss" scoped>
@import "@/assets/scss/variables.scss";
.comment {
  display: flex;
  // margin-bottom: 16px;
  width: 100%;

  

  .user-avatar-container {
    width: 50px;
    height: 50px;
    overflow: hidden;
    margin-right: 16px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $brown-3;

    .user-avatar {
      display: block;
      width: 50px;
      height: 50px;

      object-fit: cover;
    }

    .no-avatar {
      text-align: center;
      font-weight: bold;
      line-height: 10px;
      font-size: 12px;
    }
  }

  .comment-content {
    flex: 1;
    overflow: hidden;
    border-top: 2px solid $brown-5; 
    padding-top: 10px;
  }

  .comment-author {
    font-weight: bold;
    margin-bottom: 4px;
  }

  .edit-input {
    width: 100%;
    border-radius: 2px;
    margin-bottom: 8px;
    word-wrap: break-word;
    border: none;
    background: none;
    outline: none;
    font-size: 16px;
    background-color: $white-1;
  }

  .comment-text {
    margin-bottom: 8px;
    word-wrap: break-word;
  }

  .comment-date {
    color: #777;
    margin-bottom: 8px;
  }
}
</style>
