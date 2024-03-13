import $auth from "@/http/auth";
import { UserData } from "@/interfaces/UserData";

export async function login(email: string, password: string) {
    return $auth.post('/login', { email, password });
}

export async function registration(userData: UserData) {
    return $auth.post('/registration', userData);
}
export async function validate(userData: UserData) {
    return $auth.post('/validate', userData);
}

export async function logout() {
    return $auth.post('/logout');
}