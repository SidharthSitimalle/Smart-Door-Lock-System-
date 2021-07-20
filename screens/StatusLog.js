import React, { useEffect, useRef, useState } from 'react';
import {
    Button,
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    FlatList,
    Switch,
    ActivityIndicator
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import {TextInput,TouchableOpacity} from 'react-native-gesture-handler';

const statuslog=({navigation})=>{
    const [loading, setLoading] = useState(true); 
    const [users, setUsers] = useState([]); 

    useEffect(()=>{
        const subscriber=firestore().collection('Status')
        .onSnapshot(querySnapshot=>{
            const user=[];
            querySnapshot.forEach(documentSnapshot=>{
                users.push({
                    ...documentSnapshot.data(),
                    key:documentSnapshot.id
                });
            });
            setUsers(user);
            setLoading(false)
        });
        return ()=>subscriber();
    },[])

    if(loading){
        return (
    
        <ActivityIndicator color='red'/>

        )
    }else{
    return (
        <FlatList
            data={users}
            renderItem={({item})=>(
                <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>EmpId:{item.empid}</Text>
                    <Text>UserName:{item.fullname}</Text>
                    <Switch value={item.stat} disabled={true} />
                </View>
            )}
        
        />
    )}
}

export default statuslog;

const styles=StyleSheet.create({
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