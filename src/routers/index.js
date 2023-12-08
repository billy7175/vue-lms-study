import { createWebHistory, createRouter } from "vue-router";
import App from '../App.vue'
import Login from '../pages/Login.vue' 
import Main from '../pages/Main.vue'
import PageNotFound from '../pages/NotFound.vue'
import Dashboard from '../pages/Dashboard.vue'
import Assignment from '../pages/Assignment.vue'

const routes = [
    {
        path: "/",
        name: "login",
        component: Login,
    },
    {
        path: "/main",
        name: "main",
        component: Main,
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: Dashboard,
            },
            {
                path: 'assignments',
                name:'assignments',
                component: Assignment,
            },
        ],
    },
    {
        path: "/mypage",  // TestComponent.vue로 이동할 Path
        name: "mypage",  // router name
        component: App,  // Path로 이동될 Component
    },
    { path: '/:pathMatch(.*)*', component: PageNotFound },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});


export default router;