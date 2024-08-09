


<script setup>

import { ref } from "vue";
import { useRouter } from "vue-router";


const router = useRouter()


const secondTimer = ref(5);

setInterval(() => {
    const currentVal = secondTimer.value;
    if(currentVal>=1){
        secondTimer.value= currentVal - 1
    }
    else{
        router.push({path: 'login'})
    }
}, 1000);


 
 

 


</script>
<template>
    <v-container fluid>
        <v-card class="py-8 px-6 text-center mx-auto ma-4" max-width="400">
            <h1>Success!</h1>

            
            <v-spacer class="mb-14"></v-spacer>
            <div class="text-body-2">
                You will be redirected to login page in {{ secondTimer }} seconds
            </div>
            <v-spacer class="mb-8"></v-spacer>
            <v-btn
            
            :loading="loading"
            color="primary"
            class="form_btn"
            @click="router.push({path: 'login'})"
          >
           Login
          </v-btn>
        </v-card>
    </v-container>
</template>

  
  <style scoped>
  .v-card {
    background-color: #0F051D;
    border: 0.5px solid transparent; /* Set border color to transparent */
    border-radius: 4px; /* Optional: Add border radius for rounded corners */
    color: white;
    box-shadow: 0 0 2.4px rgba(255, 255, 255, 0.5);
    max-height: 300px;
  }

  .v-text-field{
    background-color: transparent;
  }

  .alert_tag{
    text-align: center;
    opacity: 0.8;
    background-color: #510000;
  }
 

  
  
  .v-btn {
    width: 100%;
  }
  </style>
  