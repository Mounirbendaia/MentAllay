import React, {useState, useLayoutEffect} from 'react'
import {Text,SafeAreaView,StyleSheet,TextInput, View,Button} from 'react-native'
import { Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationEvents } from 'react-navigation';
import {auth,db} from "../../database/firebase"
import * as firebase from "firebase";

const AddPostScreen = ({navigation , route}) => {
    const [input,setInput] = useState('');

 useLayoutEffect(() => {
navigation.setOptions(
    {title: "Add new post",
headerBackTitle: "Posts",
}
);
 },[navigation] );
 const createPost =async () =>{
     await db.collection('Posts').add({
        useId: auth.currentUser.uid,
        post: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        likes: null,
        comments: null,
     }).then (() =>{
         navigation.navigate('informations')
     })
     .catch((error) => alert(error));
 }
  return (
<View style={styles.container}>
<TextInput 
    value={input}
    onChangetext={(text) => setInput(text)}
    placeholder='Enter a chat name'
     
    onChangeText={text =>setInput(text)}
    onSubmitEditing={createPost}
    />
    <Button disabled={!input} onPress={createPost} title='Create new Chat'/>
    </View>
      );
};
export default AddPostScreen;

const styles=StyleSheet.create({});