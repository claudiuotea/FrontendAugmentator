import React, { useEffect, useState } from "react";
import AccountService from "../Services/AccountService";
import {useLocation} from "react-router-dom"
import queryString from 'query-string'
import { Redirect } from "react-router";
import { VerfiyAccountInterface } from "../Models/Interfaces";

export const VerifyAccount: React.FunctionComponent<any> = () => {
   //query string-ul din care iau datele (token-ul pt reset si public_id-ul lui)
  const {search} = useLocation();
  //parsez query string-ul ca sa obtin datele
  const {id, token} = queryString.parse(search)

   useEffect(() => {
      let data :VerfiyAccountInterface = {
         token:Array.isArray(token)?token[0]:token!,
         public_id:Array.isArray(id)?id[0]:id!
      }
      AccountService.verifyAccount(data)
         .then(resp => {
            console.log(resp)
         })
         .catch(err => {
            console.log(err)
         })
   },[]);
     
  return (
    <Redirect to="/account/login"></Redirect>
  );
};
