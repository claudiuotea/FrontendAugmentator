export interface LoginInterface{
   username: string,
   password: string
}

export interface RegisterInterface {
   username: string;
   password: string;
   email: string;
 }

 export interface ForgotPasswordInterface{
    email: string;
 }

 export interface ResetPasswordInterface{
   password: string;
   confirmPassword: string;
   token: string;
   public_id: string;
}

export interface VerfiyAccountInterface{
   public_id:string;
   token:string;
}

export interface UserDataInterface {
   isAdmin: boolean;
   email: string;
   public_id: string;
   username: string;
   isVerified: boolean;
 }

 export interface MailInterface{
    mail:string;
    phoneNumber:string;
    subject:string;
    message:string;
 }

 export interface DownloadFileInterface{
    publicId: string;
    fileName:string;
 }