import React, {useEffect, useState} from 'react';
import {ScrollView,Text,Image,Alert,Pressable,  Modal, View,Button , StyleSheet,} from 'react-native';
import TrackPlayer ,{ useProgress } from 'react-native-track-player';
//import the hook provided by react-native-track-player to manage the progress
//import statement for slider
import Slider from '@react-native-community/slider';
 
const trackPlayerInit = async () => {
 await TrackPlayer.setupPlayer();
 await TrackPlayer.add({
   id: '1',
   url:
     'https://firebasestorage.googleapis.com/v0/b/rnfirebaseauth-b824b.appspot.com/o/Quraan%2Fanger.mp3?alt=media&token=0f943e76-e440-4333-b381-7ae8dd214501',
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
          uri: 'https://firebasestorage.googleapis.com/v0/b/rnfirebaseauth-b824b.appspot.com/o/assets%2Fquran%2Fquran4.jpg?alt=media&token=5001dd3e-96db-4e09-8302-2e2daffdb1f0',
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

1- Surah Al-Qalam 49~{"\n"}
3- Surah Al-Qalam 50~{"\n"}
4- surah al-a'raf 50~{"\n"}
5- surah al-a'raf 152~{"\n"}
6- Surah Taha 81~{"\n"}
7- Surah Taha 85~{"\n"}
8- Surah Taha 86~{"\n"}
9- Surah As-Saaffat 139~{"\n"}
10- Surah As-Saaffat 140~{"\n"}
11- Surah As-Saaffat 141~{"\n"}
12- Surah As-Saaffat 142~{"\n"}
13- Surah Ash-Shuraa 37~{"\n"}
14- Surah Al-Anbya 87~{"\n"}
15- Surah Al-Anbya 88~{"\n"}
16- Surah Al-Baqarah 61~{"\n"}
17- Surah Al-Baqarah 90~{"\n"}
18- Surah Ali 'Imran 102~{"\n"}
19- Surah Ali 'Imran 112~{"\n"}
20- Surah Ali 'Imran 134~{"\n"}
21- Surah Al-Mumtahanah 13~{"\n"}
22- Surah Al-Mujadila 14~{"\n"}
23- Surah Al-Mujadila 15~{"\n"}
24- Surah Al-Ma'idah 60~{"\n"}
25- Surah At-Tawbah 15~{"\n"}
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
  

















