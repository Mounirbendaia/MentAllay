import React, {useState, useEffect, useLayoutEffect} from 'react'
import {Text,SafeAreaView,StyleSheet,ScrollView, View,Button} from 'react-native'
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CustomListItem from '../Component/CustomListItem';
import {auth,db} from "../database/firebase";


const informations = ({navigation}) => {
  const [chats , setChats] = useState([]);
  useEffect(() => {
    const unsubscribe = db.collection('chats').onSnapshot(snapshot => (
      setChats(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }) ))
    ))
    return unsubscribe;
  }, [])
  useLayoutEffect (() => {
navigation.setOptions({
  title: "Connect",
headerStyle : {backgroundColor: '#59d2fa',},
headerTitleStyle: {color:"white"},
headerRight: () => (
  <View style={{
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
    marginRight:20,
  }}>
<TouchableOpacity onPress={() => navigation.navigate('AddChatScreen')} activeOpacity={0.5}>
  <Text style={{color:"white"}}>NEW</Text>
</TouchableOpacity>

  </View>
)
});
  }, [navigation]);
const enterChat =(id, chatName) =>{
  navigation.navigate("ChatScreen", {
    id,
    chatName,
  });
};

  return (
    <SafeAreaView>
    <ScrollView style={styles.container}>
      {chats.map(({id, data: {chatName}}) => (
           <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}></CustomListItem>
      ))}
    </ScrollView>
    </SafeAreaView>
  );
};
export default informations;

const styles=StyleSheet.create({
  container:{
    height:"100%"
  }
});