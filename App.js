import React,{Component, useState} from 'react';
import { View,Text,BackHandler, ActivityIndicator } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';

import ReactNativeBiometrics from 'react-native-biometrics'

import auth from '@react-native-firebase/auth'


import Home from './screens/Home'
import qrcod from './screens/QRCode'
import signup from './screens/SignUp'
import fireup from './screens/Fireup'
import splashscreen from './screens/splashscreen'
import addmembers from './screens/AddMembers'
import changepassword from './screens/changepassword'
import forgotpassword from './screens/ForgotPassword';
import enterpin from './screens/EnterPin'
import statuslog from './screens/StatusLog'
import { useEffect } from 'react';

const Stack=createStackNavigator();



const App=()=>{

  

  const [loaded,setload]=useState(false)
  
  const tryfinger=()=>{
    ReactNativeBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint'})
    .then((resultObject) => {
        const { success } = resultObject
    
        if (success) {
            setload(true)
        } else {
        console.log('user cancelled biometric prompt')
        BackHandler.exitApp()
        }
    })
    .catch(() => {
        console.log('biometrics failed')
    })
  }
  if(loaded){
    return(
      <NavigationContainer>
        <Stack.Navigator headerMode='splashscreen'>
          <Stack.Screen
            name="splashscreen"
            component={splashscreen}
           />
           <Stack.Screen
           name='statuslog'
           component={statuslog}
           />
           <Stack.Screen
           name="enterpin"
           component={enterpin}
           />
           <Stack.Screen
            name='changepassword'
            component={changepassword}
           />
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen 
            name="addmembers"
            component={addmembers}
          />
          <Stack.Screen
          name='fireup'
          component={fireup}
          />
          <Stack.Screen
          name='forgotpassword'
          component={forgotpassword}
          />
            
            
            <Stack.Screen
            name="qrcod"
            component={qrcod}
          />
            <Stack.Screen
            name="signup"
            component={signup}
          />
          
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  else{
    tryfinger()
    return(
      
      <ActivityIndicator style={{justifyContent:'center',flex:1}} color='red'/>
    )
  }
}

export default App;