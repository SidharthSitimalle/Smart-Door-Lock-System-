import React from 'react';

import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Dimensions
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper'
import { useEffect } from 'react';
import { useState } from 'react';
const fireup=({navigation})=>{

    const [name,setname]=useState('')
    const [designation,setdes]=useState('')
    const [adm,setadm]=useState(false)
    const getdetails=()=>{firestore()
    .collection('Users')
    .doc(auth().currentUser.uid)
    .get()
    .then(documentSnapshot => {
      
      
        
      if (documentSnapshot.exists) {
        
        setadm(documentSnapshot.data().adm)
        setname(documentSnapshot.data().fullname)
        setdes(documentSnapshot.data().empid)
      }
    });
    }

    
    const onsignOut=()=>{
        auth().signOut().then(()=>navigation.navigate('Home'))
    }
    

    getdetails()
    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content"/>
              <View style={styles.header}>
                  <Text style={styles.text_header}> Welcome!</Text>
                  <Text style={styles.text_header}> {name}</Text>
              </View>
            <Animatable.View 
            animation='fadeInUpBig'
            style={styles.footer}>
                <Text style={styles.title}>EmpID:  {designation}</Text>
                <Text style={styles.text }>You're off to great places, today is your day. </Text>
                <View style={styles.button}>
                <TouchableOpacity onPress={()=>navigation.navigate('enterpin')} >
                    <LinearGradient
                        colors={['#94d4c4','#01bbff','#0099aa']}
                        style={styles.signIn}
                    >
                        <Text style={styles.textSign}>GET ACCESS CODE</Text>
                        <MaterialIcons
                            name='navigate-next'
                            color='#fff'
                            size={20}
                        >

                        </MaterialIcons>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity style={{marginTop:10}} onPress={()=>navigation.navigate('changepassword')}>
                    <LinearGradient
                        colors={['#94d4c4','#01bbff','#0099aa']}
                        style={styles.signIn}
                    >
                        <Text style={styles.textSign}>CHANGE PIN</Text>
                        <MaterialIcons
                            name='navigate-next'
                            color='#fff'
                            size={20}
                        >

                        </MaterialIcons>
                    </LinearGradient>
                </TouchableOpacity>
                {adm==true ? 
                <TouchableOpacity style={{marginTop:10}} onPress={()=>navigation.navigate('addmembers')}>
                <LinearGradient
                    colors={['#94d4c4','#01bbff','#0099aa']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>ADD Members</Text>
                    <MaterialIcons
                        name='navigate-next'
                        color='#fff'
                        size={20}
                    >

                    </MaterialIcons>
                </LinearGradient>
            </TouchableOpacity>
                : null}
                {adm ? 
                <TouchableOpacity style={{marginTop:10}} onPress={()=>{navigation.navigate('statuslog')}}>
                <LinearGradient
                    colors={['#94d4c4','#01bbff','#0099aa']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Employee Status LOG</Text>
                    
                </LinearGradient>
            </TouchableOpacity>
                : null}
            <TouchableOpacity style={{marginTop:10}} onPress={()=>onsignOut()}>
                    <LinearGradient
                        colors={['#94d4c4','#01bbff','#0099aa']}
                        style={styles.signIn}
                    >
                        <Text style={styles.textSign}>Sign Out</Text>
                        <MaterialIcons
                            name='navigate-next'
                            color='#fff'
                            size={20}
                        >

                        </MaterialIcons>
                    </LinearGradient>
                </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}

export default fireup


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#009387'
      },
      header: {
          flex: 1,
          justifyContent: 'flex-end',
          paddingHorizontal: 20,
          paddingBottom: 50
      },
      text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    footer: {
        flex: 2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    title: {
        color: '#05375a',
        fontSize: 30,
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop:5
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30 
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
  });