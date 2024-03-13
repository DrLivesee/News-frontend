<template>
  <div class="comments-area">
    <button @click="toggleComments" class="toggle-comments">Комментарии</button>

    <div v-show="showComments" class="comments">
      <div
        v-for="comment in commentsStore.comments"
        :key="comment.id"
        class="comment"
      >
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
              comment.userId === userStore.user.id
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
              comment.userId === userStore.user.id
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
              comment.userId === userStore.user.id
            "
            @click="editCommentHandler(comment._id)"
          >
            <i class="material-icons">check</i>
          </button>

          <button
            class="delete-button btn"
            v-if="userStore.user && comment.userId === userStore.user.id"
            @click="deleteCommentHandler(comment._id)"
          >
            <i class="material-icons">delete</i>
          </button>
        </div>
      </div>
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

<script setup>
import { format } from "date-fns";

import { useComments } from "@/store/comments";
import { useUser } from "@/store/user";
import { useRoute } from "vue-router";
import { ref } from "vue";

const commentsStore = useComments();
const userStore = useUser();

const route = useRoute();

const commentText = ref("");
const editingCommentText = ref("");
const showComments = ref(false);
const showEditInput = ref(false);

const addCommentHandler = async () => {
  await commentsStore.addCommentForNews(commentText.value);
  commentText.value = "";
  await commentsStore.fetchCommentsForNews(route.params.id);
};

const deleteCommentHandler = async (id) => {
  await commentsStore.deleteComment(id);
  await commentsStore.fetchCommentsForNews(route.params.id);

  if (editingCommentText.value) {
    editingCommentText.value = "";
    showEditInput.value = false;
  }
};

const toggleComments = () => {
  showComments.value = !showComments.value;
};

const showEdit = (text) => {
  editingCommentText.value = text;
  showEditInput.value = true;
};

const editCommentHandler = async (id) => {
  if (!editingCommentText.value) {
    await commentsStore.deleteComment(id);
  } else {
    await commentsStore.editCommentForNews(id, editingCommentText.value);
  }
  await commentsStore.fetchCommentsForNews(route.params.id);
  editingCommentText.value = "";
  showEditInput.value = false;
};
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
}
</style>
