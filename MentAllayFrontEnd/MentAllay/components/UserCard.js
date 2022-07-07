import React, {useContext, useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView,ScrollView,StyleSheet, Text,Image, View, TextInput, Button,TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';
import {storage,db} from '../database/firebase';
import {
  Container,
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
} from '../styles/UserStyles';
import ProgressiveImage from './ProgressiveImage';
import firestore from '@react-native-firebase/firestore';

import { documentId} from 'firebase/firestore'
import moment from 'moment';

const UserCard = ({item, onDelete, onPress}) => {
  const [value, setValue] = useState('Delete user');
  const {user, logout} = useState(null);
  const [userData, setUserData] = useState(null);
  const Cuser = firebase.auth.currentUser;


  const getUser = async () => {
   
  };

  useEffect(() => {
    getUser();
  }, []);
  const _docId = item.id
  const handleDelete = () => {
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
        onPress: () =>deleteuser(),
      },
    ],
    {cancelable: false},
  );

  }

  const deleteuser = ()=> {
    setValue("Deleted");
    fetch("http://10.0.2.2:3000/delete",{
        method:"post",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          userid: item.useId,
          id: _docId
        })
    })
    .then(response => {
      if(response.status == 200){
        
        return response.text()
      }
      else {
        throw new Error("wronf");
      }
    }).then(responseText => {
      this.setState({response: responseText});
    }
      ).catch(error => {
        console.error(error.message);
      })

      db
      .collection('Users')
      .doc(_docId)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const {postImg} = documentSnapshot.data();

          if (postImg != null) {
            const storageRef = storage.refFromURL(postImg);
            const imageRef = storage.ref(storageRef.fullPath);

            imageRef
              .delete()
              .then(() => {
                console.log(`${postImg} has been deleted successfully.`);
                deleteFirestoreData(_docId);
              })
              .catch((e) => {
                console.log('Error while deleting the image. ', e);
              });
            // If the post image is not available
          } else {
            deleteFirestoreData(_docId);
          }
        }
      });
      const deleteFirestoreData = (_docId) => {
        db
          .collection('Users')
          .doc(_docId)
          .delete()
          .then(() => {
            Alert.alert(
              'User deleted!',
              'User has been deleted successfully!',
            );
            setDeleted(true);
          })
          .catch((e) => console.log('Error deleting User.', e));
      };

    }






  return (
    <Card key={item.id}>
      <UserInfo>
        
        <UserInfoText>

           
            <PostTime>{moment(item.timestamp.toDate()).fromNow()}</PostTime>
            <UserName>
            Name: {item.displayName}
            </UserName>
            <UserName>

           Gender: {item.gender}
            </UserName>
            <UserName>
           Phone number: {item.phone}
            </UserName>
            <UserName>
           Email: {item.email}
            </UserName>
        </UserInfoText>
      </UserInfo>




      <PostText>                                                                                           </PostText>  

      <ProgressiveImage
         
          source={{uri: item.postImg}}
          style={{width: '100%', height: 210}}
          resizeMode="cover"
        />

      <InteractionWrapper>
      <TouchableOpacity
         style={styles.buttonStyle}
         activeOpacity={0.5}
         onPress={() => handleDelete() }
        > 
        <Text style={styles.buttonTextStyle}> {value} </Text>  
        </TouchableOpacity>   
      </InteractionWrapper>
    </Card>
  );
};

export default UserCard;

const styles = StyleSheet.create({

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