import React, {useState} from 'react';
import {rem} from '../../utils/scaleble';
import {color} from '../../theme';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import Button from 'react-native-button';
import isEmpty from 'lodash.isempty';
import {useForm, Controller} from 'react-hook-form';
import {passwordRules} from '../../constants/constants';
import {useDispatch} from 'react-redux';
import {
  completeAuthorization,
  setAuthorizedUser,
} from '../../store/actions/actions';
import AsyncStorage from '@react-native-community/async-storage';

const Login = props => {
  const dispatch = useDispatch();
  const [errorLogin, setErrorLogin] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors, isDirty},
  } = useForm({mode: 'onBlur'});

  const onSubmit = ({name, password}) => {
    AsyncStorage.getItem('registeredUsers').then(users => {
      const parsedUsersList = JSON.parse(users);
      const matchingUsers = parsedUsersList.filter(user => user.name === name);

      if (!isEmpty(matchingUsers) && matchingUsers[0].password === password) {
        dispatch(setAuthorizedUser(matchingUsers[0]));
        dispatch(completeAuthorization());
        props.navigation.navigate('Home');
      } else {
        setErrorLogin(true);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Log in</Text>
      <Controller
        control={control}
        name="name"
        render={({field: {onChange, value}}) => (
          <TextInput
            value={value}
            style={styles.input}
            secureTextEntry={false}
            placeholderTextColor={color.gray}
            onChangeText={val => onChange(val)}
            placeholder="Name"
          />
        )}
        rules={{
          required: {
            value: true,
            message: 'Name is required!',
          },
        }}
      />
      {!isEmpty(errors.name) && (
        <Text style={styles.errorText}>{errors.name.message}</Text>
      )}
      <Controller
        control={control}
        name="password"
        render={({field: {onChange, value}}) => (
          <TextInput
            value={value}
            style={styles.input}
            secureTextEntry={true}
            placeholderTextColor={color.gray}
            onChangeText={val => onChange(val)}
            placeholder="Password"
          />
        )}
        rules={{
          required: {
            value: true,
            message: 'Password is required!',
          },
          pattern: {
            minLength: 6,
            value: passwordRules,
            message: 'It is not a valid password!',
          },
        }}
      />
      {!isEmpty(errors.password) && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}
      {errorLogin && (
        <Text style={styles.errorText}>{'Wrong credentials!'}</Text>
      )}
      <Button
        style={styles.button}
        styleDisabled={styles.buttonDisable}
        disabled={!isDirty}
        containerStyle={styles.buttonContainer}
        disabledContainerStyle={styles.buttonDisabledContainer}
        onPress={handleSubmit(onSubmit)}>
        Login
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: rem(25),
  },
  button: {
    fontSize: rem(16),
    color: 'white',
  },
  buttonDisable: {
    color: 'white',
  },
  buttonContainer: {
    padding: rem(12),
    height: rem(45),
    borderRadius: rem(3),
    backgroundColor: color.primary,
    width: '100%',
    marginVertical: rem(20),
  },
  buttonDisabledContainer: {
    backgroundColor: color.gray,
  },
  input: {
    height: rem(45),
    width: '100%',
    margin: rem(12),
    borderWidth: 1,
    borderColor: color.gray,
    borderRadius: rem(3),
    padding: rem(10),
    color: color.black,
  },
  title: {
    width: '100%',
    textAlign: 'center',
    fontSize: rem(24),
    fontWeight: '600',
    color: color.black,
    paddingVertical: rem(25),
  },
  errorText: {
    color: color.red,
    fontSize: rem(14),
    width: '100%',
  },
});

export default Login;
