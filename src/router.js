import { createRouter,createWebHistory } from 'vue-router';
import TopPage from './components/TopPage.vue' 

const routes = [
    { path: '/top', name: 'top', component: TopPage}
]

const router = createRouter({
    history: createWebHistory(), // HTML5 History モード
    routes,
})
 
export default router;