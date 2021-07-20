import React,{useState,useRef,useEffect} from 'react';

import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Keyboard,
    KeyboardAvoidingView
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'



const enterpin=({navigation})=>{

    let textInput=useRef(null)

    const [isvalid,setvalid]=useState(false)
    
    const lenghtInput=4;

    const [internalVal,setInternalVal]=useState('')

    const onChangeText=(val)=>{
        setInternalVal(val)
        setInternalVal(val)
        if(internalVal.length!==3){
            setvalid(false)
        }
        else{
            setvalid(true)
        }
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
    getdetails()
    const onpresscontinue=()=>{
        if(internalVal.length==4 && internalVal===curpin){
            navigation.navigate('qrcod')
        }
        else{
            alert('Incorrect Pin')
        }
    }



    useEffect(()=>{
        textInput.focus()
        
    },[])

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content"/>
              <View style={styles.header}>
                  <Text style={styles.text_header}> PIN</Text>
                  <Text style={styles.textSign}>  Enter pin to get Access Code.!</Text>
              </View>
            <Animatable.View 
            animation='fadeInUpBig'
            duraton='1500'
            style={styles.footer}>
                <View style={styles1.container}>
            <KeyboardAvoidingView
                keyboardVerticalOffset={50}
                behavior={'padding'}
                style={styles1.containerAvoidingView}
            >
                <Text style={styles1.textTile}>{"Input Pin Code"}</Text>
                { isvalid ? null : 
                  <Animatable.View animation="fadeInLeft" duration={500}>
                  <Text style={styles.errorMsg}>Password must be 4 digits long.</Text>
                  </Animatable.View>
                  }
                <View>
                   <TextInput
                        ref={(input)=> textInput=input}
                        onChangeText={onChangeText}
                        style={{width:0,height:0}}
                        value={internalVal}
                        autoFocus={true}
                        maxLength={lenghtInput}
                        returnKeyType="done"
                        secureTextEntry={false}
                        keyboardType="numeric"
                        
                   />
                   <View style={styles1.containerInput} >
                       {
                           Array(lenghtInput).fill().map((data,index)=>(
                            <View key={index}
                             style={[styles1.cellView,
                                {
                                    borderBottomColor :index === internalVal.length ? '#FB6C6A' : '#234DB7' 
                                }
                             ]}
                             
                             > 
                                <Text style={styles1.cellText}
                                >
                                    {internalVal && internalVal.length>0 ? internalVal[index]:""}
                                </Text>
                            </View>
                            ))
                       }
                        
                   </View>
                </View>
                <View style={[styles.button,{marginTop:75}]}>
                <TouchableOpacity onPress={()=>onpresscontinue()}>
                    <LinearGradient
                        colors={['#94d4c4','#01bbff','#0099aa']}
                        style={styles.signIn}
                    >
                        <Text style={styles.textSign}>Get UnLocked</Text>
                        <MaterialIcons
                            name='navigate-next'
                            color='#fff'
                            size={20}
                        >

                        </MaterialIcons>
                    </LinearGradient>
                </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
            </Animatable.View>
        </View>
    )
}

export default enterpin;


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
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    footer: {
        flex: 4,
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

  const styles1=StyleSheet.create({
    container:{
        flex:1
    },
    containerAvoidingView:{
        flex:1,
        alignItems:'center',
        padding:10
    },
    textTile:{
        marginTop:50,
        marginBottom:50,
        fontSize:16

    },
    containerInput:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    cellView:{
        paddingVertical:11,
        width:40,
        margin:5,
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:1.5

    },
    cellText:{
        textAlign:'center',
        fontSize:16
    },
    bottomView:{
        flexDirection:'row',
        flex:1,
        justifyContent:'flex-end',
        marginBottom:50,
        alignItems:'center'
    },
    btnChangeNumber:{
        width:150,
        height:50,
        borderRadius:10,
        alignItems:'flex-end',
        justifyContent:'center'
    },
    textChange:{
        color:'#234DB7',
        alignItems:'center'
    }
})