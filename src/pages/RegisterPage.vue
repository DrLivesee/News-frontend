<template>
  <div class="register-page">
    <h1>Создание аккаунта</h1>
    <RegisterForm/>
    
    <div>
      <router-link to="/sign-in" class="home-link"
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
  
  .home-link {
    color: #007bff;
    text-decoration: none;
  }

  .home-link:hover {
    text-decoration: underline;
  }
}
</style>
