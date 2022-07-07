import React, {useEffect, useState} from 'react';
import {Text,Image, View,Button , StyleSheet,} from 'react-native';
import TrackPlayer ,{ useProgress } from 'react-native-track-player';
//import the hook provided by react-native-track-player to manage the progress
//import statement for slider
import Slider from '@react-native-community/slider';
 
const trackPlayerInit = async () => {
 await TrackPlayer.setupPlayer();
 await TrackPlayer.add({
   id: '1',
   url:
     'https://firebasestorage.googleapis.com/v0/b/rnfirebaseauth-b824b.appspot.com/o/Meditation%2FCave%20sound.mp3?alt=media&token=d433b58c-2231-4503-a66b-b7db51a0dea6',
   type: 'default',
   title: 'My Title',
   album: 'My Album',
   artist: 'Rohan Bhatia',
   artwork: 'https://picsum.photos/100',
 });
 return true;
};
 
const PlayerScreenFearQuran = () => {
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
          uri: 'https://firebasestorage.googleapis.com/v0/b/rnfirebaseauth-b824b.appspot.com/o/assets%2Fmeditations%2Fcave.jpg?alt=media&token=64d68ad6-860a-45a7-bd5d-4c83fd8f705d',
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
 });
  
