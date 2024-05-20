import { ref, Ref } from "vue";
import { useRouter } from "vue-router";
import { useUser } from "@/store/user";
import {
  ApiValidateResponse,
  UserDataToSignIn,
  UserDataToValidate,
} from "@/interfaces";

interface UserSignInUtil {
  email: Ref<string>;
  password: Ref<string>;
  errors: Ref<{ [key: string]: string }>;
  isValidForLogin: Ref<boolean>;
  isLoginLoading: Ref<boolean>;
  clearErrors: () => void;
  validateHandler: () => Promise<void>;
  logInHandler: () => Promise<void>;
}

export function useUserSignIn(): UserSignInUtil {
  const userStore = useUser();
  const router = useRouter();

  const email = ref("");
  const password = ref("");

  const errors = ref<{ [key: string]: string }>({});
  const isValidForLogin = ref(false);

  const isLoginLoading = ref(false)

  const clearErrors = (): void => {
    errors.value = {};
  };

  const validateHandler = async (): Promise<void> => {
    const userData: UserDataToValidate = {
      email: email.value,
      password: password.value,
    };

    try {
      const resp: ApiValidateResponse | void = await userStore.validateLogin(
        userData
      );
      if (resp) {
        errors.value = resp.errors;
        isValidForLogin.value = resp.isValid;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logInHandler = async (): Promise<void> => {
    isLoginLoading.value = true;
    try {
      await validateHandler();
    } catch (error) {
      console.log(error);
    }

    if (!isValidForLogin.value) {
      isLoginLoading.value = false;
      return};

    try {
      const user: UserDataToSignIn = {
        email: email.value,
        password: password.value,
      };
      await userStore.login(user);
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      isLoginLoading.value = false;
    }
  };

  return {
    email,
    password,
    errors,
    isValidForLogin,
    isLoginLoading,
    clearErrors,
    validateHandler,
    logInHandler,
  };
}
