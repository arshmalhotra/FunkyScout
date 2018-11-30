import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';

import Signup from "./signup";
import * as firebase from "firebase";

const { width, height } = Dimensions.get("window");

const lockIcon = require("../img/login_lock.png");
const personIcon = require("../img/login_person.png");

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      response: "Sign In"
    };

    this.login = this.login.bind(this);
  }

  async login() {
    try {
      await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
      this.setState({
        response: "Logged In!"
      });

      Actions.pitscout();
      setTimeout(() => {  }, 1500);
    } catch (error) {
      this.setState({
        response: error.toString()
      });
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.headerTitleView}>
            <Text style={styles.titleViewText}>Log In</Text>
          </View>
        </View>

        <View style={styles.wrapper}>
          <View style={styles.inputWrap}>
            <View style={styles.iconWrap}>
              <Image source={personIcon} style={styles.icon} resizeMode="contain" />
            </View>
            <TextInput
              placeholder="Username"
              placeholderTextColor="#000"
              style={styles.input}
              onChangeText={(email) => this.setState({
                email,
                response: "Sign In"
              })}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputWrap}>
            <View style={styles.iconWrap}>
              <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
            </View>
            <TextInput
              placeholderTextColor="#000"
              placeholder="Password"
              style={styles.input}
              secureTextEntry={true}
              onChangeText={(password) => this.setState({
                password,
                response: "Sign In"
              })}
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity activeOpacity={.5}>
            <View>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.5} onPress={this.login}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{this.state.response}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.signupWrap}>
            <TouchableOpacity onPress={Actions.signup} activeOpacity={.5}>
              <View>
                <Text style={styles.accountText}>No account?<Text style={{color: '#CC3341'}}> Sign Up</Text></Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  wrapper: {
    paddingVertical: 30,
  },
  headerContainer: {
    flex: 1,
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
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#646464"
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#CC3341",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  forgotPasswordText: {
    color: "#A5A5A5",
    backgroundColor: "transparent",
    textAlign: "right",
    paddingRight: 15,
  },
  signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accountText: {
    color: "#A5A5A5"
  },
  signupLinkText: {
    color: "#000",
    marginLeft: 5,
  }
});
