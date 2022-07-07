import React, {useContext, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text,SafeAreaView,StyleSheet,ScrollView, View,Button} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {auth, db } from '../../database/firebase';
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
} from '../../styles/FeedStyles';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';


import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';

const PostCard = ({item, onDelete}) => {
  const {user, logout} = useState(null);
  const [userData, setUserData] = useState(null);
  
  const [deleted, setDeleted] = useState(false);
  const navigation = useNavigation(); 
  const [Posts , setPosts] = useState([]);
  const [internetCheck, setInternetCheck] = useState(0);

  const _docId = item.id
  useEffect(() => {
    const unsubscribe = db.collection('Posts').onSnapshot(snapshot => (
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      }) ))
    ))
    return unsubscribe;
  }, [internetCheck])


  const enterComment =(id, _docId) =>{
    navigation.navigate("AddComment", {
      id,
      _docId,
    });}
    const enterEdit =(id, _docId) =>{
      navigation.navigate("Editpost", {
        id,
        _docId,
      });}


  let [likeText2, setlikeText] = useState(item.likes)
  likeIcon = item.liked ? 'heart' : 'heart-outline';
  likeIconColor = item.liked ? '#2e64e5' : '#333';

  const onLikePress = (userId, postId, item) => {
    setlikeText(item.likes+1)
    const liked = item.likes
    setInternetCheck(internetCheck + 1)
    console.log("logged " + item.likes)

    db
        .collection("Posts")

        .doc(postId)

        .update({likes: item.likes+1});
        
        
}



  if (item.likes == 1) {
 
    likeText = '1 Like';
  } else if (item.likes > 1) {
    likeText = likeText2 + ' Likes';
  } else {
    likeText = likeText2 + ' Like';
  }

  if (item.comments == 1) {
    commentText = '1 Comment';
  } else if (item.comments > 1) {
    commentText = item.comments + ' Comments';
  } else {
    commentText = 'Comment';
  }

  const getUser = async () => {
   db
    .collection('Users')
    .doc(item.useId)
    .get()
    .then((documentSnapshot) => {
      if (documentSnapshot.exists) {
        console.log('User Data', documentSnapshot.data());
        setUserData(documentSnapshot.data());
      }
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Card key={item.id}>
      <UserInfo>
        
        <UserInfoText>
        <Avatar
                    position="absolute"
                       rounded size={30} 
                        source={require('../../Image/Logo.png')}></Avatar>
            <UserName>
            {item.displayName}
            </UserName>
            <PostTime>{moment(item.timestamp.toDate()).fromNow()}</PostTime>

        </UserInfoText>
      </UserInfo>
      <PostText>{item.post}</PostText>  

      
        
      <InteractionWrapper>
        <Interaction active={item.liked}>
        
                  <InteractionText  onPress={() => onLikePress(item.useId, item.id, item)} >
   
            {likeText}</InteractionText>
        </Interaction>
        <Interaction>
          <InteractionText onPress={() => enterComment(item.id)}>        
     
{commentText}</InteractionText>


        </Interaction>
        <Interaction>
    
          <InteractionText onPress={() => enterEdit(item.id)}>Edit</InteractionText>
</Interaction>


          <Interaction >
          <InteractionText onPress={() => onDelete(item.id)}>Delete</InteractionText></Interaction>
      
            </InteractionWrapper>
    </Card>
  );
};

export default PostCard;
const styles=StyleSheet.create({
  container:{
    height:"100%"
  }
});