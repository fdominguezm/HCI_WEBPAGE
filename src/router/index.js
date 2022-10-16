import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EjerciciosView from "@/views/EjerciciosView";
import CrearRutinaView from "@/views/CrearRutinaView";
import MisRutinasView from "@/views/MisRutinasView";
import IniciarSesionView from "@/views/IniciarSesionView";
import RegistrarseView from "@/views/RegistrarseView";
import PerfilView from "@/views/PerfilView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/ejercicios',
    name: 'ejercicios',
    component: EjerciciosView
  },
  {
    path: '/crear_rutina',
    name: 'crear_rutina',
    component: CrearRutinaView
  },
  {
    path: '/mis_rutinas',
    name: 'mis_rutinas',
    component: MisRutinasView
  },
  {
    path: '/iniciar_sesion',
    name: 'iniciar_sesion',
    component: IniciarSesionView
  },
  {
    path: '/registrarse',
    name: 'registrarse',
    component: RegistrarseView
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: PerfilView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
