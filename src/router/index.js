import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
import VueRouter from "vue-router";
import Contents from "../page/Contents.vue";
import Service from "../page/Service.vue";
import Login from "../page/Login.vue";
import Board from "../page/Board.vue";
import BoardDetail from "../page/BoardDetail.vue";
import BoardCreate from "../page/BoardCreate.vue";
import BoardUpdate from "../page/BoardUpdate.vue";
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
    path: "/happyHouse/houseInfo/:dong",
    name: "Service",
    component: Service,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/board",
    name: "Board",
    component: Board,
  },
  {
    path: "/board/create",
    name: "BoardCreate",
    component: BoardCreate,
  },
  {
    path: "/board/:no",
    name: "BoardDetail",
    component: BoardDetail,
  },
  {
    path: "/board/update/:no",
    name: "BoardUpdate",
    component: BoardUpdate,
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
        path: "view",
        name: "user-view",
        component: () => import("@/components/User/UserView.vue")
      },
      {
        path: "modify/:id",
        name: "user-modify",
        component: () => import("@/components/User/UserModify.vue")
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
