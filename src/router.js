import Vue from "vue";
import VueRouter from "vue-router";
import VueMeta from "vue-meta";
import store from "@/store/index";

Vue.use(VueRouter);
Vue.use(VueMeta);

const beforeEnter = (routeTo, routeFrom, next) => {
  // If the user is already logged in
  if (store.getters["auth/loggedIn"]) {
    // Redirect to the home page instead
    next({ name: "account" });
  } else {
    // Continue to the login page
    next();
  }
};

const redirectToLogin = (routeTo, next) => {
  if (routeTo.fullPath !== "/") {
    // Pass the original route to the login component
    next({ name: "login", query: { redirectFrom: routeTo.fullPath } });
  } else {
    next({ name: "login" });
  }
};

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/logout",
      name: "logout",
      meta: {
        authRequired: true
      },
      beforeEnter(routeTo, routeFrom, next) {
        store.dispatch("auth/logout");
        const authRequiredOnPreviousRoute = routeFrom.matched.some(
          route => route.meta.authRequired
        );
        // Navigate back to previous page, or home as a fallback
        next(authRequiredOnPreviousRoute ? { name: "home" } : { ...routeFrom });
      }
    },
    {
      path: "/",
      meta: {
        authRequired: false
      },
      // Default view with MainLayout
      component: () => import("./views/layout/MainLayout.vue"),
      children: [
        {
          path: "",
          name: "login",
          component: () => import("./views/Login.vue"),
          meta: {
            authRequired: false
          }
        }
      ]
    },
    {
      path: "/404",
      name: "404",
      // eslint-disable-next-line
      component: () => import('./views/Page404.vue'),
      // Allows props to be passed to the 404 page through route
      // params, such as `resource` to define what wasn't found.
      props: true
    },
    // Redirect any unmatched routes to the 404 page. This may
    // require some server configuration to work in production:
    // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
    {
      path: "*",
      redirect: "404"
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  }
});

// Before each route evaluates...
// eslint-disable-next-line
router.beforeEach((routeTo, routeFrom, next) => {
  // Check if auth is required on this route
  // (including nested routes).
  const authRequired = routeTo.matched.some(route => route.meta.authRequired);

  // If auth isn't required for the route, just continue.
  if (!authRequired) {
    return next();
  }

  // If auth is required and the user is logged in...
  if (store.getters["auth/loggedIn"]) {
    // Validate the local user token...
    return store.dispatch("user/fetchUserInfo").then(user => {
      if (user) {
        next();

      } else {
        redirectToLogin(routeTo, next);
      }
    });
  }

  // If auth is required and the user is NOT currently logged in,
  // redirect to login.
  redirectToLogin(routeTo, next);
});

export default router;
