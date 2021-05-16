import axios from "axios";

export default class FileUploadService {
   private static readonly BASE_URL: string = "http://127.0.0.1:5000";

   //trimit la endpoint datele
   static uploadFile = (bodyFormData: any): Promise<any> => {
       return axios({
           method: "post",
           url: `${FileUploadService.BASE_URL}/uploadFile`,
           data: bodyFormData,
           headers: { "Content-Type": "multipart/form-data" },
       })
       
   }

   //primesc inapoi de la endpoint datele
   static getFile = (fileName: string) =>{
       window.open("http://127.0.0.1:5000/get-file/" + fileName)
   }


  



}