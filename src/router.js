import VueRouter from "vue-router";
import Acc from "./components/pages/Account";
import Home from "./components/pages/Home";

export default new VueRouter({
    routes:[
        {
            path: '/',
            component: Home
        },
        {
            path: '/user/:id',
            component: Acc,
            name: 'userId',
            props: true
        }
    ],
    mode: 'history'
})