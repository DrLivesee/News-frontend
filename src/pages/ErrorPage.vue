<template>
    <div class="error-page">
      <div class="error-container">
        <h1 class="error-title">{{ errorCode }}</h1>
        <p class="error-message">{{ errorMessage }}</p>
        <router-link to="/" class="home-link">На главную</router-link>
      </div>
    </div>
  </template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const errorCode = route.meta.statusCode || 500;
const errorMessage =
  errorCode === 404 ? "Страница не найдена" : "Произошла ошибка";
</script>
  
<style lang="scss" scoped>
@import '@/assets/scss/error-page/styles.scss';
</style>
  
