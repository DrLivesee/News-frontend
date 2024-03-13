import { createRouter, createWebHistory } from "vue-router";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getAuth } from "firebase/auth";
// import { useUser } from "./store/user";

import NewsPage from "./pages/NewsPage.vue";
import NewsDetails from "./pages/NewsDetails.vue";
import ErrorPage from "./pages/ErrorPage.vue";
import RegisterPage from "./pages/RegisterPage.vue";
import SignInPage from "./pages/SignInPage.vue";

// const userStore = useUser()

const routes = [
  {
    path: "/",
    name: NewsPage,
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

// router.beforeEach(async (to, from, next) => {
//   const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
//   const user = userStore.user;
//   if (requiresAuth) {

//     if (user) {
//       next();
//     } else {
//       next("/sign-in");
//     }
//   } else {

//     if (user) {
//       next('/');
//     } else {
//       next();
//     }
//   }
// });

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

// router.beforeEach((to, from, next) => {
//   const statusCode = to.meta.statusCode || 200;
//   if (statusCode >= 400) {
//     document.title = `${statusCode} | News`;
//   } else {
//     document.title = "News";
//   }
//   next();
// });

export default router;
