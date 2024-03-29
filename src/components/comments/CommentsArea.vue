<template>
  <div class="comments-area">
    <button @click="toggleComments" class="toggle-comments">Комментарии</button>

    <div v-show="showComments" class="comments">
      <CommentsList :comments="commentsStore.comments" />

      <div class="add-comment">
        <input
          type="text"
          :disabled="commentsStore.loadComment"
          v-model="commentText"
          class="comment-input"
          placeholder="Добавьте комментарий..."
        />
        <button
          :disabled="commentsStore.loadComment"
          @click="addCommentHandler"
          class="add-comment-button"
        >
          Добавить комментарий
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useComments } from "@/store/comments";
import { useCommentsUtil } from "@/helpers/comments";

import CommentsList from "./CommentsList.vue";

const commentsStore = useComments();

const { toggleComments, showComments, commentText,addCommentHandler } = useCommentsUtil();

</script>

<style lang="scss" scoped>
.comments-area {
  .toggle-comments {
    margin-top: 16px;
    cursor: pointer;
    color: #22223b;
    background-color: #f2e9e4;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #c9ada7;
    }

    &:active {
      background-color: #4a4e69;
      color: #c9ada7;
    }
  }

  .comments {
    margin-top: 16px;
    padding: 16px;
    background-color: #f2e9e4;
    color: #22223b;
    border-radius: 4px;
    width: 100%;

    .add-comment {
      display: flex;
      align-items: center;
      margin-top: 16px;
    }

    .comment-input {
      flex: 1;
      padding: 8px;
      border: 1px solid #4a4e69;
      border-radius: 4px;
      margin-right: 8px;
      font-size: 14px;

      &:focus {
        outline: none;
        border-color: #9a8c98;
      }
    }

    .add-comment-button {
      cursor: pointer;
      background-color: #9a8c98;
      font-weight: bold;
      color: #22223b;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      transition: background-color 0.25s;

      &:hover {
        background-color: #c9ada7;
      }

      &:active {
        background-color: #4a4e69;
        color: #c9ada7;
      }

      &:disabled {
        cursor: not-allowed;
        background-color: #ccc;
        color: #888;
      }
    }
  }
}
</style>
