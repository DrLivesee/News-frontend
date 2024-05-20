<template>
  <div class="news-details-page">
    <div v-if="newsStore.selectedNews" class="news-details">
      <h1 class="news-title">{{ newsStore.selectedNews.title }}</h1>
      <div class="news-meta">
        <p class="news-author">{{ newsStore.selectedNews.author }}</p>
        <p class="news-date">
          {{
            format(
              new Date(newsStore.selectedNews.published),
              "MMMM d, yyyy HH:mm:ss"
            )
          }}
        </p>
      </div>
      <img
        :src="newsStore.selectedNews.image"
        alt="News Image"
        class="news-image"
      />

      <p class="news-description">{{ newsStore.selectedNews.description }}</p>
      <div class="news-content" v-html="newsStore.selectedNews.content" />

      <comments-area />
    </div>
    <div v-else>
      <LoadingIcon />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { format } from "date-fns";

import { useNews } from "@/store/news";
import { useComments } from "@/store/comments";

import LoadingIcon from "@/components/UI/LoadingIcon.vue";
import CommentsArea from "@/components/comments/CommentsArea.vue";

const route = useRoute();

const newsStore = useNews();
const commentsStore = useComments();

onMounted(async () => {
  const routeId = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id;

  await newsStore.getNewsById(routeId);
});

onUnmounted(() => {
  newsStore.selectedNews = null;
  commentsStore.comments = [];
});
</script>

<style lang="scss" scoped>
@import '@/assets/scss/news-details/styles.scss';
</style>
