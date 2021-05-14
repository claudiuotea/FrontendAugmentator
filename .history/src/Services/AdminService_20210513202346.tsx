import axios from "axios"

export default class AdminService{
   private static readonly BASE_URL: string = "http://127.0.0.1:5000"

   //preia userii
   static getUsers = (token:string) : Promise<any> =>{
      let config = {
         headers: {
            'x-access-token': token
         }
       }
      return axios.get(`${AdminService.BASE_URL}/user`, config)
   }
   
}