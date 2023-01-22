import VueRouter from "vue-router";
import Vue from "vue";

import PageNotFound from "../shared/404/page-not-found.vue";

import LandingPage from "../modules/landing-page/pages/landing-page.vue";
import Login from "../modules/authentication/login/pages/login.vue";
import Signup from "../modules/authentication/signup/pages/signup.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: LandingPage,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/sign-up",
    name: "signup",
    component: Signup,
  },
  {
    path: "/404",
    name: "page-not-found",
    component: PageNotFound,
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
  const isLoggedIn = Boolean(localStorage.getItem("user"));
  if (isLoggedIn) {
    if (to.name === "login" || to.name === "signup") next("/dashboard");
    else next();
  } else if (["dashboard"].includes(to.name)) {
    next("/sign-up");
  } else {
    next();
  }
});

export default router;
