<template>
  <div class="news-page">
    <div class="news-content">
      <h1 class="news-title">Новости</h1>

      <FilterArea />

      <div>
        
        <NewsList
          v-if="newsStore.news.length"
          :filteredNewsList="newsStore.news"
        />
        <div v-else-if="!isLoading">
          По выбранным фильтрам новостей не нашлось :(
        </div>

        <LoadingIcon
          v-if="isLoading"
          size="30px"
          marginTop="10px"
          alignSelf="center"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from "vue";

import { useNews } from "@/store/news";
// import { useUser } from "@/store/user";

import NewsList from "@/components/news/NewsList.vue";
import FilterArea from "@/components/news/FilterArea.vue";
import LoadingIcon from "@/components/UI/LoadingIcon.vue";
// import { getCommentsForUser } from "@/service/AuthService";

const newsStore = useNews();
// const userStore = useUser();

const isLoading = computed(
  () => newsStore.isLoadingInputSearchNews || newsStore.loading
);

// const getComments = async () => {
//   if (userStore.user){
//     const res = await getCommentsForUser(userStore.user._id);
//     console.log(res)
//   } 
// };

onMounted(async () => {
  if (localStorage.getItem("search")) {
    newsStore.searchQuery = localStorage.getItem("search")!;
  }

  await newsStore.fetchNews();
  window.addEventListener("scroll", newsStore.handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", newsStore.handleScroll);
});
</script>

<style lang="scss">
@import "@/assets/scss/news-page/styles.scss";
</style>
