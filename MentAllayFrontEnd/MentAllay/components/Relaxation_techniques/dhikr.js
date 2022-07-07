import React, { Component } from 'react';
import {ImageBackground, SafeAreaView,ToastAndroid,ScrollView,StyleSheet, Text,Image, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import PlayerScreenWorryDhikr from '../../src/worry/PlayerScreenWorryDhikr';
import PlayerScreenSadnessDhikr from '../../src/sadness/PlayerScreenSadnessDhikr';
import PlayerScreenFearDhikr from '../../src/Fear/PlayerScreenFearDhikr'
import PlayerScreenAngerDhikr from '../../src/anger/PlayerScreenAngerDhikr'
import { Dropdown } from 'react-native-material-dropdown-v2';
import RadioForm from 'react-native-simple-radio-button';
var feelinguser = [
  {label: "sadness", value: "sadness"},
  {label: "anger", value: "anger"},
  {label: "hate", value: "hate"},
  {label: "worry", value: "worry"},
  {label: "Fear", value: "Fear"},

];

export default class dhikr extends Component {

  

  
  constructor(props){
    super(props)
    this.state = {
      response: "How do you feel?",
      feeling: '',
      feelingValue: '',
    }
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

 submitData = ()=> {
fetch("http://10.0.2.2:3000/pre",{
    method:"post",
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      feeling: this.state.feeling
    })
})
.then(response => {
  if(response.status == 200 ){
    return response.text()
  }
  else {
    throw new Error("wrong");
  }
}).then(responseText => {
  this.setState({response: responseText});
}
  ).catch(error => {
    console.error(error.message);
  })
}

ayah(){
  if(this.state.response == "sadness" || this.state.feelingValue == "sadness" )
  
     return  <PlayerScreenSadnessDhikr/> ;
    else if (this.state.response == "anger" || this.state.feelingValue == "anger" )
    return  <PlayerScreenAngerDhikr/> ;
    else if (this.state.response == "hate" || this.state.feelingValue == "hate" )
    return  <PlayerScreenAngerDhikr/> ;
    else if (this.state.response == "worry" || this.state.feelingValue == "worry" )
    return  <PlayerScreenWorryDhikr/> ;
    else if (this.state.response == "Fear" || this.state.feelingValue == "Fear" )
    return  <PlayerScreenFearDhikr/> ;
  else   return <PlayerScreenSadnessDhikr/>;
}
onChangeHandler = (value) => {
  this.setState({
    feelingValue: value,
  })
  console.log(`Selected value: ${value}`);
}


  render(){
    let data = [{
      value: "sadness",
    }, {
      value: 'anger',
    }, {
      value: 'hate',
    },{
      value: 'worry',
    }, {
      value: 'Fear',
    },];
    

    return (
        <View style={{ flex: 1,width: '100%', resizeMode: 'contain',backgroundColor: 'white', }}>
           <ImageBackground source={require('../../assets/dhikr.png')} resizeMode="cover" style={{width: '100%', height: '100%'}}>
    
      <SafeAreaView style={{ alignItems: 'center', borderBottomLeftRadius:50,  borderTopRightRadius:50, paddingTop:50,paddingBottom:20,  paddingRight: 70, paddingLeft:70, marginBottom: 10}}>
      <ScrollView styles={styles.scrollView}>
      <View >  
      <Text style={{color: 'white' , fontSize: 25,  fontWeight: "bold"}} > {this.state.response} </Text>

        <TextInput
          style={styles.inputStyle}
          value={this.state.feeling}
          onChangeText={(val) => this.updateInputVal(val, 'feeling')}
        />
        

        <Button
        
          color="#59d2fa"
          title="Check"
          onPress={() => this.submitData()}
          
        />  
              <Text  style={{   marginLeft:100, alignItems: 'center',color:'white',marginBottom:5,fontSize: 15}}></Text>
              <Dropdown
              
              label='Feelings'
              data={data}
              
              value={this.state.feelingValue}
              defaultValue={'Sadness'}
              onChangeText={(value )=> this.onChangeHandler(value)}
              
           
            />

  </View>
                
    
  <View>
            { this.ayah() }
        </View>
  
      </ScrollView>
  
        </SafeAreaView> 
        </ImageBackground>
        </View>
        
    );
  
}}
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
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: 'white',
    borderBottomWidth: 1,
    color: 'white'
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
  }
});