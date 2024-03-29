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
          showEditInput &&
          userStore.user &&
          comment.userId === userStore.user._id
        "
        type="text"
        v-model="editingCommentText"
      />
      <div v-else class="comment-text">{{ comment.text }}</div>
      <p class="comment-date">
        {{ format(new Date(comment.createdAt), "MMMM d, yyyy HH:mm:ss") }}
      </p>
    </div>
    <div class="btns">
      <button
        class="edit-button btn"
        v-if="
          !showEditInput &&
          userStore.user &&
          comment.userId === userStore.user._id
        "
        @click="showEdit(comment.text)"
      >
        <i class="material-icons">edit</i>
      </button>

      <button
        class="edit-button btn"
        v-if="
          showEditInput &&
          userStore.user &&
          comment.userId === userStore.user._id
        "
        @click="editCommentHandler(comment._id)"
      >
        <i class="material-icons">check</i>
      </button>

      <button
        class="delete-button btn"
        v-if="userStore.user && comment.userId === userStore.user._id"
        @click="deleteCommentHandler(comment._id)"
      >
        <i class="material-icons">delete</i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IComment } from "@/interfaces";
import { format } from "date-fns";
import { useUser } from "@/store/user";
import { useCommentsUtil } from "@/helpers/comments";

const userStore = useUser();

defineProps<{
  comment: IComment,
}>();


const {
  showEditInput,
  editingCommentText,
  showEdit,
  editCommentHandler,
  deleteCommentHandler,
} = useCommentsUtil();
</script>

<style lang="scss" scoped>
.comment {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
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
    background-color: #9a8c98;

    .user-avatar {
      display: block;
      width: 80px;
      height: 80px;

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
    background-color: white;
  }

  .comment-text {
    margin-bottom: 8px;
    word-wrap: break-word;
  }

  .comment-date {
    color: #777;
    margin-bottom: 8px;
  }

  .likes {
    color: #4a4e69;
  }

  .btns {
    display: flex;
    gap: 5px;

    .btn {
      border: none;
      outline: none;
      cursor: pointer;
      background: none;
    }

    .edit-button {
      i {
        color: #47a76a;
      }
    }

    .delete-button {
      i {
        color: #ff2400;
      }
    }
  }
}
</style>
