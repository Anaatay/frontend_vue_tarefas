import { createRouter, createWebHistory } from 'vue-router';
import Ecommerce from '../components/Ecommerce.vue';
import ItemTarefa from '../components/ItemTarefa.vue';
import App from '../App.vue';



const routes = [
    {
    path: '/',
    name: 'App',
    component: App,
    },
    {
    path: '/produtos',
    name: 'produtos',
    component: Ecommerce,
    },
    {
    path: '/tarefasavancada',
    name: 'tarefasavancada',
    component: ItemTarefa,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
