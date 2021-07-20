// import React in our code
import React, {useState} from 'react';
import { useEffect } from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import QRCode from 'react-native-qrcode-svg';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const qrcod = ({navigation}) => {
  const [qrvalue, setQrvalue] = useState('');
  
  const ChangeQR =()=>{
    let a = 'A12'+ Math.floor(Math.random()*10000)
    setQrvalue(a)
    ref.doc(a).set({status:false});
  }
  
  
  const ref=firestore().collection('QR')
  

  const [stat,setstat]=useState(false);
  const  handlestatus=()=>{
      const qqr=qrvalue;
      firestore().collection('QR').doc(qqr).get().then(docSnapshot=>{
        console.log(docSnapshot.exists)
        if(docSnapshot.exists){
            setstat(docSnapshot.data().status)
        }
        console.log(stat)
        if(stat){
          alert('Access Successfull')
          firestore().collection('QR').doc(qqr).delete();
        }
      })
      console.log(qrvalue)
      
  }
  
  
  

  useEffect(()=>{
    ChangeQR()
  },[])
  
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <QRCode
          value={qrvalue ? qrvalue : 'NA'}
          size={250}
          color="black"
          backgroundColor="white"
          
        />

        <Text style={styles.textStyle}>
          SCAN THE QR CODE AT THE DOOR
        </Text>
        <TouchableOpacity onPress={()=>handlestatus()}>
          <Text></Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};
export default qrcod;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
  },
  titleStyle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  textStyle: {
    textAlign: 'center',
    margin: 10,
  },
  textInputStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#51D8C7',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#51D8C7',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 30,
    padding: 10,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});