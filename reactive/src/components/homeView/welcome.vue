<script setup>

import logoPng from "@/assets/logo.png";
import LogoSVG from "@/assets/logo.svg?component";
import { mainTextColor,secondaryTextColor,logoSrc } from '@/globalProperties.js';


 

defineProps({
  msg: {
    type: String,
    //required: true,
  },
});


const welcomeMessage = `Welcome to`


</script>

<template>
  <div class="greetings">
    <h1 class="welcome_header">{{ welcomeMessage }}</h1>

    <v-img v-if="logoSrc === 'png'"
      :src="logoPng"
      class="logo"
    />

    <LogoSVG v-if="logoSrc === 'svg'"
      class="logo"
    />
    
    <h3>
      Fast, Simple and Secure 
      Crypto Exchange
      
       
    </h3>
    
  </div>
</template>

<style scoped>

.welcome_header{
	 
   color: v-bind(mainTextColor);
    
 }

 .greetings {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center horizontally */
  justify-content: center; /* Center vertically */
}

.logo {
  margin: 0 0 2rem 0;
  width: 280px;
  height: 120px;
  display: flex;
  align-items: center; /* Center horizontally */
  justify-content: center; /* Center vertically */
}

h1 {
  font-weight: 500;
  font-size: 3rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
  color: v-bind(secondaryTextColor);
  font-weight: 400;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
