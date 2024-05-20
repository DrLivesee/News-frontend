<template>
  <div class="register-form">
    <div class="input-container">
      <CustomInput placeholder="Имя" v-model="firstName" />

      <div v-if="errors.formatFirstName" class="validate-error">
        {{ errors.formatFirstName }}
      </div>
    </div>

    <div class="input-container">
      <CustomInput placeholder="Фамилия" v-model="lastName" />

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

      <CustomButton
        big
        v-if="fileName"
        text="Очистить"
        red
        right
        @click="clearFileInput"
      />

      <div v-if="avatarError" class="validate-error">{{ avatarError }}</div>
    </div>
    <div class="input-container">
      <CustomInput placeholder="Email" v-model="email" />
      <div v-if="errors.formatEmail" class="validate-error">
        {{ errors.formatEmail }}
      </div>
      <div v-else-if="errors.email" class="validate-error">
        {{ errors.email }}
      </div>
    </div>

    <div class="input-container">
      <CustomInput
        :type="typeOfInput"
        :maxlength="50"
        placeholder="Password"
        v-model="password"
      />
      <i
        class="material-icons show-password"
        @click="changeTypeOfPasswordInput"
        >{{ iconName }}</i
      >

      <div v-if="errors.formatPassword" class="validate-error">
        {{ errors.formatPassword }}
      </div>
    </div>

    <div class="input-container">
      <label class="custom-checkbox">
        <input type="checkbox" v-model="isAdmin" />
        <div class="checkmark" :class="{ checked: isAdmin }">
          <i v-if="isAdmin" class="material-icons check">check</i>
        </div>
        <span class="label">Админ</span>
      </label>
    </div>

    <LoadingIcon v-if="isRegistrationLoading" alignSelf="center" />
    
    <CustomButton v-else big fullWidth blue text="Создать" @click="registerHandler" />
  </div>
</template>

<script setup lang="ts">
import { useUserRegistration } from "@/helpers/registration";
import { ref, watch } from "vue";
import CustomButton from "@/components/UI/CustomButton.vue";
import CustomInput from "@/components/UI/CustomInput.vue";
import LoadingIcon from "@/components/UI/LoadingIcon.vue";

const {
  email,
  password,
  firstName,
  lastName,
  isAdmin,
  fileName,
  errors,
  avatarError,
  isRegistrationLoading,
  clearFileInput,
  handleAvatarChange,
  registerHandler,
  clearErrors,
} = useUserRegistration();

const typeOfInput = ref("password");
const iconName = ref("visibility_off");

const changeTypeOfPasswordInput = () => {
  if (typeOfInput.value === "password") {
    iconName.value = "visibility";
    typeOfInput.value = "text";
  } else {
    iconName.value = "visibility_off";
    typeOfInput.value = "password";
  }
};

watch(
  [password, email, firstName, lastName, fileName],
  () => {
    clearErrors();
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.register-form {
  width: 100%;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  gap: 24px;

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

    .show-password {
      position: absolute;
      right: 10px;
      top: 8px;
      cursor: pointer;
    }

    .custom-checkbox {
      display: inline-block;
      position: relative;
      cursor: pointer;

      input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
      }

      .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
        width: 20px;
        background-color: transparent;
        border: 2px solid $blue-2;
        border-radius: 4px;

        .check {
          position: absolute;
          font-size: 18px;
          font-weight: bold;
          top: -1px;
          left: -1px;
        }
      }

      input:checked ~ .checkmark {
        background-color: $blue-1;
        border-color: $blue-2;
      }

      .label {
        margin-left: 28px;
      }
    }
  }

  .file-input-container {
    position: relative;
    .validate-error {
      padding-left: 12px;
      position: absolute;
      font-size: 12px;
      bottom: -15px;
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
      height: 40px;
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
