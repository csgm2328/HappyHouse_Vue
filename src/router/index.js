import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";
import VueRouter from "vue-router";
import Contents from "../page/Contents.vue";
import Service from "../page/Service.vue";
import Login from "../page/Login.vue";
import Board from "../page/Board.vue";
import User from "../page/User.vue";
import HouseChart from "../page/HouseChart.vue";
import HousePick from "../page/HousePick.vue";

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
        path: "",
        name: "house-deal-search",
        component: ()=> import("@/components/HouseDeal/HouseSearch.vue")
      },
      {
        path: ":no",
        name: "house-deal-detail",
        component: ()=> import("@/components/HouseDeal/HouseDetail.vue")
      },
      {
        path: "apt/:dong/:AptName",
        name: "house-apt-detail",
        component: ()=> import("@/components/HouseDeal/HouseAptSearch.vue")
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
        path: "search/:title",
        name: "board-search",
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
        path: "view/:id",
        name: "user-view",
        component: () => import("@/components/User/UserView.vue")
      },
      {
        path: "searchpass",
        name: "user-search-pass",
        component: () => import("@/components/User/UserSearchPass.vue")
      },
    ]
  },
  {
    name: "HouseChart",
    path: "/houseChart",
    component: HouseChart,
  },
  {
    name: "HousePick",
    path: "/housePick",
    component: HousePick,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;