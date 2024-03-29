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
  background-color: #9a8c98;
  color: #22223b;
  border-radius: 8px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.5);
  min-height: 100px;
  max-height: 200px;
  width: 100%;
  transition: background-color 0.25s, box-shadow 0.25s;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: #c9ada7;
    box-shadow: 0px 2px 15px 0px rgba(0, 0, 0, 0.6);
  }

  &:active {
    background-color: #4a4e69;
    box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.8);
    color: #c9ada7;
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
