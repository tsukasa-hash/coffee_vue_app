import { createRouter,createWebHistory } from 'vue-router';
import Home from './views/Home.vue'
import TopPage from './components/TopPage.vue' 
import MethodRegister from './components/MethodRegister.vue'
import MethodDetailViewer from './components/MethodDetailViewer.vue'
import MethodListViewer from './components/MethodListViewer.vue'

const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
        path: '/top',
        name: 'top',
        component: TopPage
    },
    {
        path: '/method_register',
        name: 'method_register',
        component: MethodRegister
    },
    {
        path: '/method_detail_viewer',
        name: 'method_detail_viewer',
        component: MethodDetailViewer
    },
    {
        path: '/method_list_viewer',
        name: 'method_list_viewer',
        component: MethodListViewer
    },
]

const router = createRouter({
    history: createWebHistory(), // HTML5 History モード
    routes,
})
 
export default router;