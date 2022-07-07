import React, {useState,Component } from 'react';
import {
  SafeAreaView,ScrollView,StyleSheet,
  View,
  Text,
  Platform,
  Image,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import {storage,auth,db} from "../database/firebase"

import * as firebase from "firebase";


const AddPostScreen = ({navigation , route}) => {

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };
  const { phone, gender } = route.params;
  const createPost =async () =>{
    const list = [];
    const imageUrl = await uploadImage();
    console.log('Image Url: ', imageUrl);
    await db
    .collection('UsersInfo').where('useId', '==', auth.currentUser.uid)
    .get()
    .then((querySnapshot) => {
      // console.log('Total Posts: ', querySnapshot.size);

      querySnapshot.forEach((doc) => {
        const {
     
            useId,
            phone,
            gender,
            email,
            timestamp,
            
        } = doc.data();
        list.push({
          id: auth.currentUser.id,
          phone:phone,
          useId: useId,
          gender: gender,
          email: email,
          timestamp: timestamp,

        });

      });
    });
    await
  db.collection('Users').add({
       useId: auth.currentUser.uid,
       postImg: imageUrl,
       phone: JSON.stringify(phone),
       gender: JSON.stringify(gender),
       timestamp: firebase.firestore.FieldValue.serverTimestamp(),
       displayName: auth.currentUser.displayName,
       email: auth.currentUser.email,
    }).then (() =>{
      navigation.navigate('Login')
    })
    .catch((error) => alert(error));

}



  const uploadImage = async () => {
    if( image == null ) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage.ref(`Passports/${filename}`);
    //const task = storageRef.putString(uploadUri, "base64", {contentType: 'image/png'});


    const response = await fetch(uploadUri); 
    const blob = await response.blob(); // Here is the trick
   
    await storageRef
         .put(blob)
         .then((snapshot) => {
           console.log("uploaded an image.");
         })
         .catch((err) => console.log(err));


    try {
 

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      // Alert.alert(
      //   'Image uploaded!',
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      // );
      return url;

    } catch (e) {
      console.log(e);
      return null;
    }

  };



  return (

    <View style={{ flex: 1,width: '100%', resizeMode: 'contain',backgroundColor: '#59d2fa', }}>
    <SafeAreaView styles={styles.container}>
    <ScrollView styles={styles.scrollView}>
    <View style={styles.container}>  
    
     <Image 
      source={require('../Image/Logo.png')}
      style={{width:410 ,overflow: 'hidden',borderBottomLeftRadius:60, backgroundColor: 'white',alignItems: 'center',  }}
    />
                <Text style={{textDecorationLine: 'underline',marginTop:20 ,marginBottom:20 , fontSize: 25,fontWeight: "bold",color:'white'}}> Select a Photo of your ID</Text>

              <TouchableOpacity
         style={styles.buttonStyle}
         activeOpacity={0.5}
          onPress={() => choosePhotoFromLibrary()}
        > 
        <Text style={styles.buttonTextStyle}>Select ID </Text>  
        </TouchableOpacity>
        <TouchableOpacity
         style={styles.buttonStyle}
         activeOpacity={0.5}
          onPress={() => createPost()}
        > 
        <Text style={styles.buttonTextStyle}>Submit ID </Text>  
        </TouchableOpacity>             
    </View>
    </ScrollView>
      </SafeAreaView> 
      </View>


  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#59d2fa',
    paddingHorizontal: 10,
    },
    scrollView: {
      
    },
  header: {
width: 80,
    textAlign: 'center',
 marginTop: 0,
    },
  inputStyle: {
    borderRadius:20,
    backgroundColor:'white',
    width: '60%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "white",
    paddingLeft:20,
    paddingRight:20,
    borderBottomWidth: 1,
  },  
  fixToText:{
    marginTop: 25,
  },
  loginText: {
    color: 'white',
    marginTop: 25,
    textAlign: 'center',
    marginBottom:40,
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
    marginTop: 30,
  },
  buttonTextStyle: {
    
    color: '#59d2fa',
    paddingRight: 20,
    paddingLeft:20,
    paddingVertical: 10,
    fontSize: 16,
  },
});