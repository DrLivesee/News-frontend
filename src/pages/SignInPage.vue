<template>
  <div class="sign-in-page">
    <h1>Вход</h1>
    <SignInForm />
    <div>
      <router-link to="/registration" class="home-link"
        >Еще нет аккаунта?</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import SignInForm from "@/components/sign-in/SignInForm.vue";
</script>

<style lang="scss" scoped>
.sign-in-page {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .home-link {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
