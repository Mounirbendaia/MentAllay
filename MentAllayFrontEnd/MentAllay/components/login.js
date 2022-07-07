import React, { Component } from 'react';
import { SafeAreaView,ScrollView,StyleSheet, Text,Image, View, TextInput, Button,TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import {auth} from '../database/firebase';


export default class Login extends Component {
  
  constructor() {
    super();
    this.state = { 
      email: '', 
      password: '',
      isLoading: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  userLogin = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!')
    } else if (this.state.email === 'admin' && this.state.password === 'admin') {
      this.props.navigation.navigate('adminselect')
    }
    
    
    else {
      this.setState({
        isLoading: true,
      })
      auth
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log(res)
        console.log('User logged-in successfully!')
        this.setState({
          isLoading: false,
          email: '', 
          password: ''
        })
        this.props.navigation.navigate('Dashboard')
      })
      .catch(error => alert('You have entered an invalid Email or password'))
      .then(this.props.navigation.navigate('Login'))
    }
  }

  render() {
    if(this.state.isLoading){
      return(

        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    return (
      <View style={{ flex: 1,width: '100%', resizeMode: 'contain',backgroundColor: '#59d2fa', }}>
      <SafeAreaView styles={styles.container}>
      <ScrollView styles={styles.scrollView}>
      <View style={styles.container}>  
      
       <Image 
        source={require('../Image/Logo.png')}
        style={{width:410 ,overflow: 'hidden',borderBottomLeftRadius:60, backgroundColor: 'white',alignItems: 'center',  }}
      />
            <Text style={{textDecorationLine: 'underline',marginTop:20 ,marginBottom:20 , fontSize: 25,fontWeight: "bold",color:'white'}}> SIGN IN !</Text>

        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />   
        <TouchableOpacity
         style={styles.buttonStyle}
         activeOpacity={0.5}
          onPress={() => this.userLogin()}
        > 
        <Text style={styles.buttonTextStyle}>Sign In </Text>  
        </TouchableOpacity>
        <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('ForgotPassword')}>
          Forget Password?
        </Text> 

        <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Signup')}>
          Don't have account? Click here to signup
        </Text>                          
      </View>
      </ScrollView>
        </SafeAreaView> 
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#59d2fa',
    paddingHorizontal: 10,
    },
    scrollView: {
      
    },
  inputStyle: {
    borderRadius:20,
    backgroundColor:'white',
    width: '60%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1,
    paddingLeft:20,
    paddingRight:20,
  },
  loginText: {
    color: 'white',
    marginTop: 25,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  buttonStyle: {
    
    backgroundColor: 'white',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    elevation: 8,
    alignItems: 'center',
    borderRadius: 30,

  },
  buttonTextStyle: {
    
    color: '#59d2fa',
    paddingRight: 80,
    paddingLeft:80,
    paddingVertical: 10,
    fontSize: 16,
  },
});