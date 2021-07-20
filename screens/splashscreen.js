import React from 'react';
import {
    View,
    Text,
    Button,
    Dimensions,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const splashscreen=({navigation})=>{
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Animatable.Image
                animation='bounceIn'
                duraton='1500'
                source={require('../assets/naruto.png')}
                style={styles.logo}
                resizeMode='stretch'
                />
            </View>
            <Animatable.View 
            animation='fadeInUpBig'
            style={styles.footer}>
                <Text style={styles.title}>#1 Door Systems India</Text>
                <Text style={styles.text }>Get Connected! </Text>
                <View style={styles.button}>
                <TouchableOpacity onPress={()=>navigation.navigate('Home')} >
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
            </Animatable.View>
        </View>
    )
};

export default splashscreen;



const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#112244'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      flex: 1,
      backgroundColor: '#fff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingVertical: 50,
      paddingHorizontal: 30
  },
  logo: {
      width: height_logo,
      height: height_logo
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
