<template>
  <div class="sign-in-page">
    <h1>Вход</h1>
    <SignInForm />
    <div>
      <router-link to="/registration" class="sign-in-link"
        >Еще нет аккаунта?</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import SignInForm from "@/components/sign-in/SignInForm.vue";
</script>

<style lang="scss" scoped>
@import '@/assets/scss/sign-in-page/styles.scss';
</style>
