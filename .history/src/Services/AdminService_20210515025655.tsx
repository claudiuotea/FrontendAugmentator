import axios from "axios"
import { UserDataInterface } from "../Models/Interfaces"

export default class AdminService{
   private static readonly BASE_URL: string = "http://127.0.0.1:5000"

   //preia userii
   static getUsers = () : Promise<any> =>{
      let accessToken = window.localStorage.getItem('AccessToken')
      let config = {
         headers: {
            "Authorization": `Bearer ${accessToken}`
         }
       }
      return axios.get(`${AdminService.BASE_URL}/user`, config)
   }

   //sterge un user
   static removeUser = (public_id:string) : Promise<any> =>{
      let accessToken = window.localStorage.getItem('AccessToken')
      let config = {
         headers: {
            "Authorization": `Bearer ${accessToken}`
         }
       }
      return axios.delete(`${AdminService.BASE_URL}/user/${public_id}`,config)
   } 

   //promoveaza un user la admin
   static promoteUser = (public_id:string) : Promise<any> =>{
      let accessToken = window.localStorage.getItem('AccessToken')
      let config = {
         headers: {
            "Authorization": `Bearer ${accessToken}`
         }
       }
      return axios.put(`${AdminService.BASE_URL}/user/${public_id}`,{},config)
   } 

   //verifica un user
   static verifyUser = (public_id:string) : Promise<any> =>{
      let accessToken = window.localStorage.getItem('AccessToken')
      let config = {
         headers: {
            "Authorization": `Bearer ${accessToken}`
         }
       }
      return axios.put(`${AdminService.BASE_URL}/verifybyadmin`,{"public_id":public_id},config)
   } 
   
}