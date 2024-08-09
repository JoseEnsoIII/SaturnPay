import { createRouter, createWebHistory } from "vue-router";
import index from "@/views/index.vue";
import { baseUrl } from '@/globalProperties.js';


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [

      /* HOME */

        {
          path: "/",
          name: "index",
          component: index,
          meta: { component: 'home' },
         
        },
        {
          path: "/login",
          name: "login",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          //component: () => import("../views/login.vue"),
          component: index,
          meta: { component: 'login' },
        },
        {
          path: "/home",
          name: "home",
          redirect: () => {
            window.location.href = baseUrl;
            return false; // Return false to prevent further navigation
          }
        },
        {
          path: "/signup",
          name: "signup",
          component: index,
          meta: { component: 'signUp' },
        },
        {
          path: "/code",
          name: "code",
          component: index,
          meta: { component: 'code' },
        },
        {
          path: "/resetpass",
          name: "resetpass",
          component: index,
          meta: { component: 'resetPass' },
        },
        {
          path: "/redirect",
          name: "redirect",
          component: index,
          meta: { component: 'redirect' },
        },

        
        
          

       

          
        
      ]
  }); 
  
  export default router;