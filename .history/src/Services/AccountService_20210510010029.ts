import axios from "axios"
import { RegisterInterface } from "../Components/Register"

export interface LoginInterface{
   username: string,
   password: string
}

export default class AccountService{
   private static readonly BASE_URL: string = "http://127.0.0.1:5000"

   static login = (data: LoginInterface) : Promise<any> =>{
      return axios.get(`${AccountService.BASE_URL}/login`, {
         auth: data
   })}

   static register = (data:RegisterInterface) : Promise<any> =>{
      return axios.post(`${AccountService.BASE_URL}/user`,data, {
         headers: { 'Content-Type': 'application/x-www-form-urlencoded'
     })
   }
}