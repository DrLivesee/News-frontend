<template>
  <router-link class="article" :to="`/news/${article._id}`">
    <div class="main-content">
      <h2 class="article-title">{{ article.title }}</h2>
      <p class="article-desc">{{ article.description }}</p>
    </div>

    <div class="content-info">
      <p class="article-author">{{ article.author }}</p>
      <p class="article-date">
        {{ format(new Date(article.published), "MMMM d, yyyy HH:mm:ss") }}
      </p>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { format } from "date-fns";
import { INews } from "@/interfaces";

defineProps<{
  article: INews,
}>()

</script>

<style lang="scss" scoped>
.article {
  display: flex;
  justify-content: space-between;
  padding: 20px 40px;
  background-color: $brown-2;
  border-radius: 8px;
  box-shadow: 0px 2px 6px 0px rgba($brown-6, 0.3);
  min-height: 100px;
  max-height: 200px;
  width: 100%;
  transition: background-color 0.1s, box-shadow 0.1s;
  cursor: pointer;
  text-decoration: none;
  border: 2px solid $brown-5;

  &:hover {
    background-color: $brown-3;
    box-shadow: 0px 2px 12px 0px rgba($brown-6, 0.5);
  }

  &:active {
    background-color: $brown-4;
    box-shadow: none;
  }
  .main-content {
    width: 65%;
  }

  .content-info {
    width: 28%;
    text-align: right;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .article-author {
      font-style: italic;
    }
  }
}
</style>
