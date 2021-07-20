import React from 'react';
import auth, { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useState } from 'react';

const changepassword = ({navigation}) => {

    const [data, setData] = React.useState({
        currentpassword:'',
        newpassword:'',
        reenterpassword:''
    });

    const handlecurrentpassChange=(val)=>{
        setData({
            ...data,
            currentpassword:val

        })
    }
    const handlenewpassChange=(val)=>{
        setData({
            ...data,
            newpassword:val

        })
    }
    const handlereenterpassChange=(val)=>{
        setData({
            ...data,
            reenterpassword:val

        })
    }
   
    const [curpin,setcpin]=useState('')
    const getdetails=()=>{firestore()
        .collection('Users')
        .doc(auth().currentUser.uid)
        .get()
        .then(documentSnapshot => {
          console.log('User exists: ', documentSnapshot.exists);
          
            
          if (documentSnapshot.exists) {
            
            setcpin(documentSnapshot.data().pin)
          }
        });
    }
    
    const onchangepassword=()=>{
        
        
        getdetails()
        if(curpin===data.currentpassword){
            if(data.newpassword===data.reenterpassword){
                firestore().collection('Users').doc(auth().currentUser.uid).update({pin:data.newpassword})
                alert('Pin Successfully changed')
                navigation.goBack()
            }
        }else{
            alert('Password Incorrect!')
        }
            
        
    }

    
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Change Pin</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.text_footer}>Current Pin</Text>
            <View style={styles.action}>
                <TextInput 
                    placeholder="Current Pin"
                    style={styles.textInput}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={(val)=>handlecurrentpassChange(val)}
                />
                
            </View>
            <Text style={styles.text_footer}>New Pin</Text>
            <View style={styles.action}>
                <TextInput 
                    placeholder="New Pin"
                    style={styles.textInput}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={(val)=>handlenewpassChange(val)}
                />
                
            </View>
            <Text style={styles.text_footer}>Re-enter Pin</Text>
            <View style={styles.action}>
                <TextInput 
                    placeholder="Re-enter Pin"
                    style={styles.textInput}
                    autoCapitalize="none"
                    secureTextEntry={true}
                    onChangeText={(val)=>handlereenterpassChange(val)}
                />
                
            </View>
            {(data.newpassword==data.reenterpassword) ? null : 
                  <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>Passwords don't match</Text>
                  </Animatable.View>
                  }
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={data.newpassword==data.reenterpassword ? ()=>onchangepassword() : null}
                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Apply Changes</Text>
                </LinearGradient>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default changepassword;

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
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
  });
