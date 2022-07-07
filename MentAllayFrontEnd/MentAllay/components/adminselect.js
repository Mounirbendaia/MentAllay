import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  TextInput,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView
  ,Button
} from 'react-native';
import {auth,db} from "../database/firebase"
import * as firebase from "firebase";

import UserCard from '../components/UserCard';


import {Container} from '../styles/FeedStyles';


const adminselect = ({navigation}) => {
  const [input,setInput] = useState('');

  const [Users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const list = [];

      await db
        .collection('Users')
        .orderBy('timestamp', 'desc')
        .get()
        .then((querySnapshot) => {
          // console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach((doc) => {
            const {
              postImg,
                useId,
                timestamp,
                gender,
                phone,
                displayName,
                email,
                
            } = doc.data();
            list.push({
              id: doc.id,
              postImg:postImg,
              useId: useId,
              gender:gender,
              phone:phone,
              timestamp: timestamp,
              displayName: displayName,
              email: email,

            });
          });
        });
      

      setUsers(list);

      if (loading) {
        setLoading(false);
      }

      console.log('Users: ', Users);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);



  
  
  return (
    <Container>
      <Text style={{marginRight:130, marginBottom: 15, fontSize: 20,  fontWeight: "bold", color: '#59d2fa'}}>Admin</Text>
         <FlatList 
        data={Users}
        renderItem={({item}) => <UserCard item={item} /> }
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        />
        </Container>
  );
};

export default adminselect;