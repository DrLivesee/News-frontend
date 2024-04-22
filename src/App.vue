<template>
  <div id="app">
    <AppHeader/>
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import { useUser } from "@/store/user";


import AppHeader from "@/components/AppHeader.vue";

const userStore = useUser();

onMounted(async () => {
  
  if (localStorage.getItem("token")) {
    await userStore.checkAuth();
    return;
  }

  if (userStore.isAuth) {
    await userStore.logout();
  }
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap");
@import '@/assets/scss/main.scss'

</style>
