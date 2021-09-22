import * as React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {rem} from '../../utils/scaleble';
import {color} from '../../theme/';
import Modal from 'react-native-modal';
import isEmpty from 'lodash.isempty';

export const GeneralModal = ({actualFilm, clickHandler}) => {
  return (
    <Modal
      isVisible={!isEmpty(actualFilm)}
      avoidKeyboard
      useNativeDriver
      deviceWidth={Dimensions.get('window').width}
      deviceHeight={Dimensions.get('window').height}
      hasBackdrop={false}
      coverScreen={false}
      style={styles.modal}>
      {!isEmpty(actualFilm) && (
        <>
          <SafeAreaView style={styles.safeArea} />
          <View style={styles.modalContainer}>
            <ImageBackground
              resizeMode="cover"
              style={styles.filmBlockImageModal}
              source={{uri: actualFilm.poster}}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.modalClose}
                onPress={() => clickHandler(null)}>
                <Image
                  resizeMode="contain"
                  style={styles.closeModal}
                  source={require('../../assets/img/close.png')}
                />
              </TouchableOpacity>
              <Text style={styles.filmBlockTitleModal}>{actualFilm.title}</Text>
            </ImageBackground>
            <Text style={styles.filmBlockText}>Plot: {actualFilm.plot}</Text>
            <Text style={styles.filmBlockText}>
              Writer: {actualFilm.writer}
            </Text>
            <Text style={styles.filmBlockText}>
              Actors: {actualFilm.actors}
            </Text>
            <Text style={styles.filmBlockText}>
              IMDB rating: {actualFilm.imdbrating}
            </Text>
            {actualFilm.imdbrating < 7 && (
              <Image
                resizeMode="contain"
                style={styles.infoImgLike}
                source={require('../../assets/img/dislike.png')}
              />
            )}
          </View>
        </>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modalClose: {
    position: 'absolute',
    top: rem(15),
    right: rem(15),
  },
  modal: {
    margin: 0,
    backgroundColor: color.background,
  },
  infoImgLike: {
    height: rem(25),
    width: rem(25),
    marginLeft: rem(10),
  },
  closeModal: {
    height: rem(25),
    width: rem(25),
  },
  filmBlockText: {
    paddingHorizontal: rem(10),
    color: color.white,
    marginBottom: rem(10),
    width: '100%',
  },
  filmBlockImageModal: {
    height: rem(250),
    marginBottom: rem(20),
  },
  filmBlockTitleModal: {
    color: color.white,
    width: '70%',
    position: 'absolute',
    bottom: rem(20),
    paddingLeft: rem(20),
    fontSize: rem(25),
    fontWeight: '600',
  },
  safeArea: {
    backgroundColor: color.background,
  },
});
