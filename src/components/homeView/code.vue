


<script setup>

import { reactive,ref } from "vue";
import { useCookies } from "vue3-cookies";
import { inject } from 'vue'
import apiService from '@/services/apiService';
import { sessionTime,sheetBackgroundColor,mainTextColor } from '@/globalProperties.js';
import { useRouter } from "vue-router";
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
const logError = inject('logError')
const username = store.state.username
const { cookies } = useCookies();

const valid=ref(false)
const loading=ref(false)
const resendMessage=ref("Code not received?");
const showApiAlert = ref(false);
const apiError = ref('')
const otp = ref('');

 
//console.log(username)


 
function showError(message){
  showApiAlert.value=true
  apiError.value = message
  
  setTimeout(() => {
    showApiAlert.value=false
    apiError.value=''
  }, 5000);
  
  return true;
}

 
async function submitOtp(){
  if(otp.value.length !== 5){
    return false;
  }

  valid.value=true;
  loading.value=true;
  try{
      
        
      const resultDb =  await apiService.makePublicCall(
      'verifycode',
      {
          email: username,
          code: otp.value
      }
      )
      loading.value=false;
      if(!resultDb || !resultDb.data.result){
          valid.value=false;
          showError( 'Seems like the wrong code. Please try again')
          return;
          
      }

      const token = resultDb.data.data.token;
      const expirationDate = new Date();
      expirationDate.setTime(expirationDate.getTime() + (sessionTime * 60 * 60 * 1000));
      
      cookies.set("jwtToken", token,expirationDate);
      router.push({path: 'dashboard'});
      

  }
  catch(e){
      valid.value=false;
      loading.value=false;
      showError('Something went wrong, Please try again')
      logError(e)
  }
  
}



async function onComplete(v){
  await submitOtp()
}

const handleInput = async (value) => {
  

  if(otp.value.length === 5){
    await submitOtp()
  }
};

 async function resendEmail(){
    otp.value='';

    loading.value=true;
    try{
        
         
        const resultDb =  await apiService.makePublicCall(
        'homeresendcode',
        {
            email: username
        }
        )
        loading.value=false;
        if(!resultDb || !resultDb.data.result){
            
            showError( 'Something went wrong, Please try again')
            return;
            
        }

        resendMessage.value="Code sent!"
        loading.value=false;
        

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
        <v-card class="py-8 px-6 text-center mx-auto ma-4" max-width="380">
            <h3>Verify Your Email</h3>

            <v-spacer class="spacer"></v-spacer>

            <div class="text-body-2">
               <!--We sent a verification code to {{ username }} <br>-->
                Please check your email and insert the code below.
            </div>
            <v-form>
            <v-otp-input
                v-model="otp"
                :length="5"
                @input="handleInput"
                @finish="onComplete"
            ></v-otp-input>
            
            <v-spacer class="spacer"></v-spacer>
            
            <v-btn
                :loading="loading"
                :disabled="!valid"
                color="primary"
                class="form_btn"
                height="40"
                text="Verify"
                variant="flat"
                 
             
            ></v-btn>
            <v-spacer class="mb-4"></v-spacer>
            <div class="text-caption">
                {{ resendMessage }} <a class="resend_anchor"  @click.prevent="resendEmail">Resend</a>
            </div>
            <v-alert
                class="alert_tag"
                
                :max-height="50"
                :model-value="showApiAlert">
                {{ apiError }}
            </v-alert>
          </v-form>
        </v-card>
    </v-container>
</template>

  
  <style scoped>
  .v-card {
    background-color: v-bind(sheetBackgroundColor);
    border: 0.5px solid transparent; /* Set border color to transparent */
    border-radius: 4px; /* Optional: Add border radius for rounded corners */
    color: v-bind(mainTextColor);
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

  .spacer{
    height: 15px;
  }

  .resend_anchor{
    text-decoration: underline;
  }

  @media (hover: hover) {
	.resend_anchor:hover {
        cursor: pointer; 
		background-color: hsla(312, 100%, 37%, 0.2);
	}
}

  
  
  .v-btn {
    width: 100%;
  }
  </style>
  