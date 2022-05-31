import Vue from 'vue'
import Router from 'vue-router'

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

Vue.use(Router)


export default new Router({
  routes: [
    { name: "Login", path: "/login", component: () => import('../views/login/Login')},
    {
      path: "/",
      component: () => import('../views/Main'),
      redirect: '/mainView',
      children: [
        {name: 'MainView',path: 'mainView',component: () => import('../views/main/MainView')},
        {name: 'ShowUser',path: 'showUser',component: ()=> import("../views/user/ShowUser")},
        {name: 'AddUser',path: 'addUser',component: ()=> import("../views/user/AddUser")},
        {name: 'UpdateUser',path: 'updateUser',component: ()=> import("../views/user/UpdateUser")},
      ]},
    {path: "*",name:"Error404",component:()=>import("../views/error/404")}
  ]
})
