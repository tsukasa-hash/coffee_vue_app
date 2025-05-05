import { createRouter, createWebHistory } from "vue-router";
import HomeOfCoffee from "./views/HomeOfCoffee.vue";
import TopPage from "./components/TopPage.vue";
import MethodRegister from "./components/MethodRegister.vue";
import MethodDetailViewer from "./components/MethodDetailViewer.vue";
import MethodListViewer from "./components/MethodListViewer.vue";
import BrewingViewer from "./components/BrewingViewer.vue";

const routes = [
  {
    path: "/",
    name: "HomeOfCoffee",
    component: HomeOfCoffee,
  },
  {
    path: "/top_old",
    name: "top",
    component: TopPage,
  },
  {
    path: "/method_register",
    name: "method_register",
    component: MethodRegister,
  },
  {
    path: "/method_detail_viewer",
    name: "method_detail_viewer",
    component: MethodDetailViewer,
  },
  {
    // path: "/method_list_viewer",
    // name: "method_list_viewer",
    path: "/top",
    name: "top",
    component: MethodListViewer,
  },
  {
    path: "/brewing",
    name: "brewing",
    component: BrewingViewer,
  },
];

const router = createRouter({
  history: createWebHistory(), // HTML5 History モード
  routes,
});

export default router;
