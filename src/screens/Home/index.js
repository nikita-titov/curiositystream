import React, {useEffect, useCallback, useState} from 'react';
import {HomeHeader} from '../../components/HomeHeader';
import {rem} from '../../utils/scaleble';
import {color} from '../../theme/';
import {View, StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {savePreloadedFilms} from '../../store/actions/actions';
import films from '../../utils/imdb.json';
import {Film} from '../../components/Film/';
import {GeneralModal} from '../../components/GeneralModal';

const Home = props => {
  const dispatch = useDispatch();
  const isAuthComplete = useSelector(state => state.auth.isAuthComplete);
  const savedFilms = useSelector(state => state.films.list);
  const [actualFilm, setActualFilm] = useState(null);

  useEffect(() => {
    dispatch(savePreloadedFilms(films.slice(0, 20)));
  }, [dispatch]);

  const goBack = () => props.navigation.goBack();

  const loadMoreFilms = useCallback(() => {
    const filmsNumber = savedFilms.length;
    const updatedFilmsList = savedFilms.concat(
      films.slice(filmsNumber, filmsNumber + 20),
    );
    dispatch(savePreloadedFilms(updatedFilmsList));
  }, [dispatch, savedFilms]);

  return (
    <>
      <SafeAreaView style={styles.safeArea} />
      <View style={styles.container}>
        <HomeHeader isLogin={isAuthComplete} clickHandler={goBack} />
        <View style={styles.filmContainer}>
          <FlatList
            data={savedFilms}
            initialNumToRender={20}
            horizontal={false}
            numColumns={2}
            renderItem={({item, index}) => (
              <Film
                key={index}
                item={item}
                clickHandler={setActualFilm}
                isAuthComplete={isAuthComplete}
              />
            )}
            onEndReachedThreshold={0.5}
            onEndReached={() => loadMoreFilms()}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
      <GeneralModal actualFilm={actualFilm} clickHandler={setActualFilm} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: color.background,
  },
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
  filmContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: rem(30),
  },
  safeArea: {
    backgroundColor: color.background,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: rem(14),
    fontWeight: '400',
    color: color.white,
  },
});

export default Home;
