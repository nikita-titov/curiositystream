import React, {useState} from 'react';
import {rem} from '../../utils/scaleble';
import {color} from '../../theme/';
import {ButtonOrange} from '../../components/Buttton';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {SLIDER_DATA} from '../../constants/constants.js';
import {useSelector} from 'react-redux';
import {
  View,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from 'react-native';

const Welcome = props => {
  const [activeSlide, setActiveSlide] = useState(0);
  const userDetails = useSelector(state => state.auth.user);
  const isAuthComplete = useSelector(state => state.auth.isAuthComplete);

  const navigatePage = route => props.navigation.navigate(route);

  const signUpButtonText =
    (!isAuthComplete && userDetails.name) ||
    userDetails.email ||
    userDetails.password
      ? 'Resume Sign up'
      : 'Sign up';

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="rgba(0,0,0,0.0)" />
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/img/background.png')}
          resizeMode="cover"
          style={styles.image}>
          <Image
            resizeMode="contain"
            style={styles.logo}
            source={require('../../assets/img/logo.png')}
          />
          <Carousel
            layout={'default'}
            sliderWidth={Dimensions.get('window').width}
            itemWidth={Dimensions.get('window').width}
            onSnapToItem={index => setActiveSlide(index)}
            firstItem={0}
            loop={false}
            activeSlideAlignment={'start'}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            scrollEnabled={true}
            data={SLIDER_DATA}
            slideStyle={styles.slideStyle}
            renderItem={({item, index}) => (
              <View key={index}>
                <View style={styles.sliderContent}>
                  <Image
                    resizeMode="contain"
                    style={styles.sliderImage}
                    source={item.img}
                  />
                  <Text
                    numberOfLines={4}
                    ellipsizeMode="tail"
                    style={styles.sliderText}>
                    {item.title}
                  </Text>
                </View>
              </View>
            )}
          />
          <View style={styles.buttonBlocks}>
            <ButtonOrange
              text={signUpButtonText}
              clickHandler={() => navigatePage('SignUp')}
              transparent={false}
            />
            <ButtonOrange
              text={'Sign In'}
              clickHandler={() => navigatePage('Login')}
              transparent={true}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.button}
              onPress={() => navigatePage('Home')}>
              <Text style={styles.text}>Browse</Text>
            </TouchableOpacity>
            <Pagination
              dotsLength={SLIDER_DATA.length}
              activeDotIndex={activeSlide}
              containerStyle={styles.containerDotStyle}
              dotStyle={styles.dotStyle}
              inactiveDotStyle={styles.inactiveDotStyle}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    marginTop: '10%',
    width: rem(150),
    height: rem(50),
  },
  buttonBlocks: {
    width: '100%',
    position: 'absolute',
    bottom: rem(10),
    alignItems: 'center',
    paddingHorizontal: rem(35),
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    height: rem(60),
    marginBottom: rem(15),
  },
  text: {
    width: '100%',
    textAlign: 'center',
    fontSize: rem(14),
    fontWeight: '400',
    color: color.text,
  },
  containerDotStyle: {
    width: '100%',
    marginTop: -rem(30),
    marginBottom: rem(5),
  },
  sliderContent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  sliderImage: {
    height: rem(50),
    width: rem(50),
    marginBottom: rem(5),
  },
  sliderText: {
    fontSize: rem(35),
    color: color.white,
    fontWeight: '200',
    marginHorizontal: rem(30),
    textAlign: 'center',
  },
  slideStyle: {
    height: rem(420),
  },
  dotStyle: {
    width: rem(10),
    height: rem(10),
    borderRadius: rem(10),
    marginHorizontal: 0,
    backgroundColor: color.white,
    marginLeft: -rem(10),
  },
  inactiveDotStyle: {
    opacity: 0.2,
    backgroundColor: color.gray,
  },
});

export default Welcome;
