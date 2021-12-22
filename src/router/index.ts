import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// ====================== CAPTURAS ========================
const CaptureBiometryView = () => import('@/views/CaptureBiometryView.vue');
const BiometricLoginView = () => import('@/views/BiometricLoginView.vue');

const routes: Array<RouteRecordRaw> = [
    {
        path: '/register/:userCPF',
        component: CaptureBiometryView,
    },
    {
        path: '/login/:userCPF',
        component: BiometricLoginView,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});


export default router;
