import React, { useContext,  useState, useEffect, useRef  } from "react";

import StyleProvider from "./src/context/provider/styleProvider";
import { DataController } from "./src/context/provider";
import TabNavigation from './src/routes/tabNavigation'
import LoginStack from "./src/routes/stack/loginStack";
import HomeStack from "./src/routes/stackNavigator";



export default function Navigator() {
  const {logined,lockScreen} = useContext(DataController)
  
// console.log(logined)
  return logined ? (
    <HomeStack/>
  ) : (
  
      <LoginStack />


    
  );
  
}