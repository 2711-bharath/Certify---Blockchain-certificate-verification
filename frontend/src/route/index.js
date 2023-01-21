import VueRouter from "vue-router";
import Vue from "vue";
import Alerts from "../modules/alerts/pages/Alerts.vue";
import AlertDetails from "../modules/alerts/pages/AlertDetails.vue";
import Dashboard from "../modules/dashboard/pages/Dashboard.vue";
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
    path: "/admin",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/alerts",
    name: "alerts",
    component: Alerts,
  },
  {
    path: "/alerts/:alert_id",
    name: "alert-details",
    component: AlertDetails,
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = Boolean(localStorage.getItem("user"));
  if (isLoggedIn) {
    if (to.name === "Login" || to.name === "Register") next("/view-board");
    else next();
  } else if (["dashboard"].includes(to.name)) {
    next("/register");
  } else {
    next();
  }
});

export default router;
