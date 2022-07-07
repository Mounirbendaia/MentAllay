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
     'https://firebasestorage.googleapis.com/v0/b/rnfirebaseauth-b824b.appspot.com/o/Quraan%2Fsadness.mp3?alt=media&token=4e7940e0-c5a0-4e04-b417-9ec4d36919ba',
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
          uri: 'https://firebasestorage.googleapis.com/v0/b/rnfirebaseauth-b824b.appspot.com/o/assets%2Fquran%2Fquran1.jpg?alt=media&token=3caea7aa-eae2-4a77-a7b2-c62be0e4389f',
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
1- Surah Al-A'raf Ayat 35~{"\n"}
2- Surah Al-A'raf Ayat 49~{"\n"}
3- Surah Fatir Ayat 33~{"\n"}
5- Surah Fatir  Ayat 34~{"\n"}
6- Surah Maryam  Ayat 23~{"\n"}
7- Surah Maryam- Ayat 24~{"\n"}
8- Surah Al-Qasas Ayat 7~{"\n"}
9- Surah Yunus  Ayat 62~{"\n"}
10- Surah Yunus Ayat 63~{"\n"}
11- Surah Yunus Ayat 64~{"\n"}
12- Surah Yunus Ayat 65~{"\n"}
13- Surah Al-An'am Ayat 33~{"\n"}
14- Surah Al-Kahf Ayat 56~{"\n"}
15- Surah Luqman  Ayat 23~{"\n"}
16- Surah Az-Zumar Ayat 61~{"\n"}
17- Surah Fussilat Ayat 30~{"\n"}
18- Surah Fussilat Ayat 31~{"\n"}
19- Surah Az-Zukhruf Ayat 68~{"\n"}
20- Surah Al-Ahqaf Ayat 13~{"\n"}
21- Surah Al-Anbya Ayat 100~{"\n"}
22- Surah Al-Anbya Ayat 101~{"\n"}
23- Surah Al-Anbya Ayat 102~{"\n"}
24- Surah Al-Baqarah Ayat 38~{"\n"}
25- Surah Al-Baqarah Ayat 62~{"\n"}
26- Surah Al-Baqarah Ayat 112~{"\n"}
27- Surah Al-Baqarah Ayat 155~{"\n"}
28- Surah Al-Baqarah Ayat 156 ~{"\n"}
29- Surah Al-Baqarah Ayat 157~{"\n"}
30- Surah Al-Baqarah Ayat 262~{"\n"}
31- Surah Al-Baqarah Ayat 274~{"\n"}
32- Surah Al-Baqarah Ayat 277~{"\n"}
33- Surah Ali 'Imran Ayat 153~{"\n"}
34- Surah Ali 'Imran Ayat 169~{"\n"}
35- Surah Ali 'Imran Ayat 170~{"\n"}
36- Surah Ali 'Imran Ayat 171~{"\n"}
37- Surah Ali 'Imran Ayat 176~{"\n"}
38- Surah Al-Hashr Ayat 22~{"\n"}
39- surah al maidah Ayat 69~{"\n"}
40- Surah At-Tawbah Ayat 49~{"\n"}</Text></ScrollView>
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
  



