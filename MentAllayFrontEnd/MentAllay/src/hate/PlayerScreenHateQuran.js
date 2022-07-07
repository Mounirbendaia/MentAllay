import React, { useRef, useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Dimensions,
  Animated,
  StyleSheet,
} from "react-native";
import TrackPlayer from 'react-native-track-player';
import Controller from "../Controller";
const { width, height } = Dimensions.get("window");


const quraan = [
  {
    "title": "yassin",
    "url": "https://firebasestorage.googleapis.com/v0/b/rnfirebaseauth-b824b.appspot.com/o/Quran%20verses%20for%20Sadness.mp3?alt=media&token=9d9bb5da-5fcb-41ad-8c0f-96cb6eae1444",
    "id": "1"
  },
  {
    "title": "yassin",
    "url": "https://firebasestorage.googleapis.com/v0/b/rnfirebaseauth-b824b.appspot.com/o/Quran%20verses%20for%20Sadness.mp3?alt=media&token=9d9bb5da-5fcb-41ad-8c0f-96cb6eae1444",
    "id": "2"
  }, 
];




export default function PlayerScreenHateQuran() {
  const scrollX = useRef(new Animated.Value(0)).current;

  const slider = useRef(null);
  const [songIndex, setSongIndex] = useState(0);
  const isPlayerReady = useRef(false);
  // for tranlating the album art
  const position = useRef(Animated.divide(scrollX, width)).current;

  useEffect(() => {
    // position.addListener(({ value }) => {
    //   console.log(value);
    // });

    scrollX.addListener(({ value }) => {
      const val = Math.round(value / width);

      setSongIndex(val);

      // little buggy
      //if previous index is not same then only update it
      // if (val !== songIndex) {
      //   setSongIndex(val);
      //   console.log(val);
      // }
    });
TrackPlayer.setupPlayer().then(async () => {
  console.log("ready");
  await TrackPlayer.reset();
  await TrackPlayer.add(quraan);
  isPlayerReady.current = true;
  TrackPlayer.play();
})
    
    return () => {
      scrollX.removeAllListeners();
    };

  }, []);

  const goNext = () => {
    slider.current.scrollToOffset({
      offset: (songIndex + 1) * width,
    });
  };
  const goPrv = () => {
    slider.current.scrollToOffset({
      offset: (songIndex - 1) * width,
    });
  };

 

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={{ height: 20 }}>

        <Animated.FlatList
          ref={slider}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          data={quraan}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true }
          )}
        />
      </SafeAreaView>


      <Controller onNext={goNext} onPrv={goPrv} />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    textAlign: "center",
    textTransform: "capitalize",
  },
  artist: {
    fontSize: 18,
    textAlign: "center",
    textTransform: "capitalize",
  },
  container: {
    justifyContent: "space-evenly",
    height: height,
    maxHeight: 350,
  },
  artwork: {
    width : '100%',
    height : '900%',
    borderRadius : 15,
    shadowRadius: 3.84,
    marginBottom: 40 
  }
});