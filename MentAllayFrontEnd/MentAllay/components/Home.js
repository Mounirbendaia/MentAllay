
import React, { Component } from 'react';
import {ScrollView, ImageBackground,SafeAreaView,TouchableOpacity,StyleSheet, View, Text, Button } from 'react-native';
import {auth} from '../database/firebase';
import { useNavigation } from '@react-navigation/native';

import { createStackNavigator } from 'react-navigation';



export default class Dashboard extends Component {
 
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
<View style={{ backgroundColor: 'white'}}>
<ImageBackground source={require('../assets/test.png')} resizeMode="cover" style={{width: '100%', height: '100%'}}>

      <SafeAreaView styles={styles.container}>

      <ScrollView styles={styles.scrollView}>

      <View style={styles.container}>

      <Text style = {styles.textStyle}>
        Hi {this.state.displayName}
      </Text>
      <Text style={{ marginBottom: 15, fontSize: 20,  fontWeight: "bold", color: 'white'}} >
        This is your Dhikr for today
      </Text>
      <View style={{  shadowColor: '#171717',
              shadowOffset: {width: -2, height: 4},
              shadowOpacity: 0.2,
              shadowRadius: 3

          }}>
        <Text style={{  
            borderBottomRightRadius:50,  borderTopLeftRadius:50, paddingTop:0,  paddingRight: 20, paddingLeft:20,fontSize: 15, marginBottom: 10,  color: 'white'}}>
        Allahumma la sahla illa ma ja’altahu sahla, wa ‘anta taj-alul hazna idha shi’ta sahla
        {'\n'} 
        {'\n'} 
“O Allah! There is nothing easy except what You make easy, and You make the difficult easy if it be Your Will.”
        </Text>
      </View>
      <Text style={{  marginTop: 90,marginRight:10,marginBottom: 15, fontSize: 20,  fontWeight: "bold", color: '#59d2fa'}}>Features For You</Text>
      <ScrollView Vertical>
      <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => this.props.navigation.navigate('Relaxation')}>
              <Text style={styles.buttonTextStyle}>Relaxation Techniques</Text>
            </TouchableOpacity>
     
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => this.props.navigation.navigate('FeedScreen')}>
              <Text style={styles.buttonTextStyle}>Forum</Text>
            </TouchableOpacity>
     
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => this.props.navigation.navigate('informations')}>
              <Text style={styles.buttonTextStyle}>Connect</Text>
            </TouchableOpacity>
  
            </ScrollView>

    </View>

    </ScrollView>

        </SafeAreaView>
        </ImageBackground>

        </View>
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

    marginRight:0,
    marginTop: 80,
    fontSize: 25,
    fontWeight: "bold",
  color: 'white'
  },
  buttonStyle: {
    backgroundColor: '#59d2fa',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 50,
    width: 330,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.95,
    borderRadius: 30,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  },
  buttonTextStyle: {

    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
    
  },
});