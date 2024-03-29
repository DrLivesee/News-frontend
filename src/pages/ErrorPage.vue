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
  .error-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f2e9e4; 
  }
  
  .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 40px;
    border-radius: 8px;
    background-color: #fff; 
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.1);
  }
  
  .error-title {
    font-size: 64px;
    color: #22223B; 
    margin-bottom: 20px;
  }
  
  .error-message {
    font-size: 24px;
    color: #22223b; 
    margin-bottom: 10px;
  }
  
  .home-link {
    font-size: 18px;
    color: #fff; 
    background-color: #22223b; 
    padding: 10px 20px;
    border-radius: 4px;
    text-decoration: none;
    transition: background-color 0.3s;
  
    &:hover {
      background-color: #4A4E69; 
    }
  }
  </style>
  
