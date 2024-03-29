import $auth from "@/http/auth";
import { UserData, UserDataToValidate, UserDataToSignIn } from "@/interfaces";

export async function login(userData: UserDataToSignIn) {
    return $auth.post('/login', userData);
}

export async function registration(userData: UserData) {
    return $auth.post('/registration', userData);
}
export async function validate(userData: UserDataToValidate) {
    return $auth.post('/validate', userData);
}

export async function logout() {
    return $auth.post('/logout');
}