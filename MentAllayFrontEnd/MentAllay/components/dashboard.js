
import React, { Component } from 'react';
import { SafeAreaView,StyleSheet, Image,View, Text, Button } from 'react-native';
import { createDrawerNavigator,DrawerItemList, DrawerContentScrollView,DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Home from './Home';
import Medi from './Relaxation_techniques/medi';
import informations from './informations';
import AddChatScreen from './AddChatScreen';
import ChatScreen from './ChatScreen';
import FeedScreen from './Forum/FeedScreen';
import Relaxation from './Relaxation';
import EditProfileScreen from './EditProfileScreen'
import AddPostScreen from './Forum/AddPostScreen';
import quran from './Relaxation_techniques/quran';
import dhikr from './Relaxation_techniques/dhikr';
import AddComment from './Forum/AddComment'
import Editpost from './Forum/Editpost';
const Drawer = createDrawerNavigator();
function LogoTitle() {
  return (
    <Image
      style={{ width: 100, height: 100 }}
      source={require('../assets/home.png')}
    /> 

  );
}
export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = { 
      uid: ''
    }
  }


  render() {
    this.state = { 
     
    }    
    return (
      <SafeAreaView style={{flex: 1}}>
      <NavigationContainer independent={true}>
      {/*Top Large Image */}

      <Drawer.Navigator
        initialRouteName="Home"
        drawerPosition='left'
        drawerType="front"
        edgeWidth={100}
        hideStatusBar={false}
        overlayColor='#00000090'
        drawerStyle={{
          backgroundColor: '#e6e6e6',
          width: 250
        }}
        screenOptions={{
          headerShown: true,
          swipeEnabled: true,
          gestureEnabled: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#0080ff'
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: 'bold'
          }
        }}
      >

        <Drawer.Screen
          name="Meditations"
          component={Meditations}
          
          options={{ 
            headerTransparent: true,
            headerTitle: (props) => <LogoTitle {...props} /> ,
            title: 'Home',
            headerTitleStyle: {
              color: '#fff',
            },
            headerStyle: {
              backgroundColor: '#59d2fa',
            },
            
          }}
        />
              <Stack.Screen
          name="Relaxation"
          component={Relaxation}
          options={{
            headerTransparent: true,
            title: 'Relaxation Techniques', headerTitleStyle: {
              color: 'transparent',
            },
            headerStyle: {
              backgroundColor: 'transparent',
            },
            
           
            
          }}
        />
         <Drawer.Screen
          name="FeedScreen"
          component={FeedScreen}
          options={{
            title: 'Forum',
            headerTitleStyle: {
              color: '#fff',
            },
            headerStyle: {
              backgroundColor: '#59d2fa',
            },
            
          }}
        />
       <Drawer.Screen
          name="informations"
          component={informations}
          options={{
            title: 'Connect',
           
            
          }}

        />
 
        <Drawer.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{
            title: 'Edit Profile',
            headerTitleStyle: {
              color: '#59d2fa',
            },
            headerStyle: {
              backgroundColor: 'white',
            },
            
          }}

        />
         <Drawer.Screen
          name="AddPostScreen"
          component={AddPostScreen}
          options={{
            drawerItemStyle: { height: 0 },
            title: 'AddPostScreen',
           
            
          }}
        />
          <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            drawerItemStyle: { height: 0 },
            title: 'AddChat',
            headerStyle: {
              backgroundColor: '#59d2fa',
            },
            
          }}
        />
          <Stack.Screen
          name="AddComment"
          component={AddComment}
          options={{
            drawerItemStyle: { height: 0 },
            title: 'Comment', headerTitleStyle: {
              color: '#59d2fa',
            },
            headerStyle: {
              backgroundColor: 'white',
            },
          }}
        />



        <Drawer.Screen
          name="Medi"
          component={Medi}
          options={{  
            headerTransparent: true,          drawerItemStyle: { height: 0 },
          title: 'Meditation', headerTitleStyle: {
            color: 'white',
            headerTransparent: true
          },
          headerStyle: {
            backgroundColor: 'transparent',
          },
          
          }}
        />


          <Stack.Screen
          name="AddChatScreen"
          component={AddChatScreen}
          options={{
            drawerItemStyle: { height: 0 },
            title: 'AddChatScreen', headerTitleStyle: {
              color: '#fff',
            },
            headerStyle: {
              backgroundColor: '#59d2fa',
            },
            
           
            
          }}
        />
     
           <Stack.Screen
          name="quran"
          component={quran}
          options={{
            headerTransparent: true, 
            drawerItemStyle: { height: 0 },
            title: 'Quraan', headerTitleStyle: {
              color: 'white',
            },
            headerStyle: {
              backgroundColor: 'transparent',
            },
            
           
            
          }}
        />

<Stack.Screen
          name="dhikr"
          component={dhikr}
          options={{
            headerTransparent: true, 
            drawerItemStyle: { height: 0 },
            title: 'Dhikr', headerTitleStyle: {
              color: 'white',
            },
            headerStyle: {
              backgroundColor: 'transparent',

            },
            
           
            
          }}
        />

<Stack.Screen
          name="Editpost"
          component={Editpost}
          options={{
            drawerItemStyle: { height: 0 },
            title: 'Editpost',
           
            headerStyle: {
              backgroundColor: '#59d2fa',
            },
          }}
        />
      </Drawer.Navigator>
      
      
    </NavigationContainer>
 
    </SafeAreaView>



    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff'
  },
  textStyle: {
    fontSize: 15,
    marginBottom: 20
  }
});