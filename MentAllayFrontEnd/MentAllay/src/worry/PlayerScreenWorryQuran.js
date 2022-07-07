import React, {useEffect, useState} from 'react';
import {ScrollView,Alert,Pressable,  Modal,Text,Image, View,Button , StyleSheet,} from 'react-native';
import TrackPlayer ,{ useProgress } from 'react-native-track-player';
//import the hook provided by react-native-track-player to manage the progress
//import statement for slider
import Slider from '@react-native-community/slider';
 
const trackPlayerInit = async () => {
 await TrackPlayer.setupPlayer();
 await TrackPlayer.add({
   id: '1',
   url:
     'https://firebasestorage.googleapis.com/v0/b/rnfirebaseauth-b824b.appspot.com/o/Quraan%2FWorriness.mp3?alt=media&token=ba6cf503-85b2-4127-98e4-b0a3c61057d0',
   type: 'default',
   title: 'My Title',
   album: 'My Album',
   artist: 'Rohan Bhatia',
   artwork: 'https://picsum.photos/100',
 });
 return true;
};
 
const PlayerScreenFearQuran = () => {
  const [modalVisible, setModalVisible] = useState(false);

 const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
 const [isPlaying, setIsPlaying] = useState(false);
 
//the value of the slider should be between 0 and 1
 const [sliderValue, setSliderValue] = useState(0);
 
 //flag to check whether the use is sliding the seekbar or not
 const [isSeeking, setIsSeeking] = useState(false);
 
 //useTrackPlayerProgress is a hook which provides the current position and duration of the track player.
 //These values will update every 250ms 
 const {position, duration} = useProgress(250);
 
 
 useEffect(() => {
   const startPlayer = async () => {
      let isInit =  await trackPlayerInit();
      setIsTrackPlayerInit(isInit);
   }
   startPlayer();
 }, []);
 
 //this hook updates the value of the slider whenever the current position of the song changes
 useEffect(() => {
   if (!isSeeking && position && duration) {
     setSliderValue(position / duration);
   }
 }, [position, duration]);
 
 const onButtonPressed = () => {
   if (!isPlaying) {
     TrackPlayer.play();
     setIsPlaying(true);
   } else {
     TrackPlayer.pause();
     setIsPlaying(false);
   }
 };
 //this function is called when the user starts to slide the seekbar
 const slidingStarted = () => {
   setIsSeeking(true);
 };
 //this function is called when the user stops sliding the seekbar
 const slidingCompleted = async value => {
   await TrackPlayer.seekTo(value * duration);
   setSliderValue(value);
   setIsSeeking(false);
 };
 return (
  <View style={styles.mainContainer}>
    <View style={styles.imageContainer}>
      <Image
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/rnfirebaseauth-b824b.appspot.com/o/assets%2Fquran%2Fquran2.jpg?alt=media&token=e9af5ee0-3b88-4f95-aba5-15426d6e9a4a',
        }}
        resizeMode="contain"
        style={styles.albumImage}
      />
    </View>
    <View style={styles.detailsContainer}>
    
    </View>
    <View style={styles.controlsContainer}>
      <Slider
        style={styles.progressBar}
        minimumValue={0}
        maximumValue={1}
        value={sliderValue}
        minimumTrackTintColor="white"
        maximumTrackTintColor="white"
        onSlidingStart={slidingStarted}
        onSlidingComplete={slidingCompleted}
        thumbTintColor="white"
      />
      <Button
        title={isPlaying ? 'Pause' : 'Play'}
        onPress={onButtonPressed}
        style={styles.playButton}
        disabled={!isTrackPlayerInit}
        color="#000000"
      />
       <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <ScrollView>
            <Text style={styles.modalText}>0-Surah Al-Fatihah~{"\n"}

1-Surah Al-Fajr l27~{"\n"}
2-Surah Al-Fajr 28~{"\n"}
3-Surah Al-Fajr 29~{"\n"}
4-Surah Al-Fajr 30 ~{"\n"}
5-Surah Ash-Sharh 1~{"\n"}
6-Surah Ash-Sharh 2~{"\n"}
7-Surah Ash-Sharh 3~{"\n"}
8-Surah Ash-Sharh 4~{"\n"}
9-Surah Ash-Sharh 5~{"\n"}
10-Surah Ash-Sharh 6~{"\n"}
11-Surah Ash-Sharh 7~{"\n"}
12-Surah Ash-Sharh 8~{"\n"}
13-Surah Al-Isra 95~{"\n"}
14-Surah Yunus 7~{"\n"}
15-Surah Yunus 8~{"\n"}
16-Surah An-Nahl 106~{"\n"}
17-Surah An-Nahl 107~{"\n"}
18-Surah An-Nahl 112~{"\n"}
19-Surah Al-Baqarah 260~{"\n"}
20-Surah Al-Anfal 10~{"\n"}
21-Surah Ali 'Imran 126~{"\n"}
22-Surah An-Nisa 103~{"\n"}
23-Surah Ar-Ra'd 28~{"\n"}
24-Surah Al-Hajj 11~{"\n"}
25-Surah Al-Ma'idah 11~{"\n"}
26-Surah Al-Ma'idah 23~{"\n"}
27-Surah Al-Ma'idah 113~{"\n"}
28-Surah At-Tawbah  51~{"\n"}
29-Surah At-Tawbah  129~{"\n"}
</Text></ScrollView>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Return</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}> List of Ayat
</Text>
      </Pressable>
    </View>
  </View>
);
};
 
export default PlayerScreenFearQuran;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    
  },
  imageContainer: {
    flex: 0.5,
    justifyContent: 'center',
  },
  detailsContainer: {
    flex: 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlsContainer: {
    flex: 0.45,
    justifyContent: 'flex-start',
  },
  albumImage: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    borderRadius: 40,
  },
  progressBar: {
    height: 20,
    paddingBottom: 90,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 14,
  },
  
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "white",
    alignItems: "center",
    color:"white"
  },
  buttonClose: {
    backgroundColor: "white",
  },
 });
  






