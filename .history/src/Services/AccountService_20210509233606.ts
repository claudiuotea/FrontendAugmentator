import axios from "axios"

interface LoginInterface{
   username: string,
   password: string
}

export default class AccountService{
   private static readonly BASE_URL: string = "http://127.0.0.1:5000"

   static login = (data: LoginInterface) : Promise<any> =>{
      return axios.post(`${AccountService.BASE_URL}/login`, {}, {
         auth: data
   })}
}