import { createWebHistory, createRouter } from "vue-router";
import App from '../App.vue'
import Login from '../pages/Login.vue'
import Main from '../pages/Main.vue'
import PageNotFound from '../pages/NotFound.vue'
import Dashboard from '../pages/Dashboard.vue'
import Assignment from '../pages/Assignment.vue'
import AssignmentList from '../pages/AssignmentList.vue'
import VocabularyList from '../pages/VocabularyList.vue'
import { useUserState } from "../stores/user.js";

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            requireAuth: false
        }
    },
    {
        path: "/",
        name: "main",
        component: Main,
        meta: {
            requireAuth: true
        },
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: Dashboard,
            },
            {
                path: 'assignments',
                name: 'assignments',
                component: AssignmentList,
            },
            {
                path:'assignments/create',
                name : 'assignment-create',
                component:  Assignment
            },
            {
                path:'assignments/:id',
                name : 'assignment-update',
                component:  Assignment
            },
            {
                path: 'vocabulary',
                name : 'vocabulary-list',
                component: VocabularyList
            }
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
async function checkAuth() {
    const userStore = useUserState();
    return !!userStore.user;
}
// 인증을 필요로 하는 라우트 페이지
router.beforeEach(async (to, from, next) => {
    const isAuthed = await checkAuth();
    const isLoginPage = to.name === 'login'
    const requireAuth = to.meta.requireAuth
    if (isLoginPage && isAuthed) {
        return next({ name: 'main' })
    }
    if (!isLoginPage && requireAuth && !isAuthed) { // 
        next({ name: 'login' })
    } else {
        next()
    }
})


export default router;