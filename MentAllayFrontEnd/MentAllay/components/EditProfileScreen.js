import React, { Component } from 'react';
import { SafeAreaView,ScrollView,StyleSheet, Text,Image, View, TextInput, Button,TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import {auth} from '../database/firebase';
import { ListItem, Avatar } from 'react-native-elements'
export default class Tips extends Component {
  constructor() {
    super();
    this.state = { 
      email: '', 
      name:'',
      password:'',
      displayName: auth.currentUser.displayName,
      oldemail: auth.currentUser.email,
      
      isLoading: false
    }
  }

  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  changeEmail = () => {
    if(this.state.email === '' ) {
      Alert.alert('Enter details to update!')
    } else {
      auth.currentUser
      .updateEmail(this.state.email).then(() => {

        Alert.alert("Email updated!");
        this.setState({
          email: '', 
        })
      }).catch((error) => { Alert.alert(error); });
   
  }}
  changeName = () => {
    if(this.state.name === '' ) {
      Alert.alert('Enter details to update!')
    } else {
    auth.currentUser
    .updateProfile({
      displayName: this.state.name,}).then(() => {

        Alert.alert("Name updated!");
      this.setState({
        email: '', 
      })
    }).catch((error) => { Alert.alert(error); });
 
}}
changePassword = () => {
  if(this.state.password === '' ) {
    Alert.alert('Enter details to update!')
  } else {
  auth.currentUser
  .updatePassword( this.state.password,).then(() => {

    Alert.alert("password updated!");
    this.setState({
      email: '', 
    })
  }).catch((error) => { Alert.alert(error); });

}}
  render(){

    return(
      <View style={styles.container}>
           <View style={{ marginTop: 80 , marginBottom: 50 }}>

</View>
<TextInput
          style={styles.inputStyle}
          placeholder={this.state.displayName}
          value={this.state.name}
          onChangeText={(val) => this.updateInputVal(val, 'name')}
        />
          <TouchableOpacity
         style={styles.buttonStyle}
         activeOpacity={0.5}
          onPress={() => this.changeName()}
        > 
        <Text style={styles.buttonTextStyle}>Update Name </Text>  
        </TouchableOpacity>
        <TextInput
          style={styles.inputStyle}
          placeholder={this.state.oldemail}
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />   
        <TouchableOpacity
         style={styles.buttonStyle}
         activeOpacity={0.5}
          onPress={() => this.changeEmail()}
        > 
        <Text style={styles.buttonTextStyle}>Update Email</Text>  
        </TouchableOpacity>

         <TextInput
          style={styles.inputStyle}
          placeholder='New Password'
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />   

      
        <TouchableOpacity
         style={styles.buttonStyle}
         activeOpacity={0.5}
          onPress={() => this.changePassword()}
        > 
        <Text style={styles.buttonTextStyle}>Update Password </Text>  
        </TouchableOpacity>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
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