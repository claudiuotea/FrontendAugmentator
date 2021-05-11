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