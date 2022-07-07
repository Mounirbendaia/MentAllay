import React, { Component } from 'react';
import { ImageBackground, Animated,LogBox, SafeAreaView,ToastAndroid,ScrollView,StyleSheet, Text,Image, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import PlayerScreenMeditationBreathing from '../../src/Meditation/PlayerScreenMeditationBreathing';
import PlayerScreenMeditationCave from '../../src/Meditation/PlayerScreenMeditationCave';
import PlayerScreenMeditationForest from '../../src/Meditation/PlayerScreenMeditationForest'
import PlayerScreenMeditationRain from '../../src/Meditation/PlayerScreenMeditationRain'
import PlayerScreenMeditationSea from '../../src/Meditation/PlayerScreenMeditationSea'

import { Dropdown } from 'react-native-material-dropdown-v2';


export default class medi extends Component {

  
  componentDidMount() {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
}
  
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
  onChangeHandler = (value) => {
    this.setState({
      feelingValue: value,
    })
    console.log(`Selected value: ${value}`);
  }


ayah(){
  if( this.state.feelingValue == "Breathing technique" )
  
     return  <PlayerScreenMeditationBreathing/> ;
    else if ( this.state.feelingValue == "Cave sound" )
    return  <PlayerScreenMeditationCave/> ;
    else if (this.state.feelingValue == "Forest sound" )
    return  <PlayerScreenMeditationForest/> ;
    else if ( this.state.feelingValue == "Rain sound" )
    return  <PlayerScreenMeditationRain/> ;
    else if ( this.state.feelingValue == "Sea sound" )
    return  <PlayerScreenMeditationSea/> ;
  else   return <PlayerScreenMeditationSea/>;
}

  render(){
    let data = [{
      value: 'Breathing technique',
    }, {
      value: 'Cave sound',
    }, {
      value: 'Forest sound',
    },{
      value: 'Rain sound',
    }, {
      value: 'Sea sound',
    },];

    return (
        <View style={{ flex: 1,width: '100%', resizeMode: 'contain',backgroundColor: 'white', }}>
          <ImageBackground source={require('../../assets/meditation.png')} resizeMode="cover" style={{width: '100%', height: '100%'}}>

      <SafeAreaView style={{ alignItems: 'center', borderBottomLeftRadius:50,  borderTopRightRadius:50, paddingTop:30,paddingBottom:20,  paddingRight: 70, paddingLeft:70, marginBottom: 10,  }}>
      <ScrollView styles={styles.scrollView}>
      <View >  
    
       
              <Text  style={{color:'white',marginBottom:5,fontSize: 15}}></Text>
              <Dropdown
              
        label='Sounds'
        data={data}
        
        value={this.state.feelingValue}
        defaultValue={'Breathing technique'}
        onChangeText={(value )=> this.onChangeHandler(value)}
        
     
      />
            
  </View>
                
    
  <View style={{paddingTop:100}}>
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