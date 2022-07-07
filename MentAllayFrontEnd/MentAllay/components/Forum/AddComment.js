import React, {useState, useEffect, useLayoutEffect} from 'react'
import {Text,SafeAreaView,StyleSheet,ScrollView, StatusBar,View,Button, KeyboardAvoidingView, Keyboard} from 'react-native'
import { Avatar } from 'react-native-elements';
import { TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as firebase from "firebase";
import {auth,db} from "../../database/firebase";


const AddComment = ({navigation , route}) => {
    const [docid , setdocid] = useState(null);
    const [input , setInput] = useState('');
    const [comments , setcomments] = useState([]);

 useLayoutEffect(() => {
     
 })
 const sendcomments = () => {
     Keyboard.dismiss();
      db.collection('Posts').doc(route.params.id).collection("comments").add({

          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          comments: input,
          displayName: auth.currentUser.displayName,
          email: auth.currentUser.email,
          likes: null,
         
      })
      setInput('')
 }
 useLayoutEffect(() => {
const unsubscribe= db.collection('Posts').doc(route.params.id).
collection('comments').orderBy('timestamp','asc')
.onSnapshot(snapshot => setcomments(snapshot.docs.map(doc=> ({
    id: doc.id,
    data: doc.data()
})

)))

return unsubscribe;
 },[route])
 const [currentUserLike, setCurrentUserLike] = useState(false)

 


  return (
      <SafeAreaView style={{flex: 1, backgroundColor: "white"}}>
          <StatusBar style="light" />
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}>

            <>
            <ScrollView contentContainerStyle={{     marginLeft: 16,
    flex: 1,}}>
            {comments.map(({ data})=>
                ( <View style={styles.SenderF}>
                    <Avatar
                    position="absolute"
                       rounded size={30} 
                       width={45} height={45} borderRadius={20} marginLeft={25} marginTop={15} source={{ uri:      'https://connectingcouples.us/wp-content/uploads/2019/07/avatar-placeholder.png' }}></Avatar>


 <Text style={styles.senderName}>{data.displayName}</Text>
 <Text style={styles.sender}>{data.comments}</Text>

 <View style={styles.separator}></View>

                     </View>
                
                         )
                         
            )}         
            </ScrollView>
            <View style={styles.separator}></View>
            <View style={styles.footer}>
<TextInput value={input} onChangeText={text =>setInput(text)} 
onSubmitEditing={sendcomments} placeholder='Add a Comment' style={styles.TextInput}>

</TextInput>
<TouchableOpacity 
onPress={sendcomments} 
activeOpacity={0.5}
>
<Text color= "black"> Submit </Text>

</TouchableOpacity>

            </View>
            
            </>

        </KeyboardAvoidingView>
        
</SafeAreaView> 
  );
};
export default AddComment;

const styles=StyleSheet.create({
  container:{
      flex: 1,
    height:"100%"
    
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC"
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
      marginLeft: 70,
      marginTop:5,
    },

  SenderF: {
    padding: 15,
    backgroundColor: "#59d2fa",
  alignSelf:"flex-start",
  borderRadius: 20,
  width:345,

  marginBottom:20,
  maxWidth:"100%",
  position:"relative",
  },
  senderName: {
      left: 50,
      paddingRight: 10,
      paddingLeft:20,
      paddingTop:10,
      color:"white",
      fontSize:16,
      fontWeight:"bold",
  
  },
});