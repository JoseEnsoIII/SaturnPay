


<script setup>

import { reactive,ref } from "vue";
import { inject } from 'vue'
import apiService from '@/services/apiService';
import { useRouter } from "vue-router";
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
const logError = inject('logError')
const username = store.state.username


const valid=ref(false)
const loading=ref(false)
const resendMessage=ref("Code not received?");
const showApiAlert = ref(false);
const apiError = ref('')
const otp = ref('')
const isTokenApproved = ref(false);

const form=reactive({
    password: ''
})





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
  }, 5000);
  
  return true;
}

 
async function submitResetPass(){
  if(otp.value.length !== 5){
    return false;
  }

  valid.value=true;
  loading.value=true;
  try{
      
        
      const resultDb =  await apiService.makePublicCall(
      'homeCompleteResetPassword',
      {
          email: username,
          code: otp.value,
          password: form.password
      }
      )
      loading.value=false;
      if(!resultDb || !resultDb.data.result){
          valid.value=false;
          showError( 'Seems like the wrong code. Please try again')
          return;
          
      }

      router.push({path: 'redirect'})
      

  }
  catch(e){
      valid.value=false;
      loading.value=false;
      showError('Something went wrong, Please try again')
      logError(e)
  }
  
}

async function checkToken(){
    if(otp.value.length !== 5){
        return false;
    }

    loading.value=true;
    try{
        
         
        const resultDb =  await apiService.makePublicCall(
        'homeCheckToken',
        {
            email: username,
            code: otp.value
        }
        )
        loading.value=false;
        if(!resultDb || !resultDb.data.result){
            
            showError( 'Seems like the wrong code. Please try again')
            return;
            
        }

        // hide otp element and show new password box
        setTimeout(() => {
            loading.value=false;
            isTokenApproved.value=true; 
        }, 1000);
        



    }
    catch(e){
        loading.value=false;
         
        showError('Something went wrong, Please try again')
        logError(e)
    }
}


async function onComplete(v){
  await checkToken()
}

const handleInput = async (value) => {
  

  if(otp.value.length === 5){
    await checkToken()
  }
};
 

 

 async function resendEmail(){
    otp.value='';

    loading.value=true;
    try{
        
         
        const resultDb =  await apiService.makePublicCall(
        'homeStartResetPassword',
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
        <v-card class="py-8 px-6 text-center mx-auto ma-4" max-width="400">
            <h3>Reset Your Password</h3>

            
            <v-spacer class="mb-1"></v-spacer>
            <div class="text-body-4">
                To choose a new password,
                Please check your email and insert the code below.
            </div>
            <v-spacer class="mb-4"></v-spacer>
            <v-form  v-model="valid" lazy-validation>

               
                <v-otp-input  v-if="!isTokenApproved"
                    v-model="otp"
                    :length="5"
                    @input="handleInput"
                    @finish="onComplete"
                ></v-otp-input>
                
                <v-spacer class="mb-1"></v-spacer>
                <v-text-field  v-if="isTokenApproved"
                    label="New Password"
                    v-model="form.password"
                    :rules="passwordRules"
                    type="password" 
                    required
                    outlined
                    dense
                ></v-text-field>
                <v-spacer class="spacer"></v-spacer>
                <v-btn
                    :loading="loading"
                    :disabled="!valid"
                    color="primary"
                    class="form_btn"
                    height="40"
                    text="Reset"
                    variant="flat"
                    width="100%"
                    @click="submitResetPass"
                ></v-btn>
                <v-spacer v-if="!isTokenApproved" class="mb-2"></v-spacer>
                <div v-if="!isTokenApproved" class="text-caption">
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

  
 