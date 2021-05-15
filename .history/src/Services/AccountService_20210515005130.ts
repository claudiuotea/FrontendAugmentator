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
      let accessToken = window.localStorage.getItem('AccessToken')
      console.log("Sunt in checkAdmin si primesc token " + accessToken)
      let config = {
         headers: {
            "Authorization": `Bearer ${accessToken}`
         }
       }
      return axios.get(`${AccountService.BASE_URL}/checkadmin`, config)
   }

   //verifica daca token-ul e valid, daca nu e valid, utilizeaza refresh token ca sa primeasca un token nou
   static refreshToken = () : void =>{
      let refreshToken = window.localStorage.getItem('RefreshToken')

      let config = {
         headers: {
            "Authorization": `Bearer ${refreshToken}`
         }
       }
      axios.post(`${AccountService.BASE_URL}/refresh`,{}, config).then(resp =>{
         localStorage.removeItem('RefreshToken')
         console.log("Am primit frumusetea asta " + resp.data.access_token)
         localStorage.setItem('RefreshToken',resp.data.access_token)
      })
   }

   static logout = () : void =>{
      localStorage.removeItem('RefreshToken')
      localStorage.removeItem('AccessToken')
   }
   
}