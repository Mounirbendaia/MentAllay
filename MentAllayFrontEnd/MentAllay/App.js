import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {  StyleSheet,Image, Text} from 'react-native';
import Start from './components/Start';
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import ForgotPassword from './components/ForgotPassword'
import selectID from './components/selectID'
import adminselect from './components/adminselect'
import  AsyncStorage from '@react-native-async-storage/async-storage'
const Stack = createStackNavigator();
function Splashscreenimage({navigation}){
  setTimeout (() => {
    navigation.replace('Start');
  },3000 );
  return(
    <Image style={styles.header}
    source={require('./Image/splash.png')}
    style={{ flex: 1,width: '100%', resizeMode: 'contain', }}
  />
  )
}


function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#3740FE',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
         <Stack.Screen 
        name="SplashScreen" 
        component={Splashscreenimage} 
        options={{headerShown: false}}
      />   
      
           <Stack.Screen 
        name="Start" 
        component={Start} 
        options={{ title: 'Get Stated!' ,headerShown: false}}
      />    
      <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{ title: 'Get Stated!',headerShown: false }}
      />       
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={
          {title: 'Login',headerLeft: null,headerShown: false} 
        }
      />

      <Stack.Screen 
       name="Dashboard" 
       component={Dashboard} 
       options={
         { title: 'Dashboard' ,headerLeft: null,headerShown: false} 
         
       }

      />
           <Stack.Screen 
       name="ForgotPassword" 
       component={ForgotPassword} 
       options={
         { title: 'ForgotPassword' ,headerLeft: null,headerShown: false} 
         
       }

      />
           <Stack.Screen 
       name="selectID" 
       component={selectID} 
       options={
         { title: 'submit ic' ,headerLeft: null,headerShown: false} 
         
       }

      />

<Stack.Screen 
       name="adminselect" 
       component={adminselect} 
       options={
         { title: 'adminselect' ,headerLeft: null,headerShown: false} 
         
       }

      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  header: {

    textAlign: 'center',
 marginTop: 250,
    },

  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});