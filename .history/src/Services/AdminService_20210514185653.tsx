import axios from "axios"

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
   
}