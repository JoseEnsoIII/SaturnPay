<script setup>

import {  RouterView } from "vue-router";
import {  provide } from "vue";
import apiService from '@/services/apiService';
import { useStore } from 'vuex';

const store = useStore();


const logError = async (error)=>{

    console.log('got error: ',error);
    
    const resultDb =  await apiService.logErrorApi({error: error})
}

const formatAmount = async (amount,decimals)=>{

    return (Math.round(amount * Math.pow(10, decimals)) / Math.pow(10, decimals)).toFixed(decimals);

    
}

const numberWithCommas = async (amount)=>{

    return amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");


}

const randomString = async (length)=>{

    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;


}

 

 const openWindow = async (target)=>{
     
     window.open(target, '_blank');
     return true;
 }

 const setLocalStorage = async (keyName,data)=>{
     localStorage.removeItem(keyName);
     localStorage.setItem(keyName, data);
     return true;
 }


 const removeLocalStorage = async (keyName)=>{
     
    localStorage.removeItem(keyName);
    return true;
 }

 const getLocalStorage = async (keyName)=>{
     
     const item = localStorage.getItem(keyName);
     return item || false;
 }

const copyToClipboard = async (text)=>{
     
    navigator.clipboard.writeText(text)
    return true;


}

const resetCurrentOrder = async ()=>{
    
    store.dispatch('resetCurrentOrder')
    return true;
 
 
 }


//

 

const checkWalletValidity = async (currency,address)=>{
 
    const p2pkhRegex = /^[1][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
    const p2shRegex = /^[3][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
    const bech32Regex = /^bc1[a-z0-9]{25,39}$/;
    
    let isValid;
    
    switch(currency){
        case 'btc':
            
            isValid = p2pkhRegex.test(address) || p2shRegex.test(address) || bech32Regex.test(address)
            return isValid;
        case 'eth':
        case 'avax':
        case 'usdc':
        case 'usdt':
            console.log(/^0x[a-fA-F0-9]{40}$/.test(address))
            return /^0x[a-fA-F0-9]{40}$/.test(address);

        
        case 'xrp':
            return /^r[1-9A-HJ-NP-Za-km-z]{24,34}$/.test(address);
        
        case 'dot':
            return /^1[a-km-zA-HJ-NP-Z1-9]{46,47}$/.test(address);

        case 'eos':
            return /^[a-z1-5]{12}$/.test(address);

        case 'ada':
            return /^addr1[0-9a-z]{58}$/.test(address);
            
        default:
            return false;
    }

    


} 


 
provide('logError', logError);
provide('openWindow', openWindow);
provide('formatAmount', formatAmount);
provide('numberWithCommas', numberWithCommas);
provide('checkWalletValidity', checkWalletValidity);
provide('copyToClipboard', copyToClipboard);
provide('resetCurrentOrder', resetCurrentOrder);
provide('setLocalStorage', setLocalStorage);
provide('getLocalStorage', getLocalStorage);
provide('removeLocalStorage', removeLocalStorage);
provide('randomString', randomString);
 

</script>

<template>
   
 
  <v-app class="fill-height">


    
        <RouterView  />
  


   </v-app>
</template>


<style>

 

</style>
