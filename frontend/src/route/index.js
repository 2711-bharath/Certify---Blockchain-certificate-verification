import VueRouter from "vue-router";
import Vue from "vue";

import PageNotFound from "../shared/404/page-not-found.vue";

import LandingPage from "../modules/landing-page/pages/landing-page.vue";
import Login from "../modules/authentication/login/pages/login.vue";
import Signup from "../modules/authentication/signup/pages/signup.vue";

import Files from "../modules/dashboard/pages/my-files.vue";
import SharedFiles from "../modules/dashboard/pages/shared-files.vue";
import Bin from "../modules/dashboard/pages/deleted-files.vue";
import Profile from "../modules/profile/pages/profile.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: LandingPage,
    meta: () => ({
      title: "Home",
      show_sidebar: false,
    }),
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: () => ({
      title: "Login",
      show_sidebar: false,
    }),
  },
  {
    path: "/sign-up",
    name: "signup",
    component: Signup,
    meta: () => ({
      title: "Signup",
      show_sidebar: false,
    }),
  },
  {
    path: "/certificate/:uid",
    name: "certificate",
    component: LandingPage,
    meta: () => ({
      title: "Certificate",
      show_sidebar: false,
    }),
  },
  {
    path: "/files",
    name: "files",
    component: Files,
    meta: () => ({
      title: "Files",
      show_sidebar: true,
    }),
  },
  {
    path: "/shared",
    name: "shared",
    component: SharedFiles,
    meta: () => ({
      title: "Shared with me",
      show_sidebar: true,
    }),
  },
  {
    path: "/bin",
    name: "deleted",
    component: Bin,
    meta: () => ({
      title: "Bin",
      show_sidebar: true,
    }),
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: () => ({
      title: "Profile",
      show_sidebar: true,
    }),
  },
  {
    path: "/404",
    name: "page-not-found",
    component: PageNotFound,
    meta: () => ({
      title: "404",
      show_sidebar: false,
    }),
  },
  {
    path: "*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = Boolean(localStorage.getItem("user_id"));
  if (isLoggedIn) {
    if (to.name === "login" || to.name === "signup") next("/files");
    else next();
  } else if (["files", "deleted", "shared", "profile"].includes(to.name)) {
    next("/login");
  } else {
    next();
  }
});

export default router;
