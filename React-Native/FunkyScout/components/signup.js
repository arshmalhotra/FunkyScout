import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import * as firebase from "firebase";

import Login from "./login";

const backIcon = require("../img/back.png");
const personIcon = require("../img/signup_person.png");
const lockIcon = require("../img/signup_lock.png");
const emailIcon = require("../img/signup_email.png");
const birthdayIcon = require("../img/signup_birthday.png");

export default class SignupVriew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      response: "Join"
    };
    this.signup = this.signup.bind(this);
  }

  async signup() {
    try {
      await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
      this.setState({ response: "Account Created" });

      Actions.login;

      // Navigate to the Home page, the user is auto logged in
    } catch (error) {
        this.setState({ response: error.toString() });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>

          <View style={styles.headerIconView}>
            <TouchableOpacity onPress={Actions.pop} style={styles.headerBackButtonView}>
              <Image source={backIcon} style={styles.backButtonIcon} resizeMode="contain" />
            </TouchableOpacity>
          </View>

          <View style={styles.headerTitleView}>
            <Text style={styles.titleViewText}>Sign Up</Text>
          </View>

        </View>

        <View style={styles.inputsContainer}>

          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Image source={personIcon} style={styles.inputIcon} resizeMode="contain" />
            </View>
            <TextInput
              style={[styles.input, styles.blackFont]}
              placeholder="Name"
              placeholderTextColor="#000"
              underlineColorAndroid='transparent'
              />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Image source={emailIcon} style={styles.inputIcon} resizeMode="contain" />
            </View>
            <TextInput
              style={[styles.input, styles.blackFont]}
              placeholder="Email"
              placeholderTextColor="#000"
              onChangeText={(email) => this.setState({
                email,
                response: "Join"
              })}
              autoCapitalize="none"
              />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Image source={lockIcon} style={styles.inputIcon} resizeMode="contain" />
            </View>
            <TextInput
              secureTextEntry={true}
              style={[styles.input, styles.blackFont]}
              placeholder="Password"
              placeholderTextColor="#000"
              onChangeText={(password) => this.setState({
                password,
                response: "Join"
              })}
              autoCapitalize="none"
              />
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.iconContainer}>
              <Image source={birthdayIcon} style={styles.inputIcon} resizeMode="contain" />
            </View>
            <TextInput
              style={[styles.input, styles.blackFont]}
              placeholder="Birthday"
              placeholderTextColor="#000"
              underlineColorAndroid='transparent'
              />
          </View>

        </View>

        <View style={styles.footerContainer}>

          <TouchableOpacity onPress={this.signup}>
            <View style={styles.signup}>
              <Text style={styles.whiteFont}>{this.state.response}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={Actions.pop}>
            <View style={styles.signin}>
              <Text style={styles.greyFont}>Already have an account?<Text style={{color: '#CC3341'}}> Sign In</Text></Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  headerContainer: {
    flex: 1,
  },
  inputsContainer: {
    flex: 3,
    marginTop: 50,
  },
  footerContainer: {
    flex: 1
  },
  headerIconView: {
    marginLeft: 10,
    backgroundColor: 'transparent'
  },
  headerBackButtonView: {
    width: 25,
    height: 25,
  },
  backButtonIcon: {
    width: 25,
    height: 25
  },
  headerTitleView: {
    backgroundColor: 'transparent',
    marginTop: 25,
    marginLeft: 25,
  },
  titleViewText: {
    fontSize: 40,
    color: '#000000',
  },
  inputs: {
    paddingVertical: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderBottomColor: '#646464',
    borderColor: 'transparent',
    flexDirection: 'row',
    height: 75,
  },
  iconContainer: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputIcon: {
    width: 30,
    height: 30,
  },
  input: {
    flex: 1,
    fontSize: 20,
  },
  signup: {
    backgroundColor: '#CC3341',
    paddingVertical: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  signin: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  greyFont: {
    color: '#A5A5A5'
  },
  blackFont: {
    color: '#000000'
  },
  whiteFont: {
    color: '#FFF'
  }
})
