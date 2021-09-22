import * as React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {rem} from '../../utils/scaleble';
import {color} from '../../theme/';
import {useSelector} from 'react-redux';

export const HomeHeader = ({isLogin, clickHandler}) => {
  const userDetails = useSelector(state => state.auth.user);

  return (
    <>
      {isLogin ? (
        <View style={styles.noLoginContainer}>
          <Text style={styles.noLoginContainerTitle}>
            Welcome, {userDetails.name}!
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.loginHeader}
          onPress={clickHandler}>
          <Text style={styles.loginHeaderTitle}>Sign up to watch FASTER!</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loginHeader: {
    height: rem(40),
    width: '100%',
    backgroundColor: color.primary,
    justifyContent: 'center',
  },
  loginHeaderTitle: {
    color: color.white,
    textAlign: 'center',
    fontSize: rem(12),
    fontWeight: '400',
  },
  noLoginContainer: {
    height: rem(40),
    width: '100%',
    backgroundColor: color.background,
    justifyContent: 'center',
  },
  noLoginContainerTitle: {
    color: color.white,
    textAlign: 'right',
    fontSize: rem(14),
    fontWeight: '400',
    paddingRight: rem(30),
  },
});
