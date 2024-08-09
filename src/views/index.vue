<script setup>


import welcome from "@/components/homeView/welcome.vue";
import HomeView from "@/components/homeView/HomeView.vue";
import { sheetBackgroundColor, mainTextColor, vCardBackgroundColor } from '@/globalProperties.js';
import { useRoute, RouterLink } from "vue-router";
import { ref, watch } from 'vue';



const isLoggedIn = ref(false);

const route = useRoute();
const currentComponent = ref(getComponentToPresent(route.meta.component));


watch(route, (newRoute) => {
  // Update the componentName based on the new route's meta
  //console.log('route changed!: ',newRoute.meta.component)
  currentComponent.value = getComponentToPresent(newRoute.meta.component);
});



function getComponentToPresent(metaComponentVal) {
  if (!metaComponentVal)
    return false;

  switch (metaComponentVal) {



    case 'home':
    case 'signUp':
      if (!isLoggedIn.value) {
        return 'signUp';
      }
      else {
        return 'homeLogged'
      }
    default:
      return metaComponentVal;

    //break;

  }

}

</script>

<template>
  <v-sheet :color="sheetBackgroundColor" class="fill-height">
    <v-container class="fill-height d-flex align-center">
      <v-row justify="center" align="center" height="38.33%">
        <v-col cols="6" class="mx-auto fill-height flex-grow-1">
          <header>
            <div>
              <welcome />
              <v-spacer class="mb-6"></v-spacer>
              <nav>
                <div v-if="!isLoggedIn">
                  <RouterLink to="/home">Home</RouterLink>
                  <RouterLink to="/signup">Sign Up</RouterLink>
                  <RouterLink to="/login">Login</RouterLink>

                </div>
                <div v-if="isLoggedIn">
                  <RouterLink to="/home">Home</RouterLink>
                  <RouterLink to="/dashboard">Dashboard</RouterLink>
                  <RouterLink to="/logout">Log Out</RouterLink>
                </div>
              </nav>
            </div>
          </header>
        </v-col>
        <v-col cols="6" class="mx-auto flex-grow-1" style="max-width: 700px;">
          <HomeView :componentName="currentComponent" />
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>
<style scoped>
/*

 #custom-sheet .sheetBox{
    background-image: 
    radial-gradient(ellipse at 20% 35%, rgba(84, 89, 95, 0.1), transparent),
    radial-gradient(ellipse 400px 500px  at 20% 20%, rgba(70, 60, 170, 0.3), transparent),
    radial-gradient(ellipse 300px 250px  at 80% 80%, rgba(70, 60, 170, 0.2), transparent);
  
    
    background-attachment: fixed;
    background-size: cover;
}
 */

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 3.2rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

nav {
  text-align: center;
  /* Adjusted to center the content */
  font-size: 1rem;
  padding: 1rem 0;
  margin-top: 1rem;
}

.resend_anchor {
  color: inherit;
  text-decoration: underline;
}


a,
a:visited,
a:hover,
a:active {
  color: inherit;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(312, 100%, 37%, 0.2);
    cursor: pointer;
  }
}

.v-card {
  background-color: v-bind(vCardBackgroundColor);
  border: 0.5px solid transparent;
  border-radius: 4px;
  color: v-bind(mainTextColor);
  box-shadow: 0 0 2.4px rgba(255, 255, 255, 0.5);
}

.v-text-field {
  background-color: transparent;
}

.alert_tag {
  text-align: center;
  opacity: 0.8;
  background-color: #510000;
}


.v-btn {
  width: 100%;
}

@media (max-width: 1280px) {
  nav a {
    padding: 0 2.8rem;
    /* Adjusted padding for smaller screens */
  }
}

@media (max-width: 980px) {
  nav a {
    padding: 0 2.5rem;
    /* Adjusted padding for smaller screens */
  }
}

@media (max-width: 820px) {
  nav a {
    padding: 0 2.5rem;
    /* Adjusted padding for smaller screens */
  }
}

@media (max-width: 800px) {
  nav a {
    padding: 0 2.1rem;
    /* Adjusted padding for smaller screens */
  }
}
@media (max-width: 735px) {
  nav a {
    padding: 0 1.8rem;
    /* Adjusted padding for smaller screens */
  }
}
@media (max-width: 700px) {
  nav a {
    padding: 0 1.3rem;
    /* Adjusted padding for smaller screens */
  }
}

@media (max-width: 620px) {
  nav a {
    padding: 0 1.1rem;
    /* Adjusted padding for smaller screens */
  }
}

@media (max-width: 550px) {
  nav a {
    padding: 0 0.5rem;
  }
}

@media (max-width: 420px) {
  nav a {
    padding: 0 0.2rem;
  }
}

@media (max-width: 400px) {
  nav a {
    padding: 0 0.2rem;
  }
}</style>