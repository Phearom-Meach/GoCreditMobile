import React, { createContext } from 'react'
import { Dimensions } from 'react-native'
import * as Font from 'expo-font';

export const StyleController = createContext()


export default function StyleProvider({ children }) {
    const [loaded] = Font.useFonts({
        'KhmerOsSiemReap': require('../../font/KhmerOSsiemreap.ttf'),
        'KhmerOsMuollight': require('../../font/KhmerOSmuollight.ttf'),
        'Tacteng': require('../../font/Tacteng.ttf'),

        'SingaporeSling': require('../../font/SingaporeSling.ttf'),
        'SegoeUI': require('../../font/SegoeUI.ttf'),
        'Khmer OS Muol Light':require('../../font/Khmer OS Muol Light.ttf'),
      
    });

    if (!loaded) {
        return null;
    }

    const height= Dimensions.get('screen').height
    const width = Dimensions.get('screen').width

    const styleState = {
        bgColor: "#000000",
        textColor: "#ffffff",
        fullScreen: Dimensions.get("screen").height,
        headKh: "KhmerOsMuollight",
        bodyKh: "KhmerOsSiemReap",
        symbolKh: "Tacteng",
        headEng: "SingaporeSling",
        bodyEng: "SegoeUI"
    }

    // console.log(styleState)

    return (
        <StyleController.Provider
            value={{
                styleState,
                height,
                width

            }}
        >
            {children}
        </StyleController.Provider>
    )
}
