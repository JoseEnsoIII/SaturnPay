<script setup>

import { reactive,ref } from "vue";
import { inject } from 'vue'
import apiService from '@/services/apiService';
import { internalToken,termsUrl,privacyUrl } from '@/globalProperties.js';
import { useRouter } from "vue-router";
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
const logError = inject('logError')

const form = reactive({
email: "",
password: ""
});

const valid=ref(true)
const loading=ref(false)
const showApiAlert = ref(false);
const apiError = ref('')
const termsAccepted = ref(false)



function getParam(param){
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param) || false;
   
}



const emailRules = [
v => !!v || 'Email is required',
v => /.+@.+\..+/.test(v) || 'E-mail must be valid'

]

const passwordRules= [
v => !!v || 'Password is required',
v => v.length >= 6 || 'Password must be at least 6 characters'
]

const termsRules =  [
v => v || 'You must accept the terms and conditions',
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






async function handleSubmit() {
  // make api request
  loading.value=true;
  try{
    
    const resultDb =  await apiService.makePublicCall(
      'homesignup',
      {
        email: form.email,
        password: form.password,
        token: getParam('az') || internalToken
      }
    )
    loading.value=false;
    if(!resultDb ){
        
        showError( 'Please check your details and try again')
        return;
        
    }
    else if(!resultDb.data.result){
      switch(resultDb.data.error){
        case 'user already exists':
          showError( 'Email already registered, please login');
          return;
        default:
          showError( 'Please check your details and try again')
          return;
      }
    }

    store.dispatch('login', form.email)
    //store.dispatch('setLastScreen', 'signup')
    
        router.push({ path: '/code'})
        return;
    


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
  
            <v-checkbox
              v-model="termsAccepted"
              :rules="termsRules"
           
              required
              off-icon="mdi-checkbox-blank-outline"
              on-icon="mdi-checkbox-marked"
            >
            <template #label>
              <span>By checking this box, you agree to our <a class="resend_anchor" :href="termsUrl" target="_blank">terms and conditions</a> and <a class="resend_anchor" :href="privacyUrl">privacy policy</a> </span>
            </template> 
            </v-checkbox>
            <p  class="text-body-1">
                Already have an account? <a class="resend_anchor"  @click.prevent="router.push({ path: '/login'})">Login</a>
            </p>
         
            <v-spacer class="mb-4"></v-spacer>
            <v-btn
            class="full-width form_btn" 
            :disabled="!valid"
            :loading="loading"
            color="primary"
            @click="handleSubmit"
          >
           Sign Up
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