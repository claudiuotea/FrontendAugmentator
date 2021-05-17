import axios from "axios"
import { MailInterface } from "../Models/Interfaces"


export default class UserService{
   private static readonly BASE_URL: string = "http://127.0.0.1:5000"

   //trimite la backend datele pentru a trimite mail
   static sendMail = (mail : MailInterface) : Promise<any> =>{
      let accessToken = window.localStorage.getItem('AccessToken')
      let config = {
         headers: {
            "Authorization": `Bearer ${accessToken}`
         }
       }
      return axios.post(`${UserService.BASE_URL}/contact`,{mail},config)
   } 
   
}