import React, {useEffect, useState} from 'react';
import {
  View,
  Alert,
  TextInput,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView
  ,Button
} from 'react-native';

import {auth,db} from  '../../database/firebase';
import * as firebase from "firebase";

import PostCard from './PostCard';
import { Container } from '../../styles/FeedStyles';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';


const FeedScreen = ({navigation}) => {
  const [input,setInput] = useState('');
  const [deleted, setDeleted] = useState(false);
  const [internetCheck, setInternetCheck] = useState(0);
  const isFocused = useIsFocused();
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const list = [];

      await db
        .collection('Posts')
        .orderBy('timestamp', 'desc')
        .get()
        .then((querySnapshot) => {
          // console.log('Total Posts: ', querySnapshot.size);

          querySnapshot.forEach((doc) => {
            const {
                useId,
                post,
                timestamp,
                displayName,
                email,
                likes,
                comments,
            } = doc.data();
            list.push({
              id: doc.id,
              useId: useId,
              post: post,
              timestamp: timestamp,
              displayName: displayName,
              email: email,
              likes: likes,
              comments: comments,
              liked: false,

            });
          });
        });

      setPosts(list);

      if (loading) {
        setLoading(false);
      }

      console.log('Posts: ', posts);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [internetCheck,isFocused]);


  const createPost =async () =>{
    await db.collection('Posts').add({
       useId: auth.currentUser.uid,
       post: input,
       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
       displayName: auth.currentUser.displayName,
       email: auth.currentUser.email,
       likes: '',
       comments: null,
    }).then (() =>{
        navigation.navigate('FeedScreen')
    })
    .catch((error) => alert(error));
    setInternetCheck(internetCheck + 1)
}
  
  
const handleDelete = (postId) => {
  Alert.alert(
    'Delete post',
    'Are you sure?',
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed!'),
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: () => deletePost(postId),
      },
    ],
    {cancelable: false},
  );
};

const deletePost = (postId) => {
  console.log('Current Post Id: ', postId);

  db
    .collection('Posts')
    .doc(postId)
    .get()
    .then((documentSnapshot) => {
     
          deleteFirestoreData(postId);
        
      
    });
};

const deleteFirestoreData = (postId) => {
  db
    .collection('Posts')
    .doc(postId)
    .delete()
    .then(() => {
      Alert.alert(
        'Post deleted!',
        'Your post has been deleted successfully!',
      );
      setDeleted(true);
      setInternetCheck(internetCheck + 1)
    })
    .catch((e) => console.log('Error deleting posst.', e))

};
  return (
    <Container>
      <Text style={{marginRight:130, marginBottom: 15, fontSize: 20,  fontWeight: "bold", color: '#59d2fa'}}>Share Your Thought</Text>
      
      <TextInput 
    value={input}
    onChangetext={(text) => setInput(text)}
    placeholder='Enter post'
     
    onChangeText={text =>setInput(text)}
    onSubmitEditing={createPost}
    />
    <Button color='#59d2fa' disabled={!input} onPress={createPost}  title='Create new Post'/>

        <FlatList 
        data={posts}
        renderItem={({item}) =>    <PostCard
        item={item}
        onDelete={handleDelete}
        onPress={() =>
          navigation.navigate('Dashboard', {userId: item.userId})
        }
      />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        
        />
        </Container>
  );
};

export default FeedScreen;