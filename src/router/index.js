import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EjerciciosView from "@/views/EjerciciosView";
import TodasLasRutinas from "@/views/TodasLasRutinas";
import MisRutinasView from "@/views/MisRutinasView";
import IniciarSesionView from "@/views/IniciarSesionView";
import RegistrarseView from "@/views/RegistrarseView";
import PerfilView from "@/views/PerfilView";
import RutinaView from "@/views/RutinaView";
import CiclosRutina from "@/components/CiclosRutina";
import EjerciciosCiclo from "@/components/EjerciciosCiclo";
import ExerciseDisplay from "@/components/ExerciseDisplay";

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
    component: EjerciciosView,
    children: [
      {
        path: ':exercise_id',
        props: true,
        component: ExerciseDisplay
      }
    ]
  },
  {
    path: '/todas_las_rutinas',
    name: 'todas_las_rutinas',
    component: TodasLasRutinas
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
  },
  {
    path: '/rutina/:id',
    component: RutinaView,
    children: [
      {
        path: '',
        name: 'routine',
        props: true,
        component: CiclosRutina,
        children: [
          {
          path: 'ciclo/:cycleId', 
          name:'cycle', 
          props: true, 
          component: EjerciciosCiclo
        }]
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
