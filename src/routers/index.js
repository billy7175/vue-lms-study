import { createWebHistory, createRouter } from "vue-router";
import App from "../App.vue";
import Login from "../pages/Login.vue";
import Main from "../pages/Main.vue";
import PageNotFound from "../pages/NotFound.vue";
import Dashboard from "../pages/Dashboard.vue";
import Assignment from "../pages/Assignment.vue";
import AssignmentList from "../pages/AssignmentList.vue";
import VocabularyList from "../pages/VocabularyList.vue";
import Vocabulary from "../pages/Vocabulary.vue";
import Student from "../pages/student/Student.vue";
import StudentDetail from "../pages/student/StudentDetail.vue";
import StudentList from "../pages/student/StudentList.vue";
import PayManagement from "../pages/PayManagement/PayManagement.vue";
import CasualTalk from '../pages/CasualTalk.vue'
import { useUserState } from "../stores/user.js";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      requireAuth: false,
    },
  },
  {
    path: "/",
    name: "main",
    component: Main,
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: {
          breadcrumbs: [{ label: "Dashboard", name: "dashboard" }],
        },
      },
      {
        path: "casualtalk",
        name: "casualtalk",
        component: CasualTalk,
        meta: {
          breadcrumbs: [{ label: "Dashboard", name: "dashboard" }],
        },
      },
      {
        path: "play",
        name: "",
        component :Dashboard,
        meta: {
          breadcrumbs: [{ label: "Dashboard", name: "dashboard" }],
        }
      },
      {
        path: "assignments",
        name: "assignments",
        component: AssignmentList,
        meta: {
          breadcrumbs: [{ label: "Assignment", name: "assignments" }],
        },
      },
      {
        path: "assignments/create",
        name: "assignment-create",
        component: Assignment,
      },
      {
        path: "assignments/:id",
        name: "assignment-update",
        component: Assignment,
        meta: {
          breadcrumbs: [
            { label: "Assignment", name: "assignments" },
            { label: "Assignment-Detail", name: "assignment-update" },
          ],
        },
      },
      {
        path: "vocabulary",
        name: "vocabulary",
        component: VocabularyList,
        meta: {
          breadcrumbs: [{ label: "Vocabulary", name: "vocabulary-list" }],
        },
      },
      {
        path: "vocabulary/:id",
        name: "vocabulary-detail",
        component: Vocabulary,
        meta: {
          breadcrumbs: [
            { label: "Vocabulary", name: "vocabulary" },
            { label: "Vocabulary-Detail", name: "vocabulary-detail" },
          ],
        },
      },
      {
        path: "vocabulary/create",
        name: "vocabulary-create",
        component: Vocabulary,
      },
      {
        path: "students",
        name: "students",
        component: Student,
        redirect: {
          name: "student-list",
        },
        children: [
          {
            path: "",
            name: "student-list",
            component: StudentList,
            meta: {
              breadcrumbs: [{ label: "Students", name: "student-list" }],
            },
          },
          {
            path: "/:id",
            name: "student-detail",
            component: StudentDetail,
            meta: {
              breadcrumbs: [
                { label: "Students", name: "student-list" },
                { label: "Student-Detail", name: "student-detail" },
              ],
            },
          },
        ],
      },
      {
        path: "pay-management",
        name: "pay-management",
        component: PayManagement,
        meta: {
          breadcrumbs: [{ label: "Payment", name: "pay-management" }],
        },
      },
    ],
  },
  {
    path: "/mypage", // TestComponent.vue로 이동할 Path
    name: "mypage", // router name
    component: App, // Path로 이동될 Component
  },
  { path: "/:pathMatch(.*)*", component: PageNotFound },
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
  const isLoginPage = to.name === "login";
  const requireAuth = to.meta.requireAuth;
  if (isLoginPage && isAuthed) {
    return next({ name: "main" });
  }
  if (!isLoginPage && requireAuth && !isAuthed) {
    //
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
