<template>
  <div class="sign-in-page">
    <h1>Создание аккаунта</h1>
    <RegisterForm />

    <router-link to="/sign-in" class="sign-in-link"
      >Уже есть аккаунт?</router-link
    >
  </div>
</template>

<script setup lang="ts">
import RegisterForm from "@/components/registration/RegisterForm.vue";
</script>

<style lang="scss" scoped>
@import '@/assets/scss/sign-in-page/styles.scss';
</style>
