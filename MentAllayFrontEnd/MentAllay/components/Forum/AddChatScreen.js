import React, {useState, useLayoutEffect} from 'react'
import {Text,SafeAreaView,StyleSheet,TextInput, View,Button} from 'react-native'
import { Input } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NavigationEvents } from 'react-navigation';
import CustomListItem from '../Component/CustomListItem';
import {auth,db} from "../database/firebase"
const AddChatScreen = ({navigation}) => {
    const [input,setInput] = useState('');

 useLayoutEffect(() => {
navigation.setOptions(
    {title: "Add new Chat",
headerBackTitle: "Chats",
}
);
 },[navigation] );
 const createChat =async () =>{
     await db.collection('chats').add({
         chatName: input
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
    onSubmitEditing={createChat}
    />
    <Button color='#59d2fa' disabled={!input} onPress={createChat} title='Create new Chat'/>
    </View>
      );
};
export default AddChatScreen;

const styles=StyleSheet.create({});