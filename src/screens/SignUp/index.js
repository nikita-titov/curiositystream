import React, {useCallback, useState} from 'react';
import {rem} from '../../utils/scaleble';
import {color} from '../../theme';
import {emailRules, passwordRules} from '../../constants/constants';
import {View, StyleSheet, Text, TextInput, Linking} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Button from 'react-native-button';
import isEmpty from 'lodash.isempty';
import debounce from 'lodash.debounce';
import {useForm, Controller} from 'react-hook-form';
import {
  saveSignUpField,
  completeAuthorization,
} from '../../store/actions/actions';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

const SignUp = props => {
  const dispatch = useDispatch();
  const [errorSignUp, setErrorSignUp] = useState(false);
  const userDetails = useSelector(state => state.auth.user);
  const isAuthComplete = useSelector(state => state.auth.isAuthComplete);

  const {
    control,
    handleSubmit,
    formState: {errors, isDirty},
  } = useForm({mode: 'onBlur'});

  const onSubmit = useCallback(
    data => {
      const {name, email, password} = data;
      const newUser = {
        name,
        email,
        password,
      };

      AsyncStorage.getItem('registeredUsers').then(users => {
        const parsedUsersList = JSON.parse(users);

        if (!isEmpty(parsedUsersList)) {
          const allUserEmails = parsedUsersList.map(user => user.email);

          if (!allUserEmails.includes(newUser.email)) {
            const updatedUsersList = parsedUsersList.concat([newUser]);
            dispatch(completeAuthorization());
            AsyncStorage.setItem(
              'registeredUsers',
              JSON.stringify(updatedUsersList),
            );
            props.navigation.navigate('Home');
          } else {
            setErrorSignUp(true);
          }
        } else {
          AsyncStorage.setItem('registeredUsers', JSON.stringify([newUser]));
          dispatch(completeAuthorization());
          props.navigation.navigate('Home');
        }
      });
    },
    [props.navigation, dispatch],
  );

  const handleFieldChange = debounce((name, value) => {
    dispatch(saveSignUpField({[name]: value}));
  }, 300);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Acccount</Text>
      {errorSignUp && (
        <Text style={styles.errorText}>
          {'User with this email already exists!'}
        </Text>
      )}
      <Controller
        control={control}
        defaultValue={isAuthComplete ? '' : userDetails.name}
        name="name"
        render={({field: {onChange, value}}) => (
          <TextInput
            value={value}
            style={styles.input}
            secureTextEntry={false}
            placeholderTextColor={color.gray}
            onChangeText={val => {
              onChange(val);
              handleFieldChange('name', val);
            }}
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
        name="email"
        defaultValue={isAuthComplete ? '' : userDetails.email}
        render={({field: {onChange, value}}) => (
          <TextInput
            value={value}
            style={styles.input}
            secureTextEntry={false}
            placeholderTextColor={color.gray}
            onChangeText={val => {
              onChange(val);
              handleFieldChange('email', val);
            }}
            placeholder="Email"
          />
        )}
        rules={{
          required: {
            value: true,
            message: 'Email is required!',
          },
          pattern: {
            value: emailRules,
            message: 'It is not a valid email!',
          },
        }}
      />
      {!isEmpty(errors.email) && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}
      <Controller
        control={control}
        name="password"
        defaultValue={isAuthComplete ? '' : userDetails.password}
        render={({field: {onChange, value}}) => (
          <TextInput
            value={value}
            style={styles.input}
            secureTextEntry={true}
            placeholderTextColor={color.gray}
            onChangeText={val => {
              onChange(val);
              handleFieldChange('password', val);
            }}
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
            message:
              'Password must consist of: min 6 characters, one big one number one special.',
          },
        }}
      />
      {!isEmpty(errors.password) && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}
      <View style={styles.checkBoxBlock}>
        <Controller
          control={control}
          name="checkBox"
          render={({field: {onChange, value}}) => (
            <CheckBox
              boxType={'square'}
              value={value}
              onValueChange={val => onChange(val)}
              style={styles.checkbox}
              onTintColor={color.primary}
              onCheckColor={color.primary}
            />
          )}
          rules={{
            required: {
              value: true,
              message: 'CheckBox is required!',
            },
          }}
        />
        <Text style={styles.checkboxText}>
          I agree to the{' '}
          <Text
            style={styles.linkColor}
            onPress={() =>
              Linking.openURL('https://curiositystream.com/terms')
            }>
            Terms of Use
          </Text>{' '}
          and{' '}
          <Text
            style={styles.linkColor}
            onPress={() =>
              Linking.openURL('https://curiositystream.com/privacy')
            }>
            Privacy Policy
          </Text>
        </Text>
      </View>
      {!isEmpty(errors.checkBox) && (
        <Text style={styles.errorText}>{errors.checkBox.message}</Text>
      )}
      <Button
        style={styles.button}
        styleDisabled={styles.buttonDisable}
        disabled={!isDirty}
        containerStyle={styles.buttonContainer}
        disabledContainerStyle={styles.buttonDisabledContainer}
        onPress={handleSubmit(onSubmit)}>
        Create Account
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
  linkColor: {
    color: color.blue,
  },
  checkBoxBlock: {
    width: '100%',
    flexDirection: 'row',
    marginTop: rem(15),
    marginBottom: rem(5),
  },
  checkboxText: {
    paddingLeft: rem(10),
  },
  checkbox: {
    height: rem(14),
    width: rem(14),
  },
  errorText: {
    color: color.red,
    fontSize: rem(14),
    width: '100%',
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
});

export default SignUp;
