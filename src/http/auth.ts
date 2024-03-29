import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosRequestHeaders,
} from "axios";

import { AuthResponse, ErrorResponse } from "@/interfaces";

const $auth = axios.create({
  withCredentials: true,
  baseURL: import.meta.env.VITE_AUTH_API_URL,
});

$auth.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    } as AxiosRequestHeaders;
  }
  return config;
});

$auth.interceptors.response.use(
  (config: AxiosResponse<AuthResponse>) => {
    return config;
  },
  async (error: AxiosError<ErrorResponse>) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status == 401 &&
      originalRequest &&
      error.config
    ) {
        (originalRequest as any)._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(
          `${import.meta.env.VITE_AUTH_API_URL}/refresh`,
          { withCredentials: true }
        );
        localStorage.setItem("token", response.data.accessToken);
        return $auth.request(originalRequest);
      } catch (e) {
        console.log("НЕ АВТОРИЗОВАН");
      }
    }
    throw error;
  }
);

export default $auth;
