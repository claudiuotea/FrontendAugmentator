import axios from "axios";
import {
  DownloadFileInterface,
  ForgotPasswordInterface,
  LoginInterface,
  RegisterInterface,
  ResetPasswordInterface,
  VerfiyAccountInterface,
} from "../Models/Interfaces";

export default class AccountService {
  private static readonly BASE_URL: string = "http://127.0.0.1:5000";

  static login = (data: LoginInterface): Promise<any> => {
    return axios.get(`${AccountService.BASE_URL}/login`, {
      auth: data,
    });
  };

  static register = (data: RegisterInterface): Promise<any> => {
    return axios.post(`${AccountService.BASE_URL}/register`, data);
  };

  static forgotPassword = (data: ForgotPasswordInterface): Promise<any> => {
    return axios.post(`${AccountService.BASE_URL}/forgotpass`, data);
  };

  static resetPassword = (data: ResetPasswordInterface): Promise<any> => {
    //console.log(data)
    return axios.post(`${AccountService.BASE_URL}/resetpass`, data);
  };

  static verifyAccount = (data: VerfiyAccountInterface): Promise<any> => {
    return axios.post(`${AccountService.BASE_URL}/verifyaccount`, data);
  };

  //verifica daca user-ul este admin
  static checkAdmin = (): Promise<any> => {
    let accessToken = window.localStorage.getItem("AccessToken");
    console.log("Sunt in checkAdmin si primesc token " + accessToken);
    let config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    return axios.get(`${AccountService.BASE_URL}/checkadmin`, config);
  };

  //verifica daca token-ul e valid, daca nu e valid, utilizeaza refresh token ca sa primeasca un token nou
  static refreshToken = (): Promise<any> => {
    let refreshToken = window.localStorage.getItem("RefreshToken");

    let config = {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    };
    localStorage.removeItem("AccessToken");
    return axios.post(`${AccountService.BASE_URL}/refresh`, {}, config);
  };

  static logout = (): void => {
    localStorage.removeItem("RefreshToken");
    localStorage.removeItem("AccessToken");
  };

  static downloadFromServer(fileName: string) {
    window.open("http://127.0.0.1:5000/get-file/" + fileName);
  }

  static downloadFile = (fileNameParam:string,publicIdParam:string): Promise<any> => {
    let accessToken = window.localStorage.getItem("AccessToken");

    let config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
   //  return axios.post(`${AccountService.BASE_URL}/download`, data, config);

    const FileDownload = require("js-file-download");

    return axios({
      url: `${AccountService.BASE_URL}/download/${publicIdParam}/${fileNameParam}`,
      method: "GET",
      responseType: "blob",
      headers: {"Authorization" : `Bearer ${accessToken}`}
    })
  };
}
