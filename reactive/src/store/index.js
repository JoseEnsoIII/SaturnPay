import { createStore } from 'vuex'
import { defaultFiatCur,defaultCryptoCur,defaultOrderType } from '@/globalProperties.js';

export default createStore({
    state: {

      currentOrder: {
        fiatCur: defaultFiatCur,
        cryptoCur: defaultCryptoCur,
        orderType: defaultOrderType,
        orderAmount: null,
        orderValue: null,
        orderReference: null,
        orderWallet: null
      },


      userDetails: {
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postal: '',
        country: ''
      },
      
      username: null,

      clientName: '',
      
      lastScreen: null,
      
      ratesArray: [],

      selectedBank: {},
      
      selectedPsp: {},

      banksArray: [],
      
      pspArray: [],

      altMethodArray: [],

      userGross:{
        pendingBalance: 0
      }


    },
    mutations: {
      setUsername(state, username) {
        state.username = username
      },
      setClientName(state, clientName) {
        state.clientName = clientName
      },
      setLastScreen(state, screen) {
        state.lastScreen = screen
      },
      setRatesArray(state,ratesArray){
         
        state.ratesArray=ratesArray
      },
      setBanksArray(state,banksArray){
       
        state.banksArray=banksArray
      },
      setPspArray(state,pspArray){
        state.pspArray=pspArray
      },
      setAltMethodArray(state,altMethodArray){
        state.altMethodArray=altMethodArray
      },
      insertCurrentOrder(state,orderObj){
        state.currentOrder=orderObj
      },
      setCurrentOrder(state,updateObj){
        const keyName = updateObj.keyName;
        const valName = updateObj.valName;
        state.currentOrder[keyName] = valName;
         
         
      },
      resetCurrentOrder(state){
        state.currentOrder={
          fiatCur: defaultFiatCur,
          cryptoCur: defaultCryptoCur,
          orderType: defaultOrderType,
          orderAmount: null,
          orderValue: null,
          orderReference: null,
          orderWallet: null}
         
          localStorage.removeItem('lastOrder');
      }
    },
    actions: {
      login({ commit }, username) {
    
        commit('setUsername', username);

      },
      
      setLastScreen({ commit }, screen) {
      
        commit('setLastScreen', screen);

      },
      setClientName({ commit }, clientName) {
      
        commit('setClientName', clientName);

      },

      setRatesArray({ commit }, ratesArray) {
     
        commit('setRatesArray', ratesArray);

      },

      setBanksArray({ commit }, banksArray) {
     
        commit('setBanksArray', banksArray);

      },
      setAltMethodArray({ commit }, altMethodArray) {
     
        commit('setAltMethodArray', altMethodArray);

      },
      
      setPspArray({ commit }, pspArray) {
     
        commit('setPspArray', pspArray);

      },
      resetCurrentOrder({ commit }) {
     
        commit('resetCurrentOrder');

      },
      setCurrentOrder({ commit }, updateObj) {
     
        commit('setCurrentOrder', updateObj);

      },
      
      insertCurrentOrder({ commit }, orderObj) {
     
        commit('insertCurrentOrder', orderObj);

      },
     

      
    },
    
    modules: {
      // Other modules if needed
    }
  })