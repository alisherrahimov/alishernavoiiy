import database from '@react-native-firebase/database';
import React, {useEffect, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const imageW = width * 0.7;
const imageH = imageW * 1.54;
function EnterData() {
  const [data, setData] = useState([]);
  const [ismap, setIsMap] = useState(false);
  useEffect(() => {
    function getData() {
      database()
        .ref('/')
        .once('value')
        .then((res) => {
          setData(res.val());
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getData();
    if (data === null) {
      setIsMap(false);
    } else {
      setIsMap(true);
    }
  }, []);
  console.log(data);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      <View style={StyleSheet.absoluteFillObject}>
        {data.map((img, index) => {
          const inputRnage = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const opacity = scrollX.interpolate({
            inputRange: inputRnage,
            outputRange: [0, 1, 0],
          });

          return (
            <Animated.Image
              key={`image-${index}`}
              source={{uri: img.imageback}}
              style={[{opacity: opacity}, StyleSheet.absoluteFillObject]}
              blurRadius={50}
            />
          );
        })}
      </View>

      <Animated.FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        pagingEnabled
        keyExtractor={(_, index) => index.toString()}
        data={data}
        renderItem={({item}) => {
          return (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: width,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  elevation: 10,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 5,
                  },
                  shadowRadius: 10,
                  shadowOpacity: 0.5,
                  borderRadius: 10,
                }}>
                <Image
                  source={{uri: item.imageback}}
                  style={{
                    width: imageW,
                    height: imageH,
                  }}
                  borderRadius={15}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

export default EnterData;
