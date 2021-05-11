import axios from "axios"

export interface LoginInterface{
   username: string,
   password: string
}

export interface RegisterInterface {
   username: string;
   password: string;
   email: string;
 }

 export interface ForgotPasswordInterface{
    email: string;
 }

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
}