import { ref, Ref } from "vue";
import { useRouter } from "vue-router";
import { useUser } from "@/store/user";
import {
  UserDataToValidate,
  UserData,
  ApiValidateResponse,
  PostImageResponse,
} from "@/interfaces";
// import { AxiosError } from "axios";

interface UserRegistrationUtil {
  email: Ref<string>;
  password: Ref<string>;
  firstName: Ref<string>;
  lastName: Ref<string>;
  isAdmin: Ref<boolean>;
  file: Ref<File | null>;
  avatarUrl: Ref<string>;
  avatarId: Ref<string>;
  fileName: Ref<string>;
  errors: Ref<{ [key: string]: string }>;
  avatarError: Ref<string>;
  isValidForRegistration: Ref<boolean>;
  isAvatarValidForRegistration: Ref<boolean>;
  isRegistrationLoading: Ref<boolean>;
  clearFileInput: () => void;
  handleAvatarChange: (event: Event) => void;
  uploadImageHandler: () => Promise<void>;
  validateHandler: () => Promise<void>;
  registerHandler: () => Promise<void>;
  clearErrors: () => void;
}

export function useUserRegistration(): UserRegistrationUtil {
  const userStore = useUser();
  const router = useRouter();

  const email = ref("");
  const password = ref("");
  const firstName = ref("");
  const lastName = ref("");
  const isAdmin = ref(false);
  const file = ref<File | null>(null);
  const avatarUrl = ref("");
  const avatarId = ref("");
  const fileName = ref("");
  const errors = ref<{ [key: string]: string }>({});
  const isValidForRegistration = ref(false);
  const isAvatarValidForRegistration = ref(false);
  const avatarError = ref("");

  const isRegistrationLoading = ref(false);

  const clearFileInput = (): void => {
    file.value = null;
    fileName.value = "";
  };

  const clearErrors = (): void => {
    errors.value = {};
    avatarError.value = "";
  };

  const handleAvatarChange = (event: Event): void => {
    if (event.target instanceof HTMLInputElement && event.target.files) {
      file.value = event.target.files[0];
      fileName.value = event.target.files[0].name;
    }
  };

  const uploadImageHandler = async (): Promise<void> => {
    try {
      const result: PostImageResponse = await userStore.uploadImage(
        file.value as File
      );

      if (result) {
        isAvatarValidForRegistration.value = result.success;

        if (isAvatarValidForRegistration.value) {
          console.log(result.data);
          avatarUrl.value = result.data.secure_url;
          avatarId.value = result.data.public_id;
        } else {
          avatarError.value = result.message;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const validateHandler = async (): Promise<void> => {
    const userData: UserDataToValidate = {
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
    };

    try {
      const resp: ApiValidateResponse | void = await userStore.validate(
        userData
      );
      if (resp) {
        errors.value = resp.errors;
        isValidForRegistration.value = resp.isValid;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const registerHandler = async (): Promise<void> => {
    isRegistrationLoading.value = true;
    try {
      await validateHandler();
    } catch (error) {
      console.log(error);
    }

    if (!isValidForRegistration.value) {
      isRegistrationLoading.value = false;
      return;
    }

    try {
      if (file.value) {
        await uploadImageHandler();
      } else {
        isAvatarValidForRegistration.value = true;
      }
    } catch (error) {
      console.log(error);
      return;
    }

    if (!isAvatarValidForRegistration.value) {
      isRegistrationLoading.value = false;
      return;
    }

    try {
      const userData: UserData = {
        email: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
        avatar: {
          avatarUrl: avatarUrl.value,
          public_id: avatarId.value,
        },
        isAdmin: isAdmin.value,
      };
      await userStore.registration(userData);
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      isRegistrationLoading.value = false;
    }
  };

  return {
    email,
    password,
    firstName,
    lastName,
    isAdmin,
    file,
    fileName,
    avatarUrl,
    avatarId,
    errors,
    avatarError,
    isValidForRegistration,
    isAvatarValidForRegistration,
    isRegistrationLoading,
    uploadImageHandler,
    clearFileInput,
    validateHandler,
    handleAvatarChange,
    registerHandler,
    clearErrors,
  };
}
