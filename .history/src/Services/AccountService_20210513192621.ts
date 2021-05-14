import axios from "axios"
import { ForgotPasswordInterface, LoginInterface, RegisterInterface, ResetPasswordInterface, VerfiyAccountInterface } from "../Models/Interfaces"


export default class AccountService{
   private static readonly BASE_URL: string = "http://127.0.0.1:5000"

   static login = (data: LoginInterface) : Promise<any> =>{
      return axios.get(`${AccountService.BASE_URL}/login`, {
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
   static checkAdmin = (token:string) : Promise<Boolean> =>{
      let config = {
         headers: {
            'x-access-token': token
         }
       }
      return axios.get(`${AccountService.BASE_URL}/checkadmin`, config)
   }
   
}