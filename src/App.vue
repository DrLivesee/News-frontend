<template>
  <div id="app">
    <UserProfile  />
    
    <RouterView />
  </div>
</template>

<script setup lang=ts>
import { onMounted } from "vue";

import { useUser } from "./store/user";

import UserProfile from "./components/UserProfile.vue";

const userStore = useUser();

onMounted(() => {
  console.log(userStore.isAuth, userStore.user)
  if (localStorage.getItem("token")) {
    userStore.checkAuth();
    return
  }
  
  if (userStore.isAuth) {
    userStore.logout();
  }
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400;1,700&display=swap");

body {
  padding: 0px;
  margin: 0;
  background-color: #f2e9e4;
  padding: 20px 0px;
}

* {
  font-family: "Lato", sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
</style>
