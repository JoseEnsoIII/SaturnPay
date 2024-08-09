<script setup>


import signUp from "@/components/homeView/signUp.vue";
import login from "@/components/homeView/login.vue";
import code from "@/components/homeView/code.vue";
import resetPass from "@/components/homeView/resetPass.vue";
import redirect from "@/components/homeView/redirect.vue";
import { ref, watchEffect,inject} from 'vue';

const props = defineProps({
  componentName: String
});


 

const resetCurrentOrder = inject('resetCurrentOrder')
const logError = inject('logError')

const components =  {signUp , login, code,resetPass,redirect}
const currentComponent = ref(props.componentName);

async function mainer(){
  try { 
    switch(currentComponent.value){    
      case 'logout':
          await resetCurrentOrder()
          document.cookie = "jwtToken= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
      
    }
  } catch (error) {
            await logError(error)
        }
        
}

mainer()

// React to changes in props.componentName
watchEffect(() => {
  currentComponent.value = props.componentName;
});
 
</script>

<template>
  <main>
    <component :is="components[currentComponent]" />
  </main>
</template>
 