import React from 'react';
import auth from '@react-native-firebase/auth';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

const addmembers = ({navigation}) => {

    const [data, setData] = React.useState({
        username: '',
        password: 'Password@123',
        fullname:'',
        address:'',
        Phone:'',
        empid:'',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const textInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    }

    const handleempchange=(val)=>{
        setData({
            ...data,
            empid:val
        })
    }
    const handlefullnameChange = (val) => {
        setData({
            ...data,
            fullname: val
        });
    }
    
    const handlePhoneChange = (val) => {
        setData({
            ...data,
            Phone: val
        });
    }
    
    const handleAddressChange = (val) => {
        setData({
            ...data,
            address: val
        });
    }

    const onsignUp=()=>{
        const username=data.username
        const password=data.password
        const fullname=data.fullname
        const address=data.address
        const Phone=data.Phone
        const pin='2020'
        const empid=data.empid

        auth()
            .createUserWithEmailAndPassword(username,password)
            .then(() => {
                firestore().collection("Users")
                .doc(auth().currentUser.uid)
                .set({
                    username,
                    fullname,
                    address,
                    Phone,
                    adm:false,
                    pin,
                    empid

                })
                firestore().collection('Status').doc(auth().currentUser.uid).set({stat:false})
                var user = auth().currentUser;

                user.sendEmailVerification().then(()=> {
                    alert('User account created ...Mail has been Sent to the respective Employee');
                }).catch((error)=> {
                    console.log(
                        error
                    )
                });

                navigation.goBack();
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }
    return (
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Now!</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.text_footer}>Emp ID</Text>
            <View style={styles.action}>
                <TextInput 
                    placeholder="Full Name"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val)=>handleempchange(val)}
                />
                
            </View>
            
            <Text style={styles.text_footer}>Full Name</Text>
            <View style={styles.action}>
                <TextInput 
                    placeholder="Full Name"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val)=>handlefullnameChange(val)}
                />
                
            </View>
            <Text style={styles.text_footer}>Address</Text>
            <View style={styles.action}>
                <TextInput 
                    placeholder="Address"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val)=>handleAddressChange(val)}
                />
                
            </View>
            <Text style={styles.text_footer}>Phone</Text>
            <View style={styles.action}>
                <TextInput 
                    placeholder="Phone Number"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val)=>handlePhoneChange(val)}
                />
                
            </View>
            <Text style={styles.text_footer}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#05375a"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Username"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            

            
            
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => onsignUp()}
                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Enroll User</Text>
                </LinearGradient>
                </TouchableOpacity>
                
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default addmembers;

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
