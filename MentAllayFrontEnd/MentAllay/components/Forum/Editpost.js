import React, {useState, useEffect, useLayoutEffect } from 'react';
import { SafeAreaView, BackHandler,ScrollView,StyleSheet, Text,Image, View, TextInput, Button,TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';
import {auth,db} from '../../database/firebase';
import { ListItem, Avatar } from 'react-native-elements'
import { useFocusEffect } from '@react-navigation/native';
const AddComment = ({navigation , route}) => {

  const [docid , setdocid] = useState(null);
  const [input , setInput] = useState('');
  const [post , setpost] = useState('');
  const [internetCheck, setInternetCheck] = useState(0);
 

const UpdatePost = () => {
   Keyboard.dismiss();
    db.collection('Posts').doc(route.params.id).update({
        post: post,
       
    }).then (() =>{
      navigation.navigate('FeedScreen')  })
  .catch((error) => alert(error));
  
}


  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return false
  });

  }, []);
useLayoutEffect(() => {
const unsubscribe= db.collection('Posts').onSnapshot(snapshot => (
  setpost(snapshot.docs.map(doc => ({
    id: doc.id,
    data: doc.data()
  }) ))
))
return unsubscribe;
},[route])
const [currentUserLike, setCurrentUserLike] = useState(false)

 


    return(
      <View style={styles.container}>
           <View style={{ marginTop: 80 , marginBottom: 50 }}>
     
</View>
<TextInput
          style={styles.inputStyle}
          placeholder= "edit Post"
          value={post} 
          onChangeText={text =>setpost(text)}
         
        />
          <TouchableOpacity
         style={styles.buttonStyle}
         activeOpacity={0.5}
         onPress={UpdatePost} 


        > 
        <Text style={styles.buttonTextStyle}>Update Post </Text>  
        </TouchableOpacity>
       
    </View>
    )
  }

export default AddComment;
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