import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";

import NewsPage from "@/pages/NewsPage.vue";
import NewsDetails from "@/pages/NewsDetails.vue";
import ErrorPage from "@/pages/ErrorPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import SignInPage from "@/pages/SignInPage.vue";

import { useMain } from "./store/main";

const routes: readonly RouteRecordRaw[] = [
  {
    path: "/",
    name: "NewsPage",
    component: NewsPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/news/:id",
    name: "NewsDetails",
    component: NewsDetails,
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: "/registration",
    name: "Registration",
    component: RegisterPage,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignInPage,
    meta: {
      requiresAuth: false,
    },
  },

  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: ErrorPage,
    meta: { requiresAuth: true, statusCode: 404 },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const token = localStorage.getItem("token");

  if (requiresAuth && !token) {
    next("/sign-in");
  } else if (!requiresAuth && token) {
    next("/");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  const mainStore = useMain();
  
  if (to.name) {
    const nonHomeRoutes = ["NewsPage", "Registration", "SignIn", "NotFound"];
    mainStore.isHomeLinkVisible = !nonHomeRoutes.includes(to.name as string);

    const userProfileRoutes = ["Registration", "SignIn", "NotFound"];
    mainStore.isUserProfileVisible = !userProfileRoutes.includes(to.name as string);
  }

  next();
});

export default router;
