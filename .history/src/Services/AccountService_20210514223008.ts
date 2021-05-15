import axios from "axios"
import { ForgotPasswordInterface, LoginInterface, RegisterInterface, ResetPasswordInterface, VerfiyAccountInterface } from "../Models/Interfaces"


export default class AccountService{
   private static readonly BASE_URL: string = "http://127.0.0.1:5000"

   static login = (data: LoginInterface) : Promise<any> =>{
   
      return axios.get(`${AccountService.BASE_URL}/login`,  {
         auth: data
   })}

   static register = (data:RegisterInterface) : Promise<any> =>{
      
      return axios.post(`${AccountService.BASE_URL}/register`,data)
   }

   static forgotPassword = (data:ForgotPasswordInterface) : Promise<any> =>{
      return axios.post(`${AccountService.BASE_URL}/forgotpass`,data)
   }

   static resetPassword = (data:ResetPasswordInterface) : Promise<any> =>{
      //console.log(data)
      return axios.post(`${AccountService.BASE_URL}/resetpass`,data)
   }

   static verifyAccount = (data:VerfiyAccountInterface) : Promise<any> =>{
      return axios.post(`${AccountService.BASE_URL}/verifyaccount`,data)
   }

   
   //verifica daca user-ul este admin
   static checkAdmin = () : Promise<any> =>{
      console.log(document.cookie)
      return axios.get(`${AccountService.BASE_URL}/checkadmin`,{withCredentials: true})
   }
   static getCookie = (name:string) => {
      const value = `; ${document.cookie}`;

      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()!.split(';').shift();
    }
    
   static makeRequestWithJWT = async () =>{
      const options = {
         method: 'post',
         credentials: 'same-origin',
         headers: {
           'X-CSRF-TOKEN': AccountService.getCookie('csrf_access_token'),
         }
      }
   }

   static logout = () : Promise<any> =>{
      localStorage.setItem('isAuthenticated',"false")
      return axios.get(`${AccountService.BASE_URL}/logout`)
   }
   
}