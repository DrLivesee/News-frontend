<template>
  <div class="news-page">
    <div class="news-content">
      <h1 class="news-title">Новости</h1>

      <FilterArea />

      <div>
        <!-- <div v-if="!newsStore.hasMore && newsStore.news.length < 1">No news found</div> -->
        <NewsList :filteredNewsList="newsStore.news" />

        <LoadingIcon
          v-if="newsStore.loading"
          size="30px"
          marginTop="10px"
          alignSelf="center"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

import { useNews } from "@/store/news";
// import { useUser } from "@/store/user";

import NewsList from "@/components/news/NewsList.vue";
import FilterArea from "@/components/news/FilterArea.vue";
import LoadingIcon from "@/components/UI/LoadingIcon.vue";


const newsStore = useNews();

// const userStore = useUser();

onMounted(() => {
  newsStore.fetchNews();
  window.addEventListener("scroll", newsStore.handleScroll);
  // console.log(userStore.user)

});

onUnmounted(() => {
  window.removeEventListener("scroll", newsStore.handleScroll);
});
</script>

<style lang="scss">
.news-page {
  color: #22223b;
  width: 100%;
  padding: 0px 20px;
  padding-bottom: 20px;

  .news-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 900px;
    margin: 0 auto;

    .news-title {
      font-size: 36px;
      display: block;
      margin-bottom: 12px;
    }
  }
}
</style>
