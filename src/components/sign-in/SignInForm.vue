<template>
    <div class="sign-in-form">
      <input type="text" class="input-field" placeholder="Email" v-model="email" />
      <div>
        <input maxlength="50" class="input-field" placeholder="Password" v-model="password" />
      </div>
      
      <button @click="logInHandler" class="submit-button">Войти</button>
    </div>
</template>

<script setup lang="ts">
import {useUserSignIn}  from '@/helpers/sign-in'

const {
  email,
  password,
  logInHandler
} = useUserSignIn();

</script>

<style lang="scss" scoped>
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
</style>