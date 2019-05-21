import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from "./store";
import { meta } from "ya-disk";

/* eslint-disable */

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/*',
      name: 'home',
      component: Home,
      props: true,
      beforeEnter(to, from, next) {

        let path = to.fullPath


        if (store.state.token) {
          meta.get(store.state.token, "disk:/", {}, function (res) {
            store.state.items = res._embedded.items;
            next()
          });
        } else if (to.hash) {
          store.state.token = /access_token=([^&]+)/.exec(to.hash)[1]
          meta.get(store.state.token, "disk:/", {}, function (res) {
            store.state.items = res._embedded.items;
            next('/')
          });
        } else {
          window.location.href = 'https://oauth.yandex.ru/authorize?response_type=token&client_id=caa05651a0df4eae9440359b57168fc0&redirect_uri=http://127.0.0.1:8080'
        }
      }
    }
  ]
});
