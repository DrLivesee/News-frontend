<template>
  <CommentsListItem
    v-for="comment in commentsStore.comments"
    :key="comment._id"
    :comment="comment"
  />
</template>

<script setup lang="ts">
import CommentsListItem from "@/components/comments/CommentsListItem.vue";
import { useComments } from "@/store/comments";

const commentsStore = useComments();

</script>

<style lang="scss" scoped></style>
