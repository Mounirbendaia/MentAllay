import { Ionicons } from '@expo/vector-icons';
import React, {useState, useEffect, useLayoutEffect} from 'react'
import {Text,SafeAreaView,StyleSheet,ScrollView, StatusBar,View,Button, KeyboardAvoidingView, Keyboard} from 'react-native'
import { Avatar } from 'react-native-elements';
import { TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import CustomListItem from '../Component/CustomListItem';
import * as firebase from "firebase";
import {auth,db} from "../database/firebase";


const ChatScreen = ({navigation , route}) => {
    const [input , setInput] = useState('');
    const [messages , setMessages] = useState([]);

 useLayoutEffect(() => {
     navigation.setOptions({
         title: "Chat",
         headerBackTitleVisible: false,
         headerTitleAlign: "left",
        
         headerTitle: () => (
             <View style={{flexDirection: "row", alignItems:"center"}}>
                
<Text style={{ color:"white" , marginLeft: 10 , fontWeight:"700"}}>{route.params.chatName}</Text>
             </View>
         )
     })
 })
 const sendMessage = () => {
     Keyboard.dismiss();
      db.collection('chats').doc(route.params.id).collection("messages").add({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          message: input,
          displayName: auth.currentUser.displayName,
          email: auth.currentUser.email,
         
      })
      setInput('')
      console.log(auth.currentUser.PhotoUrl);
 }
 useLayoutEffect(() => {
const unsubscribe= db.collection('chats').doc(route.params.id).
collection('messages').orderBy('timestamp','desc')
.onSnapshot(snapshot => setMessages(snapshot.docs.map(doc=> ({
    id: doc.id,
    data: doc.data()
}))))
return unsubscribe;
 },[route])
  return (
      <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
          <StatusBar style="light" />
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}>

            <>
            <ScrollView contentContainerStyle={{ paddingTop: 15}}>
            {messages.map(({id, data})=>
                data.email === auth.currentUser.email ? (
                    <View key={id} style={styles.recieverF}>
                   <Avatar
                   position="absolute"
                      rounded bottom={-15} right={-5} size={30} source={{ uri: auth.currentUser.PhotoUrl }}></Avatar>
<Text style={styles.reciever}>{data.message}</Text>

                    </View>
                ) : ( <View style={styles.SenderF}>
                    <Avatar
                    position="absolute"
                       rounded size={30} 
                       bottom={-15} right={-5} source={{ uri: auth.currentUser.PhotoUrl }}></Avatar>
 <Text style={styles.sender}>{data.message}</Text>
 <Text style={styles.senderName}>{data.displayName}</Text>

                     </View>)
            )}
            </ScrollView>
            <View style={styles.footer}>
<TextInput value={input} onChangeText={text =>setInput(text)} 
onSubmitEditing={sendMessage} placeholder='Signal Message' style={styles.TextInput}>

</TextInput>
<TouchableOpacity 
onPress={sendMessage} 
activeOpacity={0.5}
>
<Text color= "black"> Send </Text>

</TouchableOpacity>

            </View>
            
            </>

        </KeyboardAvoidingView>
        
</SafeAreaView> 
  );
};
export default ChatScreen;

const styles=StyleSheet.create({
  container:{
      flex: 1,
    height:"100%"
  },
  footer: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      padding:15,
  },
  TextInput: {
      bottom: 0,
      height: 40,
      flex: 1,
      marginRight: 15,
      borderColor: "transparent",
      backgroundColor: "#ECECEC",
      borderWidth: 1,
      padding: 10,
      color: "grey",
      borderRadius: 30,
  },
  sender:{
      color:"white",
      fontWeight: "500",
      marginLeft: 10,
      marginBottom:15,
    },
  reciever:{
    color:"black",
    fontWeight: "500",
    marginLeft: 10,
  },
  recieverF: {
      padding: 15,
      backgroundColor: "#ECECEC",
    alignSelf:"flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom:20,
    maxWidth:"80%",
    position:"relative",
  },
  SenderF: {
    padding: 15,
    backgroundColor: "#59d2fa",
  alignSelf:"flex-start",
  borderRadius: 20,
  marginRight: 15,
  marginBottom:20,
  maxWidth:"80%",
  position:"relative",
  },
  senderName: {
      left: 10,
      paddingRight: 10,
      color:"white",
      fontSize: 15,
  },
});