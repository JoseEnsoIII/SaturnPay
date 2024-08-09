 
import axios from 'axios';
import { brandName } from '@/globalProperties.js';
import { errorLogUrl,companyName,companyAddress } from '@/globalProperties.js';
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
//const baseUrl = 'https://walletstore.club'
const baseUrl = 'http://localhost:3001'





export default {


  logErrorApi(dataBody) {

    const apiClient = axios.create({
      baseURL: `${baseUrl}`, 
    });

    dataBody.brandName=brandName;
    //dataBody.password=errorLogPass;

    return apiClient.post(
      errorLogUrl,
      dataBody
    
    );
  },

  makePublicCall(path,dataBody) {

    const apiClient = axios.create({
      baseURL: `${baseUrl}`, 
    });

    dataBody.brandName=brandName;


    switch(path){
      case 'homesignup':
      case 'homeresendcode':
      case 'homeStartResetPassword':
      case 'mplogin':
      
    
        dataBody.companyDetails = `${companyName} ${companyAddress}`;
      break;
      case 'orderEmailCreated':
        dataBody.emailData.companyDetails = `${companyName} ${companyAddress}`;
      break;

    }

    return apiClient.post(
      `/v1/public/${path}`,
      dataBody
    
    );
  },

  makeUserCall(path,dataBody,isGet) {

    const authToken = cookies.get('jwtToken');
    if(!authToken){
      return false;
    }


    const apiClient = axios.create({
      baseURL: `${baseUrl}`, 
      headers: {
        'Authorization': `Bearer ${authToken}`,  
      },
    });

    dataBody.brandName=brandName;
    
    if(!isGet){
      return apiClient.post(
        `/v1/user/${path}`,
        dataBody,
      
      );
    }
    else{
      return apiClient.get(
        `/v1/user/${path}`
      
      );
    }
    
  },
   



 
 
};
