<template>
  <div class="comments-area">
    <CustomButton blue text="Комментарии" @click="toggleComments" />

    <div v-show="showComments" class="comments">
      <div class="add-comment">
        <input
          type="text"
          :disabled="isDisableAddingComment"
          v-model="addCommentText"
          class="comment-input"
          placeholder="Добавьте комментарий..."
          @keyup.enter="addCommentHandler"
        />

        <LoadingIcon v-if="commentsStore.loadingCommentAdd" style="width: 116px;" size="40px" alignSelf="flex-end" />
        <CustomButton
        v-else
          big
          blue
          text="Добавить"
          @click="addCommentHandler"
          :disabled="isDisableAddingComment || !addCommentText.trim()"
        />
      </div>
      <LoadingIcon
        v-if="commentsStore.loadingComments"
        size="50px"
        alignSelf="center"
      />
      
      <CommentsList />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useComments } from "@/store/comments";
import { useCommentsUtil } from "@/helpers/comments";

import CommentsList from "@/components/comments/CommentsList.vue";
import LoadingIcon from "@/components/UI/LoadingIcon.vue";
import CustomButton from "@/components//UI/CustomButton.vue";

const commentsStore = useComments();

const {
  isDisableAddingComment,
  showComments,
  addCommentText,
  toggleComments,
  addCommentHandler,
} = useCommentsUtil();
</script>

<style lang="scss" scoped>
.comments-area {
  padding-top: 16px;

  .comments {
    margin-top: 16px;
    padding: 24px 16px;
    background-color: $brown-1;
    color: $black-1;
    border-radius: 4px;
    width: 100%;
    box-shadow: 0px 0px 5px 0px rgba($brown-6, 0.8) inset;

    .add-comment {
      display: flex;
      align-items: center;
      margin-bottom: 32px;
      gap: 12px;
    }

    .comment-input {
      @include baseInput;
    }
  }
}
</style>
