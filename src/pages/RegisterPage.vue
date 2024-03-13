<template>
  <div class="register-page">
    <h1>Создание аккаунта</h1>
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
        <button v-if="fileName" class="clear-button" @click="clearFileInput">
          Очистить
        </button>
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

      <button @click="register" class="submit-button">Создать</button>
      <!-- <button @click="validate" class="submit-button">Проверить</button> -->
    </div>
    <div>
      <router-link to="/sign-in" class="home-link"
        >Уже есть аккаунт?</router-link
      >
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

import axios from "axios";

import { useUser } from "@/store/user";

const userStore = useUser();

const email = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");
const router = useRouter();
const file = ref(null);
const avatarUrl = ref("");
const fileName = ref("");
const errors = ref({});
const isValidForRegistration = ref(false);

const clearFileInput = () => {
  file.value = null;
  fileName.value = "";
};

async function uploadImage(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      "http://localhost:3000/upload-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Failed to upload image");
    }

    const data = await response.data;
    console.log("Image uploaded successfully:", data);
    return data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

const handleAvatarChange = async (event) => {
  file.value = event.target.files[0];
  fileName.value = event.target.files[0].name;
};

const uploadImageHandler = async () => {
  try {
    const result = await uploadImage(file.value);
    avatarUrl.value = result.data.secure_url;
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

const validate = async () => {
  const resp = await userStore.validate(
    email.value,
    password.value,
    firstName.value,
    lastName.value
  );

  errors.value = resp.data.errors;
  isValidForRegistration.value = resp.data.isValid;
  console.log(resp)
};

const register = async () => {
  await validate()
  if (!isValidForRegistration.value) return
  if (file.value) await uploadImageHandler();
  await userStore.registration(
    email.value,
    password.value,
    firstName.value,
    lastName.value,
    avatarUrl.value
  );
  router.push("/");
};

watch([password, email, firstName, lastName], () => {
  errors.value = {}
}, { deep: true })
</script>

<style lang="scss" scoped>
.register-page {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .register-form {
    width: 100%;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .input-container {
      position: relative;

      .validate-error {
        padding-left: 12px;
        position: absolute;
        font-size: 12px;
        bottom: 0;
        color: #ff2400;
      }
    }

    .input-field {
      width: 100%;
      padding: 10px;
      margin-bottom: 16px;
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
        display: inline-block;
        padding: 10px 15px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        width: 100%;
      }

      .file-input-label:hover {
        background-color: #0056b3;
      }

      .clear-button {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        padding: 5px 10px;
        background-color: #dc3545;
        color: #fff;
        border: none;
        border-radius: 0 5px 5px 0;
        cursor: pointer;
        font-size: 14px;
        
        &:hover {
          background-color: #c82333;
        }
      }

      
    }

    .error-message {
      color: red;
      margin-bottom: 10px;
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
    }

    .submit-button:hover {
      background-color: #0056b3;
    }
  }

  .home-link {
    color: #007bff;
    text-decoration: none;
  }

  .home-link:hover {
    text-decoration: underline;
  }
}
</style>
