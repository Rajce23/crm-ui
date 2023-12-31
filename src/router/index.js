import Vue from "vue";
import VueRouter from "vue-router";
import UsersDashboard from "../Users-Frontend/Components/UsersDashboard.vue";
import RolesDashboard from "../Users-Frontend/Components/RolesDashboard.vue";
import AllContactsDashboard from "../Contacts-frontend/Components/AllContactsDashboard.vue";
import ContactsByTypeDashobard from "../Contacts-frontend/Components/ContactsByTypeDashobard.vue";
import ContactPage from "../Contacts-frontend/Components/ContactPage.vue";
import store from "@/store";

Vue.use(VueRouter);

const routes = [
  { path: "/Users", component: UsersDashboard },
  { path: "/Roles", component: RolesDashboard },
  { path: "/Contacts/AllContacts", component: AllContactsDashboard },
  { path: "/Contacts/Customers", component: ContactsByTypeDashobard },
  { path: "/Contacts/Workers", component: ContactsByTypeDashobard },
  { path: "/Contacts/Vendors", component: ContactsByTypeDashobard },
  { path: "/Contacts/JobCandidates", component: ContactsByTypeDashobard },
  { path: "/Contacts/ContactPage", component: ContactPage },
  { path: "/", component: null },
  // Add a protected route that requires authentication
];

const router = new VueRouter({
  routes,
});

// Add a navigation guard to check if a route requires authentication
router.beforeEach(async (to, from, next) => {
  await store.dispatch("checkUserLogin");

  if (store.getters.isUserLogged === false) {
    if (to.path !== "/") {
      next("/");
    } else {
      next();
    }
  }
  await store.dispatch("checkUserLogin");
  next();
});

export default router;
