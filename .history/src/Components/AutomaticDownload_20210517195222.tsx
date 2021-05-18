import React, { useEffect, useState } from "react";
import AccountService from "../Services/AccountService";
import {useLocation} from "react-router-dom"
import queryString from 'query-string'
import { Redirect } from "react-router";
import { DownloadFileInterface, VerfiyAccountInterface } from "../Models/Interfaces";
import { Button } from "@material-ui/core";

export const AutomaticDownload: React.FunctionComponent<any> = () => {
   //query string-ul din care iau datele (public id si filename)
  const {search} = useLocation();
  //parsez query string-ul ca sa obtin datele
  const {publicId, fileName} = queryString.parse(search)

   useEffect(() => {
      //pentru download automat
      const FileDownload = require('js-file-download');
      let data :DownloadFileInterface = {
         fileName:Array.isArray(fileName)?fileName[0]:fileName!,
         publicId:Array.isArray(publicId)?publicId[0]:publicId!
      }

      //trimite request ca sa vad daca e admin
    AccountService.downloadFile(data)
    .then((resp) => {
      
         FileDownload(resp.data, fileName);
       
    }) //in caz ca este expirat token-ul, apelez refresh token si reincerc
    .catch((err) => {
      if (err.response.data.msg === "Token has expired") {
        AccountService.refreshToken().then((resp1) => {
          localStorage.setItem("AccessToken", resp1.data.access_token);
          AccountService.downloadFile(data).then(resp=>{
             FileDownload(resp.data,fileName)
          })
        });
      }
    })
   })
   
  return (
     <Redirect to="/app"></Redirect>
  );
};
