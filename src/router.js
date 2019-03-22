import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Asistencia from './views/Asistencia.vue'
import Login from './views/Login.vue'
import Cliente from './views/Cliente.vue'
import Soporte from './views/Soporte.vue'


Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/asistencia',
            name: 'Asistencia',
            component: Asistencia
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/cliente',
            name: 'Cliente',
            component: Cliente
        },
        {
            path: '/soporte',
            name: 'Soporte',
            component: Soporte
        }
    ]
})
