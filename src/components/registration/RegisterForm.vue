<template>
  <div class="register-form">
    <div class="input-container">
      <input
        type="text"
        class="input-field"
        placeholder="Имя"
        v-model="firstName"
      />
      <div v-if="errors.formatFirstName" class="validate-error">
        {{ errors.formatFirstName }}
      </div>
    </div>

    <div class="input-container">
      <input
        type="text"
        class="input-field"
        placeholder="Фамилия"
        v-model="lastName"
      />

      <div v-if="errors.formatLastName" class="validate-error">
        {{ errors.formatLastName }}
      </div>
    </div>
    <div class="file-input-container">
      <input
        id="file"
        type="file"
        class="input-field file-input"
        accept="image/*"
        @change="handleAvatarChange"
      />
      <label for="file" class="file-input-label">
        {{ fileName ? fileName : "Выберите фотографию" }}
      </label>
      <!-- <button v-if="fileName" class="clear-button" @click="clearFileInput">
        Очистить
      </button> -->
      <CustomButton big v-if="fileName" text="Очистить" red right @click="clearFileInput"/>
    </div>
    <div class="input-container">
      <input
        type="text"
        class="input-field"
        placeholder="Email"
        v-model="email"
      />
      <div v-if="errors.email" class="validate-error">{{ errors.email }}</div>
      <div v-if="errors.formatEmail" class="validate-error">
        {{ errors.formatEmail }}
      </div>
    </div>

    <div class="input-container">
      <input
        maxlength="50"
        class="input-field"
        placeholder="Password"
        v-model="password"
      />

      <div v-if="errors.formatPassword" class="validate-error">
        {{ errors.formatPassword }}
      </div>
    </div>

    <CustomButton big fullWidth blue text="Создать" @click="registerHandler" />
  </div>
</template>

<script setup lang="ts">
import { useUserRegistration } from "@/helpers/registration";
import { watch } from "vue";
import CustomButton from "@/components/UI/CustomButton.vue";

const {
  email,
  password,
  firstName,
  lastName,
  fileName,
  errors,
  clearFileInput,
  handleAvatarChange,
  registerHandler,
  clearErrors,
} = useUserRegistration();

watch(
  [password, email, firstName, lastName],
  () => {
    clearErrors();
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.register-form {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .input-container {
    position: relative;

    .validate-error {
      padding-left: 12px;
      position: absolute;
      font-size: 12px;
      bottom: -10;
      font-weight: bold;
      color: $red-1;
    }
  }

  .input-field {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
  }

  .file-input-container {
    position: relative;
    display: flex;
    width: 100%;

    .file-input {
      display: none;
    }

    .file-input-label {
      padding: 8px 12px;
      outline: none;
      color: $white-1;
      font-size: 16px;
      border-radius: 5px;
      cursor: pointer;
      width: 100%;
      background-color: $blue-1;
      transition: background-color 0.1s ease;
      border: 2px solid $blue-2;

      &:hover {
        background-color: $blue-2;
      }
    }
  }

  
}
</style>
