import React, { Component } from 'react';
import { TouchableOpacity,  Keyboard,ToastAndroid,SafeAreaView,ScrollView, StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator,Image } from 'react-native';
import {auth,db} from '../database/firebase';
import { Container, Header, Content, Item, Input, Label,Form } from 'native-base';
import moment from 'moment';
import * as firebase from "firebase";

import DateTimePicker from 'react-native-modal-datetime-picker';
import RadioForm, {
  RadioButton, 
  RadioButtonInput, 
  RadioButtonLabel
} from 'react-native-simple-radio-button';

var Gender = [
  {label: "Male", value: "Male"},
  {label: "Female", value: "Female"},
];

export default class Signup extends Component {
  state = {
    checked: 'first',
  };
  constructor() {
    super();
    this.state = { 
      displayName: '',
      email: '', 
      password: '',
      Phonenumber: '',
      selectedLanguage :'',
      setSelectedLanguage:'',
      show: false,
      password1: '',
      value: '',
      Gender: '',
      mode: 'date',
      displayFormat: 'DD/MM/YYYY',
      label: 'Date',
      isLoading: false
    }
  }

  setSelectedLanguage= (value) =>{
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  registerUser = (phone,gender) => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signup!')
    } else {
      this.setState({
        isLoading: true,
      })

      auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: this.state.displayName,
          PhotoUrl: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
        })
        console.log('User registered successfully!')
        this.setState({
          isLoading: false,
          displayName: '',
          email: '', 
          password: '', 
         
        })
        db.collection('UsersInfo').add({
          useId: auth.currentUser.uid,
          phone: this.state.Phonenumber,
          gender: this.state.Gender,
          email: auth.currentUser.email,
          birthday: this.state.value,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),

       })
       .catch((error) => alert(error));
        
        this.props.navigation.navigate('test',{
          phone: this.state.Phonenumber,
          gender: this.state.Gender,
        })
      })
      .catch(error => alert(error.message))      
    }



  




  }

  showDateTimePicker = () => {
    // alert('showDateTimePicker');
     this.setState({ show: true });
     Keyboard.dismiss();
   };
 
   hideDateTimePicker = () => {
     this.setState({ show: false });
   };
 
   handleDatePicked = value => {
     this.setState({ value: value });
     setTimeout(() => {
       this.hideDateTimePicker();
     }, 250);
   };
 
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }    
    
    state = {user: ''}
    updateUser = (user) => {
       this.setState({ user: user })
    }

    const options = [
      "Option 1",
      "Option 2"
    ];
   
    function setSelectedOption(selectedOption){
      this.setState({
        selectedOption
      });
    }
    const { checked } = this.state;

    const {label, value, show, mode, displayFormat} = this.state;
    return (
      <SafeAreaView styles={styles.container}>
      <ScrollView styles={styles.scrollView}>
      <View style={styles.container}>  

        
       <Image 
        source={require('../Image/Logo.png')}
        style={{width:410 ,overflow: 'hidden',borderBottomLeftRadius:60, backgroundColor: 'white',alignItems: 'center',  }}
      />
      <Text style={{textDecorationLine: 'underline',marginTop:20 ,marginBottom:20 , fontSize: 25,fontWeight: "bold",color:'white'}}> GET STARTED !</Text>
        <TextInput
          style={styles.inputStyle}
          placeholder="Name"
          value={this.state.displayName}
          onChangeText={(val) => this.updateInputVal(val, 'displayName')}
        />      
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
                
         <TextInput
          style={styles.inputStyle}
          placeholder="Phone number"
          value={this.state.Phonenumber}
          onChangeText={(val) => this.updateInputVal(val, 'Phonenumber')}
          maxLength={15}
        />  
        <Text  style={{color:'white',marginBottom:5,fontSize: 15}}>Gender:</Text>
        <RadioForm  style={{color:'white'}}
          radio_props={Gender}
          initial={0}
          onPress={(value) => {ToastAndroid.show(value.toString(), ToastAndroid.SHORT)
            this.setState({
              Gender: value,
            })
          }}
          buttonSize={20}
          buttonOuterSize={20}
          selectedButtonColor={'white'}
          selectedLabelColor={'white'}
          disabled={false}
          formHorizontal={false}
          labelColor={'white'}
          buttonColor={'white'}
          marginTop={90}
        /> 
        
        <Content  style={{width: 200}}  padder>
        <Form onPress={this.showDateTimePicker}>
          <Item floatingLabel onKeyPress={this.showDateTimePicker}>   
            <Input caretHidden   value={value ? moment(value).format(displayFormat) : ''} onFocus={this.showDateTimePicker} />
          <Label style={{color:'white'}} >date of birth</Label>
          </Item>
          <DateTimePicker
            date={value ? new Date(value) : new Date()}

            isVisible={show}
            mode={mode}
            onConfirm={this.handleDatePicked}
            onCancel={this.hideDateTimePicker}
          />
          </Form>
        </Content>
        <View style={styles.fixToText}>
        <TouchableOpacity         
        style={styles.buttonStyle}
         activeOpacity={0.5}
          onPress={() => this.registerUser(this.state.Phonenumber,this.state.Gender)}
        >         
        <Text style={styles.buttonTextStyle}> Next </Text>  
        </TouchableOpacity>
</View>
        <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Login')}>
          Already Registered? Click here to login
        </Text>       
      
      </View>
      </ScrollView>
        </SafeAreaView>      

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
  header: {
width: 80,
    textAlign: 'center',
 marginTop: 0,
    },
  inputStyle: {
    borderRadius:20,
    backgroundColor:'white',
    width: '60%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "white",
    paddingLeft:20,
    paddingRight:20,
    borderBottomWidth: 1,
  },  
  fixToText:{
    marginTop: 25,
  },
  loginText: {
    color: 'white',
    marginTop: 25,
    textAlign: 'center',
    marginBottom:40,
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
    paddingRight: 20,
    paddingLeft:20,
    paddingVertical: 10,
    fontSize: 16,
  },
});