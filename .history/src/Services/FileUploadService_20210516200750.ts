import axios from "axios";
import AccountService from "./AccountService";

export default class FileUploadService {
  private static readonly BASE_URL: string = "http://127.0.0.1:5000";

  //trimit la endpoint datele
  static uploadFile = (bodyFormData: FormData): Promise<any> => {
    AccountService.refreshToken().then((resp) => {
      let accessToken = window.localStorage.getItem("AccessToken");
      return axios({
        method: "post",
        url: FileUploadService.BASE_URL + "/uploadfile",
        data: bodyFormData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    })
    .catch(err=>{
       return Promise.reject(err)
    });
    
  };

  //primesc inapoi de la endpoint datele
  static getFile = (fileName: string) => {
    window.open("http://127.0.0.1:5000/get-file/" + fileName);
  };
}
