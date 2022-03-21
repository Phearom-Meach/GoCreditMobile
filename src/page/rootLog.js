import React, {useContext } from 'react'
import { View, Text, SafeAreaView, StatusBar, ScrollView,TouchableWithoutFeedback, Keyboard } from 'react-native'
import { COLORS } from '../../color'
import { StyleController } from '../context/provider/styleProvider'

export default function RootLog({children, Header,Arrow}) {
    const { styleState } = useContext(StyleController)

   
    return (
        <View
            style={{
                backgroundColor: COLORS.PRIMARY,     
                minHeight: styleState.fullScreen,
            }}
        >
            <StatusBar barStyle={ Platform.OS === 'ios'? "dark-content":"default"} />
            <SafeAreaView>
                {Header}
                {Arrow}
               <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                
                    <View
                        style={{
                            // paddingLeft: styleState.rootPad,
                            // paddingTop: 10,
                            paddingRight: styleState.rootPad,
                            marginBottom: Platform.OS === "ios" ? 0 : 0,
                            height: '100%'
                        }}
                    >
                        {children}
                    </View>
             
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </View>
    )
}
