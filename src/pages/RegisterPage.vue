<template>
  <div class="register-page">
    <h1 class="register-page-title">Создание аккаунта</h1>
    <RegisterForm />

    <div class="sign-in-link-container">
      <router-link to="/sign-in" class="sign-in-link"
        >Уже есть аккаунт?</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import RegisterForm from "@/components/registration/RegisterForm.vue";
</script>

<style lang="scss" scoped>
.register-page {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &-title {
    font-size: 24px;
    margin-bottom: 16px;
  }

  .sign-in-link-container {
    padding-top: 10px;
    .sign-in-link {
      color: $blue-1;
      text-decoration: none;
      padding: 10px;

      &:hover {
        text-decoration: underline;
        color: $blue-2;
      }
    }
  }
}
</style>
