import jwtDecode from "jwt-decode";
import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.fullPath.includes("auth") && localStorage.getItem("jwt") === null) {
    return next();
  }
  if (localStorage.getItem("jwt") !== null) {
    const role = jwtDecode(localStorage.getItem("jwt"))["role"];
    // do not redirect to auth if logged in
    if (to.fullPath.includes("auth")) {
      return next(false);
    }
    //admin
    if (to.fullPath.includes("admin") && role !== "admin") {
      return next({ name: "LowPermission" });
    }
    //client
    if (to.fullPath.includes("client") && role !== "client") {
      return next({ name: "LowPermission" });
    }
    next();
  } else {
    return next({ name: "Auth" });
  }
});

export default router;
