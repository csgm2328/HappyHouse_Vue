import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
import VueRouter from "vue-router";
import Contents from "../page/Contents.vue";
import Service from "../page/Service.vue";
import Login from "../page/Login.vue";
import Board from "../page/Board.vue";
import User from "../page/User.vue";

Vue.use(VueRouter);
Vue.use(VueGoogleMaps,{
  load :{
    key : "AIzaSyDPuePXJ7KFtCXSY2vZkSmxXwofg6FGBYo",
    libraries: "places",
  }
});
const routes = [
  {
    path: "/",
    name: "Contents",
    component: Contents,
  },
  {
    path: "/houseInfo",
    name: "Service",
    component: Service,
    children: [
      {
        path: ":dong",
        name: "board-update",
        component: Service
      },
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    name: "Board",
    path: "/board",
    component: Board,
    children: [
      {
        path: "",
        name: "board-main",
        component: () => import("@/components/Board/BoardTable.vue")
      },
      {
        path: "create",
        name: "board-create",
        component: () => import("@/components/Board/BoardCreate.vue")
      },
      {
        path: ":no",
        name: "board-detail",
        component: () => import("@/components/Board/BoardDetail.vue")
      },
      {
        path: "update/:no",
        name: "board-update",
        component: () => import("@/components/Board/BoardUpdate.vue")
      },
    ]
  },
  {
    name: "User",
    path: "/user",
    component: User,
    children: [
      {
        path: "create",
        name: "user-create",
        component: () => import("@/components/User/UserCreate.vue")
      },
      {
        path: "detail",
        name: "user-detail",
        component: () => import("@/components/User/UserDetail.vue")
      },
      {
        path: "update/:id",
        name: "user-update",
        component: () => import("@/components/User/UserUpdate.vue")
      },
      {
        path: "searchpass",
        name: "user-search-pass",
        component: () => import("@/components/User/UserSearchPass.vue")
      },
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
