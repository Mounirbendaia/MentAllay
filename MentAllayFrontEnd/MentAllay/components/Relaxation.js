
import React, { Component } from 'react';
import {ImageBackground,ScrollView, SafeAreaView,TouchableOpacity,StyleSheet, View, Text, Button } from 'react-native';
import {auth} from '../database/firebase';
import { useNavigation } from '@react-navigation/native';

import { createStackNavigator } from 'react-navigation';



export default class Relaxation extends Component {
 
  constructor() {
    super();
    this.state = { 
      uid: ''
    }
  }
  



 

  render() {
    this.state = { 
      displayName: auth.currentUser.displayName,
      uid: auth.currentUser.uid
    }    

    return (
      <SafeAreaView styles={styles.container}>
                   <ImageBackground source={require('../Image/test.png')} resizeMode="cover" style={{width: '100%', height: '100%'}}>

      <ScrollView styles={styles.scrollView}>
      <View style={styles.container}>
          <View style={{ alignItems: 'center', borderBottomLeftRadius:50,  borderTopRightRadius:50, paddingTop:300,paddingBottom:20,  paddingRight: 70, paddingLeft:70, marginBottom: 10}}>
      <Text style={{ textAlign: 'center' ,marginBottom: 15, fontSize: 30,  fontWeight: "bold", color: '#59d2fa'  }}>
        How do you like to relieve your stress? </Text>

      </View> 
      <ScrollView >
      <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => this.props.navigation.navigate('quran')}>
              <Text style={styles.buttonTextStyle}>Quraan</Text>
            </TouchableOpacity>
     
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => this.props.navigation.navigate('dhikr')}>
              <Text style={styles.buttonTextStyle}>Dhikr</Text>
            </TouchableOpacity>
     
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => this.props.navigation.navigate('Medi')}>
              <Text style={styles.buttonTextStyle}>Meditation</Text>
            </TouchableOpacity>
  
            </ScrollView>
            
    </View>
    </ScrollView>
    </ImageBackground>
        </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

    paddingHorizontal: 10,
    },
    scrollView: {
      
    },
  textStyle: {
    marginRight:150,
    marginTop: 5,
    fontSize: 20,
    fontWeight: "bold",
  color: '#59d2fa'
  },
  buttonStyle: {
    marginTop: 5,
    backgroundColor: '#59d2fa',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 50,
    width: 330,
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 2,
    marginBottom: 2,
  },
  buttonTextStyle: {

    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});