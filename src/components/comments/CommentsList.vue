<template>
  <div class="comments-list">
    <CommentsListItem
      v-for="comment in commentsStore.comments"
      :key="comment._id"
      :comment="comment"
    />
  </div>
</template>

<script setup lang="ts">
import CommentsListItem from "@/components/comments/CommentsListItem.vue";
import { useComments } from "@/store/comments";

const commentsStore = useComments();
</script>

<style lang="scss" scoped>
.comments-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
