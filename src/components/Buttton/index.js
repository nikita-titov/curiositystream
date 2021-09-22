import * as React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {rem} from '../../utils/scaleble';
import {color} from '../../theme/';

export const ButtonOrange = ({text, clickHandler, transparent}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.button,
        {backgroundColor: transparent ? color.transparent : color.primary},
      ]}
      onPress={clickHandler}>
      <Text
        style={[styles.text, {color: transparent ? color.text : color.black}]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    justifyContent: 'center',
    height: rem(55),
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: rem(3),
    marginBottom: rem(15),
  },
  text: {
    width: '100%',
    textAlign: 'center',
    fontSize: rem(14),
    fontWeight: '400',
  },
});
