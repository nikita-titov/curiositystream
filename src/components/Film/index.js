import * as React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import {rem} from '../../utils/scaleble';
import {color} from '../../theme/';

export const Film = ({item, clickHandler, isAuthComplete}) => {
  return (
    <View style={styles.filmBlock}>
      <ImageBackground
        resizeMode="cover"
        style={styles.filmBlockImage}
        source={{uri: item.poster}}>
        <Text style={styles.filmBlockTitle}>{item.title}</Text>
      </ImageBackground>
      {isAuthComplete && (
        <View style={styles.infoContainer}>
          <View style={styles.filmDescriptionContainer}>
            <Text style={styles.filmDescriptionText}>{item.genre}</Text>
            <Text style={styles.filmDescriptionText}>{item.director}</Text>
            <Text style={styles.filmDescriptionText}>{item.year}</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.imageBlock}
            onPress={() => clickHandler(item)}>
            <Image
              resizeMode="contain"
              style={styles.infoImg}
              source={require('../../assets/img/info.png')}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
  },
  infoImg: {
    height: rem(25),
    width: rem(25),
  },
  filmContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: rem(30),
  },
  filmBlockText: {
    paddingHorizontal: rem(10),
    color: color.white,
    marginBottom: rem(10),
    width: '100%',
  },
  filmDescriptionContainer: {
    height: rem(50),
    overflow: 'hidden',
    width: '80%',
    paddingTop: rem(5),
  },
  imageBlock: {
    width: '20%',
    justifyContent: 'center',
  },
  filmBlock: {
    height: rem(170),
    width: Dimensions.get('window').width / 2,
    borderRadius: rem(5),
    marginBottom: rem(5),
    justifyContent: 'flex-start',
    paddingHorizontal: rem(3),
  },
  filmBlockImage: {
    height: rem(120),
  },
  filmDescriptionText: {
    color: color.white,
    width: '100%',
    paddingLeft: rem(3),
    fontSize: rem(12),
    fontWeight: '400',
  },
  filmBlockTitle: {
    color: color.white,
    width: '70%',
    position: 'absolute',
    bottom: rem(20),
    paddingLeft: rem(20),
    fontSize: rem(17),
    fontWeight: '600',
  },
});
