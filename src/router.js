import { createRouter,createWebHistory } from 'vue-router';
import Home from './views/Home.vue'
import TopPage from './components/TopPage.vue' 
import MethodRegister from './components/MethodRegister.vue'

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
]

const router = createRouter({
    history: createWebHistory(), // HTML5 History モード
    routes,
})
 
export default router;