
<script setup>

import { reactive,ref } from "vue";
import { useCookies } from "vue3-cookies";
import { inject } from 'vue'
import apiService from '@/services/apiService';
import { sessionTime } from '@/globalProperties.js';
import { useRouter } from "vue-router";
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
const logError = inject('logError')
const { cookies } = useCookies();

const valid=ref(true)
const loading=ref(false)
const showApiAlert = ref(false);
const apiError = ref('')

const form=reactive({
  email: "",
  password: ""
});


const emailRules = [
  v => !!v || 'Email is required',
  v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
 
]

const passwordRules= [
  v => !!v || 'Password is required',
  v => v.length >= 6 || 'Password must be at least 6 characters'
]


 
function showError(message){
  showApiAlert.value=true
  apiError.value = message
  
  setTimeout(() => {
    showApiAlert.value=false
    apiError.value=''
  }, 3000);
  
  return true;
}

 
async function startResetPassword() {
  
  if(form.email === ''){
    showError( 'Please enter email')
    return;
  }
  
  // make api request
  loading.value=true;
  try{
    
    const resultDb =  await apiService.makePublicCall(
      'homeStartResetPassword',
      {
        email: form.email
      }
    )
    loading.value=false;
    if(!resultDb || !resultDb.data.result){
        
        showError( 'Something went wrong, Please try again')
        return;
        
    }

    store.dispatch('login', form.email)
    router.push({ path: '/resetpass'})
     

  }
  catch(e){
    loading.value=false;
    showError('Something went wrong, Please try again')
    logError(e)
  }
  

}
 



async function handleSubmit() {
  // make api request
  loading.value=true;
  try{
    
    const resultDb =  await apiService.makePublicCall(
      'homelogin',
      {
        email: form.email,
        password: form.password
      }
    )
    loading.value=false;
    if(!resultDb || !resultDb.data.result){
        
        showError( 'Please check your details and try again')
        return;
        
    }

    store.dispatch('login', form.email)
    if(resultDb.data.code){ // client needs to enter code
        router.push({ path: '/code'})
        return;
    }

    const token = resultDb.data.data.token;
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + (sessionTime * 60 * 60 * 1000));
    
    cookies.set("jwtToken", token,expirationDate);
    router.push({path: 'dashboard'});

  }
  catch(e){
    loading.value=false;
    showError('Something went wrong, Please try again')
    logError(e)
  }
  

}



</script>

<template>
    <v-container fluid>
      <v-card class="pa-4 ma-auto" >
        <v-form  v-model="valid" lazy-validation>
          <v-text-field
            label="Email"
            v-model="form.email"
            :rules="emailRules"
            required
            outlined
            dense
          ></v-text-field>
  
          <v-text-field
            label="Password"
            v-model="form.password"
            :rules="passwordRules"
            type="password" 
            required
            outlined
            dense
          ></v-text-field>
           
          <v-spacer class="mb-12"></v-spacer>
          
         <a class="resend_anchor"  @click.prevent="startResetPassword"> Forgot password ? </a>
         <v-spacer class="mb-2"></v-spacer>
          <v-btn
            :disabled="!valid"
            :loading="loading"
            color="primary"
            class="form_btn full-width"
            @click="handleSubmit"
          >
           Login
          </v-btn>
          <v-alert
          class="alert_tag"
          
          :max-height="50"
          :model-value="showApiAlert"
          
          >
            {{ apiError }}
          </v-alert>
          
        </v-form>
      </v-card>
    </v-container>
  </template>

<style scoped>
    .full-width {
      width: 100%;
    }
  </style>
  