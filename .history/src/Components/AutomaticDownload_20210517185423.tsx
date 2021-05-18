import React, { useEffect, useState } from "react";
import AccountService from "../Services/AccountService";
import {useLocation} from "react-router-dom"
import queryString from 'query-string'
import { Redirect } from "react-router";
import { DownloadFileInterface, VerfiyAccountInterface } from "../Models/Interfaces";

export const AutomaticDownload: React.FunctionComponent<any> = () => {
   //query string-ul din care iau datele (public id si filename)
  const {search} = useLocation();
  //parsez query string-ul ca sa obtin datele
  const {publicId, fileName} = queryString.parse(search)

   useEffect(() => {
      let data :DownloadFileInterface = {
         fileName:Array.isArray(fileName)?fileName[0]:fileName!,
         publicId:Array.isArray(publicId)?publicId[0]:publicId!
      }
      AccountService.downloadFile(data)
         .then(resp => {
            console.log(resp)
         })
         .catch(err => {
            console.log(err)
         })
   },[]);
     
  return (
    <Redirect to="/app"></Redirect>
  );
};
