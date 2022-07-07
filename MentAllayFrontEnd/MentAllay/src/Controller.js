import React, {useEffect,useRef} from "react";
import { View,  ActivityIndicator,TouchableOpacity, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer, {
  usePlaybackState,
  useTrackPlayerEvents,
  useProgress,
  Event,
} from 'react-native-track-player';
export default function Controller({ onNext, onPrv }) {
  const playbackState = usePlaybackState();
  const isPlaying = useRef('paused'); //paused play loading
useEffect(() => {
  console.log('Player State', playbackState);

  //set the player state
  if (playbackState === 'playing' || playbackState === 3) {
    isPlaying.current = 'playing';
  } else if (playbackState === 'paused' || playbackState === 2) {
    isPlaying.current = 'paused';
  } 


},[playbackState])
const returnPlayBtn = () => {
  switch (isPlaying.current) {
    case 'playing':
      return <Icon color="#fff" name="pause" size={95} />;
    case 'paused':
      return <Icon color="#fff" name="play-arrow" size={95} />;
    default:
      return <ActivityIndicator size={55} color="#fff" />;
  }
};

 
 const onPlayPause = () => {
  if (isPlaying.current === 'playing') {
    TrackPlayer.pause();
  } else if (isPlaying.current === 'paused') {
    TrackPlayer.play();
  }
};
  return (
    <View style={styles.container}>

    <TouchableOpacity onPress={onPlayPause}>
      {returnPlayBtn()}
    </TouchableOpacity>
   
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});