<template>
  <div class="sign-in-page">
    <h1>Вход</h1>
    <div class="sign-in-form">
      <input type="text" class="input-field" placeholder="Email" v-model="email" />
      <div>
        <input maxlength="50" class="input-field" placeholder="Password" v-model="password" />
      </div>
      
      <button @click="logIn" class="submit-button">Войти</button>
    </div>
    <div>
      <router-link to="/registration" class="home-link"
        >Еще нет аккаунта?</router-link
      >
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useUser } from "@/store/user";

const userStore = useUser();

const email = ref("");
const password = ref("");
const router = useRouter();

const logIn = async () => {
  await userStore.login(email.value, password.value);
  router.push("/");
};
</script>

<style lang="scss" scoped>
.sign-in-page {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .sign-in-form {
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .input-field {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 16px;
    }

    .submit-button {
      width: 100%;
      padding: 10px;
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-size: 16px;
      transition: background-color 0.3s;

      &:hover {
        background-color: #0056b3;
      }
    }
  }

  .home-link {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
