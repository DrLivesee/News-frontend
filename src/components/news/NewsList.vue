<template>
    <div class="news-list">
      <NewsListItem v-for="article in filteredNewsList" :key="article._id" :article="article"/>
    </div>
</template>

<script setup lang="ts">
import { INews } from "@/interfaces";
import NewsListItem from "@/components/news/NewsListItem.vue";

defineProps<{
  filteredNewsList: INews[],
}>()

</script>

<style lang="scss" scoped>
.news-list {
    padding: 0px;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
</style>
