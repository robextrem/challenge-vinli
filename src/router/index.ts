/* Listado de componentes */
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../store/modules/user'
import Login from '../pages/Login.vue'
import Home from '../pages/Home.vue'
import Fleet from '../pages/Fleet.vue'
import PageNotFound from '../pages/PageNotFound.vue'
/* Rutas de componentes*/
const routes = [
  { 
    path: '/', 
    redirect: () => {
      return { path: '/login' }
    },
  },
  { 
    path: '/login', 
    name: 'login', 
    component: Login 
  },
  { 
    path: '/home', 
    name: 'home', 
    component: Home,
    meta:{
      requiresAuth: true
    } 
  },
  { 
    path: '/fleet', 
    name: 'fleet', 
    component: Fleet,
    meta:{
      requiresAuth: true
    } 
  },
  { path: '/:pathMatch(.*)*', component: PageNotFound },
]

const history = createWebHistory()

const router = createRouter({
  history,
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach(async (to, from, next) => {
  const ukey = JSON.parse(sessionStorage.getItem(import.meta.env.VITE_APP_STORAGE_KEY) || '{}')

  if(from.name == null){
    if(Object.keys(ukey).length === 0){
      console.log("es nulo")
      const store = useUserStore()
      await store.hasSession()
      // router.go(0)
    }
  }

  if (to.meta.requiresAuth) {
    if (ukey?.user) {
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
