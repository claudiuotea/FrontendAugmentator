import axios from "axios"
import { UserDataInterface } from "../Models/Interfaces"

export default class AdminService{
   private static readonly BASE_URL: string = "http://127.0.0.1:5000"

   //preia userii
   static getUsers = () : Promise<any> =>{
      let accessToken = window.localStorage.getItem('AccessToken')

      console.log("Sunt in getUsers si primesc token " + accessToken)
      let config = {
         headers: {
            "Authorization": `Bearer ${accessToken}`
         }
       }
      return axios.get(`${AdminService.BASE_URL}/user`, config)
   }

   //sterge un user
   static removeUser = (public_id:string) : Promise<any> =>{
      return axios.delete(`${AdminService.BASE_URL}/user/${public_id}`)
   } 
   
}