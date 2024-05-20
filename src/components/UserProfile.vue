<template>
  <div v-if="userStore.user && userStore.isAuth" class="user-profile">
    <div v-if="userStore.user.avatar.avatarUrl" class="user-avatar-container">
      <img :src="userStore.user.avatar.avatarUrl" alt="" class="user-avatar" />
      
    </div>
    <div class="user-name">{{ userStore.user.firstName }}</div>
    <CustomButton fullWidth red @click="logOut" text="Выйти" />
    <CustomButton
      fullWidth
      red
      @click="userStore.user && deleteCurrentUser(userStore.user._id)"
      text="Удалить"
    />
  </div>

  <LoadingIcon v-if="userStore.isLoading" size="50px" alignSelf="flex-end" />
</template>

<script setup lang="ts">
import LoadingIcon from "@/components/UI/LoadingIcon.vue";

import { useUser } from "@/store/user";
import { useNews } from "@/store/news";
import { useRouter } from "vue-router";
import CustomButton from "@/components/UI/CustomButton.vue";

const userStore = useUser();
const newsStore = useNews();
const router = useRouter();

const logOut = async () => {
  try {
    await userStore.logout();
    newsStore.searchQuery = "";
    newsStore.hasMore = true;
    router.push("/sign-in");
  } catch (error) {
    console.log(error);
  }
};

const deleteCurrentUser = async (id: string) => {
  try {
    await userStore.deleteUser(id);
    newsStore.searchQuery = "";
    newsStore.hasMore = true;
    router.push("/sign-in");
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
.user-profile {
  display: flex;
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

      width: 50px;
      height: 50px;
      object-fit: cover;
    }
  }

  .user-name {
    font-weight: bold;
    font-size: 18px;
  }
}
</style>
