import $auth from "@/http/auth";
import { UserData, UserDataToValidate, UserDataToSignIn, ApiCommentsForUserResponse } from "@/interfaces";
import { AxiosResponse } from "axios";

export async function login(userData: UserDataToSignIn) {
  return $auth.post("/login", userData);
}

export async function registration(userData: UserData) {
  return $auth.post("/registration", userData);
}
export async function validate(userData: UserDataToValidate) {
  return $auth.post("/validate", userData);
}

export async function validateLogin(userData: UserDataToValidate) {
  return $auth.post("/validate-login", userData);
}

export async function logout() {
  return $auth.post("/logout");
}

export async function deleteUser(id: string): Promise<AxiosResponse<void>> {
  return $auth.delete(`/delete-user/${id}`);
}

export async function getCommentsForUser(userId: string,): Promise<AxiosResponse<ApiCommentsForUserResponse>> {
  return $auth.get(`/${userId}/comments`);
}