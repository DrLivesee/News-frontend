<template>
  <div class="app-header" :class="{ 'app-header-user-profile-only': !mainStore.isHomeLinkVisible }">
    <HomeLink v-if="mainStore.isHomeLinkVisible" />
    <UserProfile />
  </div>
</template>

<script setup lang="ts">
import HomeLink from "@/components/HomeLink.vue";
import UserProfile from "@/components/UserProfile.vue";

import { useMain } from "@/store/main";
const mainStore = useMain();

</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}
.app-header-user-profile-only {
  justify-content: flex-end;
}
</style>
