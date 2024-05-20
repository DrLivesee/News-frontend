import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

import { defineStore } from "pinia";
import axios, { AxiosResponse } from "axios";

import {
  User,
  ErrorResponse,
  UserDataToValidate,
  UserDataToSignIn,
  UserData,
  ApiValidateResponse,
  PostImageResponse,
} from "@/interfaces";
import * as AuthService from "@/service/AuthService";

interface IUserState {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
}

export const useUser = defineStore("user", () => {
  const state: IUserState = reactive({
    user: null as User | null,
    isAuth: false,
    isLoading: false,
  });

  const router = useRouter();

  const login = async (user: UserDataToSignIn): Promise<void> => {
    const { email, password } = user;
    try {
      const response: AxiosResponse<{ accessToken: string; user: User }> =
        await AuthService.login({ email, password });
      localStorage.setItem("token", response.data.accessToken);
      state.isAuth = true;
      state.user = response.data.user;
    } catch (e) {
      console.log((e as ErrorResponse).message);
    }
  };

  const registration = async (user: UserData): Promise<void> => {
    const {
      email,
      password,
      firstName,
      lastName,
      avatar,
      isAdmin = false,
    } = user;
    try {
      const response: AxiosResponse<{ accessToken: string; user: User }> =
        await AuthService.registration({
          email,
          password,
          firstName,
          lastName,
          avatar,
          isAdmin,
        });

      // console.log(response)

      localStorage.setItem("token", response.data.accessToken);
      state.isAuth = true;
      state.user = response.data.user;
    } catch (e) {
      console.log((e as ErrorResponse).message);
    }
  };

  const validateLogin = async (
    user: UserDataToValidate
  ): Promise<ApiValidateResponse | void> => {
    try {
      const resp: AxiosResponse<ApiValidateResponse> =
        await AuthService.validateLogin(user);

      return resp.data;
    } catch (e) {
      console.log((e as ErrorResponse).message);
    }
  };

  const validate = async (
    user: UserDataToValidate
  ): Promise<ApiValidateResponse | void> => {
    try {
      const resp: AxiosResponse<ApiValidateResponse> =
        await AuthService.validate(user);

      return resp.data;
    } catch (e) {
      console.log((e as ErrorResponse).message);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      localStorage.removeItem("search");
      state.isAuth = false;
      state.user = null;
    } catch (e) {
      console.log((e as ErrorResponse).message);
    }
  };

  const deleteAvatar = async (): Promise<void> => {
    try {
      if (state.user?.avatar.avatarUrl) {
        const public_id = state.user.avatar.public_id.split("/")[1];
        await axios.delete(`http://localhost:3000/image/delete/${public_id}`);
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id: string): Promise<void> => {
    try {
      await AuthService.deleteUser(id);
      await deleteAvatar();
      await logout();
    } catch (e) {
      console.log((e as ErrorResponse).message);
    }
  };

  const checkAuth = async (): Promise<void> => {
    state.isLoading = true;
    try {
      const response: AxiosResponse<{ accessToken: string; user: User }> =
        await axios.get(`${import.meta.env.VITE_AUTH_API_URL}/refresh`, {
          withCredentials: true,
        });
      localStorage.setItem("token", response.data.accessToken);
      state.isAuth = true;
      state.user = response.data.user;
    } catch (e) {
      await logout();
      router.push("/sign-in");
      console.log((e as ErrorResponse).message);
    } finally {
      state.isLoading = false;
    }
  };

  const uploadImage = async (file: File): Promise<PostImageResponse> => {
    try {
      const formData: FormData = new FormData();
      formData.append("file", file);

      const response: AxiosResponse<{
        success: boolean;
        message: string;
        data?: any;
      }> = await axios.post("http://localhost:3000/image/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status !== 200) {
        throw new Error("Failed to upload image");
      }

      const data: PostImageResponse = response.data;

      return data;
    } catch (error) {
      console.error("Error uploading image", error);
      throw error;
    }
  };

  return {
    ...toRefs(state),
    login,
    registration,
    validateLogin,
    validate,
    logout,
    deleteUser,
    checkAuth,
    uploadImage,
  };
});
