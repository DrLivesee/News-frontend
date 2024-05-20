<template>
  <div class="sign-in-form">
    <div class="input-container">
      <CustomInput placeholder="Email" v-model="email" />
      <div v-if="errors.formatEmail" class="validate-error">
        {{ errors.formatEmail }}
      </div>
      <div v-else-if="errors.email" class="validate-error">{{ errors.email }}</div>
      
    </div>
    <div class="input-container input-password-container">
      <CustomInput
        :type="typeOfInput"
        :maxlength="50"
        placeholder="Password"
        v-model="password"
        style="padding-right: 40px"
      />
      <i
        class="material-icons show-password"
        @click="changeTypeOfPasswordInput"
        >{{ iconName }}</i
      >
      <div v-if="errors.formatPassword" class="validate-error">
        {{ errors.formatPassword }}
      </div>
      <div v-else-if="errors.correctPassword" class="validate-error">
        {{ errors.correctPassword }}
      </div>
    </div>

    <LoadingIcon v-if="isLoginLoading" alignSelf="center" />
    <CustomButton v-else big fullWidth blue text="Войти" @click="logInHandler" />
  </div>
</template>

<script setup lang="ts">
import { useUserSignIn } from "@/helpers/sign-in";
import CustomButton from "@/components/UI/CustomButton.vue";
import CustomInput from "@/components/UI/CustomInput.vue";
import { ref, watch } from "vue";
import LoadingIcon from "@/components/UI/LoadingIcon.vue";

const { email, password, errors, isLoginLoading, clearErrors, logInHandler } = useUserSignIn();

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
  [password, email],
  () => {
    clearErrors();
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.sign-in-form {
  width: 100%;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  .input-password-container {
    position: relative;

    .show-password {
      position: absolute;
      right: 10px;
      top: 8px;
      cursor: pointer;
    }
  }

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
}
</style>
