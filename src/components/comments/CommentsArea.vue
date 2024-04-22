<template>
  <div class="comments-area">
    <CustomButton blue text="Комментарии" @click="toggleComments"/>

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

        <CustomButton blue text="Добавить комментарий" @click="addCommentHandler" :disabled="isDisableAddingComment || !addCommentText"/>
        
      </div>

      <CommentsList/>
      <LoadingIcon
        v-if="commentsStore.loadingComments"
        size="50px"
        alignSelf="center"
      />
      <LoadingIcon v-if="commentsStore.loadingCommentAdd" size="50px" />

      
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
    color: #22223b;
    border-radius: 4px;
    width: 100%;
    box-shadow: 0px 0px 5px 0px rgba($brown-6,0.8) inset;

    .add-comment {
      display: flex;
      align-items: center;
      margin-bottom: 32px;
      
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
  }
}
</style>
