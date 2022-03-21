import React, {useContext } from 'react'
import { View, Text, SafeAreaView, StatusBar, ScrollView, Platform } from 'react-native'
import { COLORS } from '../../color'
import { StyleController } from '../context/provider/styleProvider'

export default function Root1Screen({children,Header,Arrow}) {
    const { styleState } = useContext(StyleController)

   
    return (
        <View
            style={{
                // backgroundColor: COLORS.PRIMARY,    
                minHeight: styleState.fullScreen,
               
            }}
        >
            <StatusBar barStyle={ Platform.OS === 'ios'? "dark-content":"default"} />
            <SafeAreaView
            
            style={{
                // backgroundColor: COLORS.PRIMARY,    
                minHeight: styleState.fullScreen,
               
            }}>
                {Header}
                {Arrow}
               
                <ScrollView>
                    <View
                        style={{
                            // paddingLeft: styleState.rootPad,
                            // paddingTop: 10,
                            
                            // backgroundColor: COLORS.MAIN,    
                            paddingRight: styleState.rootPad,
                            marginBottom: Platform.OS === "ios" ? 50 : 100,
                            // height: '100%'
                            
                        }}
                    >
                        {children}
                        
                    
                    </View>
                </ScrollView>
                
          
            </SafeAreaView>
            
        </View>
    )
}
