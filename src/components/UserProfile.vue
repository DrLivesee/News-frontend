<template>
  <div v-if="userStore.user && userStore.isAuth" class="user-profile">
    <div v-if="userStore.user.avatar" class="user-avatar-container">
      <img :src="userStore.user.avatar" alt="" class="user-avatar" />
    </div>
    <div class="user-name">{{ userStore.user.firstName }}</div>
    <button class="exit-btn" @click="logOut">Выйти</button>
  </div>

  <LoadingIcon v-if="userStore.isLoading"  size="50px" alignSelf="flex-end"/>
</template>

<script setup lang="ts">
import LoadingIcon from "@/components/UI/LoadingIcon.vue";

import { useUser } from "../store/user";
import { useRouter } from "vue-router"; 

const userStore = useUser();
const router = useRouter();

const logOut = async () => {
  await userStore.logout();
  router.push("/sign-in");
};
</script>

<style lang="scss" scoped>
.user-profile {
  display: flex;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  .user-avatar-container {
    width: 100%;
    height: 100%;
    min-height: 50px;
    max-width: 50px;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.4);
    .user-avatar {
      display: block;
      width: 100%;
      height: 100%;
      max-width: 50px;
      min-height: 50px;
      object-fit:cover;
    }
  }

  .user-name {
    font-weight: bold;
    font-size: 18px;
  }

  .exit-btn {
    padding: 5px 10px;
    background-color: #dc3545;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background-color: #c82333;
    }
  }
  
}

.loading-custom {
  width: 50px;
  height: 50px;
}


</style>
