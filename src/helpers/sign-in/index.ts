import { ref, Ref } from "vue";
import { useRouter } from "vue-router";
import { useUser } from "@/store/user";
import { UserDataToSignIn } from "@/interfaces";

interface UserSignInUtil {
  email: Ref<string>;
  password: Ref<string>;
  logInHandler: () => Promise<void>;
}

export function useUserSignIn(): UserSignInUtil {
  const userStore = useUser();
  const router = useRouter();

  const email = ref("");
  const password = ref("");

  const logInHandler = async (): Promise<void> => {
    const user: UserDataToSignIn = {
      email: email.value,
      password: password.value,
    };
    await userStore.login(user);
    router.push("/");
  };

  return {
    email,
    password,
    logInHandler,
  };
}
