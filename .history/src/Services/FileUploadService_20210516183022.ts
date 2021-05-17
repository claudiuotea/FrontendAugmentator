import axios from "axios";

export default class FileUploadService {
   private static readonly BASE_URL: string = "http://127.0.0.1:5000";

   //trimit la endpoint datele
   static uploadFile = (bodyFormData: FormData): Promise<any> => {
      let accessToken = window.localStorage.getItem('AccessToken')
      let config = {
         headers: {
            "Authorization": `Bearer ${accessToken}`
         }
       }
       return axios.post(`${FileUploadService.BASE_URL}/uploadfile`,{bodyFormData},config)
       
   }

   //primesc inapoi de la endpoint datele
   static getFile = (fileName: string) =>{
       window.open("http://127.0.0.1:5000/get-file/" + fileName)
   }


  



}