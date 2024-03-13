import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

import { defineStore } from "pinia";
import axios from "axios";

import * as AuthService from "@/service/AuthService";

export const useUser = defineStore("user", () => {
  const state = reactive({
    user: null,
    isAuth: false,
    isLoading: false,
  });

  const router = useRouter();

  const login = async (email, password) => {
    try {
      const response = await AuthService.login(email, password);
      // console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      state.isAuth = true;
      state.user = response.data.user;
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  };

  const registration = async (email, password, firstName, lastName, avatar) => {
    try {
      const response = await AuthService.registration(
        email,
        password,
        firstName,
        lastName,
        avatar
      );
      // console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      state.isAuth = true;
      state.user = response.data.user;
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  };
  const validate = async (email, password, firstName, lastName) => {
    try {
      const resp = await AuthService.validate(
        email,
        password,
        firstName,
        lastName
      );
      return resp;
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  };

  const logout = async () => {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      state.isAuth = false;
      state.user = {};
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  };

  const checkAuth = async () => {
    state.isLoading = true;
    try {
      const response = await axios.get(`${process.env.AUTH_API_URL}/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
      state.isAuth = true;
      state.user = response.data.user;
    } catch (e) {
      await logout();
      // TODO: podumat, ne tut
      router.push("/sign-in");
      console.log(e.response?.data?.message);
    } finally {
      state.isLoading = false;
    }
  };

  return { ...toRefs(state), login, registration, validate, logout, checkAuth };
});
