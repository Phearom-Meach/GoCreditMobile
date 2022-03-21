import React, { createContext, useEffect, useReducer, useState } from "react";
import { ACTION, reducer } from "./reducer";
export const DataController = createContext();
import { cardDB } from "../assets/data/cardDB";
import { contactDB } from "../assets/data/contactDB";
import { accountDB } from "../assets/data/accountDB";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function Provider({ children }) {

  const [logined, loginedDispatch] = useReducer(reducer, false);
  const [user, userDispatch] = useReducer(reducer, {});
  const [cardDBCtx, cardDBCtxDispatch] = useReducer(reducer, []);
  const [contactDBCtx, contactDBCtxDispatch] = useReducer(reducer, contactDB);
  const [accountDBCtx, accountDBCtxDispatch] = useReducer(reducer, []);
  const [lockScreen, lockScreenDispatch] = useReducer(reducer, 60000);
  const [language, languageDispatch] = useReducer(reducer,{english:true, khmer:false})
  const [notiNumDBCtx, notiNumDispatch] = useReducer(reducer,[])
  const [tokenDBCtx, tokenDBCtxDispatch] = useReducer(reducer, "");

  useEffect(() => {
    const fetchData = async() => {
      let data = await AsyncStorage.getItem("@user");
      loginedDispatch({
        type: ACTION.LOGIN_USER,
        payload: data !== null ? true : false
      })
      userDispatch({
        type: ACTION.LOGIN_USER,
        payload: data !== null ? JSON.parse (data) : {}
      })
      // lockScreenDispatch({
      //   type: ACTION.LOCK_SCREEN,
      //   payload: 30000
      // })
      let lang = await AsyncStorage.getItem("@language");
      let newLang = lang === null? {english:true, khmer:false}:JSON.parse(lang)
     
      languageDispatch({
        type: ACTION.LANGUAGE,
        payload: newLang
      })

        let badge =  await AsyncStorage.getItem("@notificatione"); 
        
        // let newBadge = badge === null ? {}:JSON.parse(badge); 

        // if(badge){
        //   notiNumDispatch({
        //     type: ACTION.NOTINUM,
        //     payload: JSON.parse(badge)
        //   })
        // }
        

    //  console.log(badge,"Hleldlfds");
    }
   

    fetchData()
  }, [])
// console.log(lockScreen);
  return (
    <DataController.Provider
      value={{
        user,
        userDispatch,
        logined,
        loginedDispatch,
        cardDBCtx,
        cardDBCtxDispatch,
        contactDBCtx,
        contactDBCtxDispatch,
        accountDBCtx,
        accountDBCtxDispatch,
        lockScreen,
        lockScreenDispatch,
        language, 
        languageDispatch,
        notiNumDBCtx, 
        notiNumDispatch,
        tokenDBCtx, 
        tokenDBCtxDispatch
      }}
    >
      {children}
    </DataController.Provider>
  );
}
