import axios from "axios";

export default class FileUploadService {
   private static readonly BASE_URL: string = "http://127.0.0.1:5000";

   //trimit la endpoint datele
   static uploadFile = (bodyFormData: FormData): Promise<any> => {
      let accessToken = window.localStorage.getItem('AccessToken')
      axios({
         method: "post",
         url: "myurl",
         data: bodyFormData,
         headers: { "Content-Type": "multipart/form-data" , "Authorization": `Bearer ${accessToken}` },
       })
         .then(function (response) {
           //handle success
           console.log(response);
         })
         .catch(function (response) {
           //handle error
           console.log(response);
         });
   }

   //primesc inapoi de la endpoint datele
   static getFile = (fileName: string) =>{
       window.open("http://127.0.0.1:5000/get-file/" + fileName)
   }


  



}