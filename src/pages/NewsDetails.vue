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

import LoadingIcon from "@/components/UI/LoadingIcon.vue";
import CommentsArea from "@/components/comments/CommentsArea.vue";

const route = useRoute();

const newsStore = useNews();

onMounted(async () => {
  const routeId = Array.isArray(route.params.id)
    ? route.params.id[0]
    : route.params.id;

  await newsStore.getNewsById(routeId);
});

onUnmounted(() => {
  newsStore.selectedNews = null;
});
</script>

<style lang="scss" scoped>
.news-details-page {
  width: 100%;
  padding: 20px;
  box-sizing: border-box;

  .news-details {
    max-width: 900px;
    margin: 0 auto;
    background-color: #9a8c98;
    color: #22223b;
    padding: 20px 40px;
    border-radius: 8px;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);

    .news-title {
      font-size: 24px;
      margin-bottom: 16px;
      text-align: center;
      font-weight: bold;
    }

    .news-meta {
      padding: 0px 8px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 24px;
    }

    .news-author {
      font-style: italic;
      color: #4a4e69;
    }

    .news-date {
      color: #4a4e69;
      text-align: right;
    }

    .news-image {
      background-color: #4a4e69;
      width: 100%;
      height: 400px;
      object-fit: cover;
      border-radius: 8px;
      margin-bottom: 24px;

      @media (max-width: 599px) {
        height: 220px;
      }
    }

    .news-description {
      padding: 0px 8px;
      font-size: 16px;
      margin-bottom: 16px;
      color: #4a4e69;
    }

    .news-content {
      font-size: 18px;
      line-height: 1.5;
    }
  }
}
</style>
