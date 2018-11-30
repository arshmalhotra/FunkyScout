import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import ReactNative, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity
} from 'react-native';

import * as firebase from "firebase";
import GLOBAL from './GLOBAL_CONSTANTS';

const { width, height } = Dimensions.get("window");

export default class SuperScout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scoutName: "",
      matchNumber: 0,
      allianceColor: "",

      comments: "",
      // RESPONSE
      response: "Submit"
    };

    this.itemsRef = GLOBAL.firebaseApp.database().ref("superscout");
  }

  submitSuperScoutForm() {
    var matchNumberRef = this.itemsRef.child("Match Number: " + this.state.matchNumber);
    var allianceColorRef = matchNumberRef.child("Alliance Color: " + this.state.allianceColor);
    if ((this.state.scoutName+this.state.allianceColor+this.state.comments) !== "" && this.state.matchNumber > 0) {
      allianceColorRef.set({
        scoutName: this.state.scoutName,
        // FOULS
        foulTeamNumbers: this.state.foulTeamNumbers,
        foulReasons: this.state.foulReasons,
        // YELLOW CARDS
        yCardTeamNumbers: this.state.yCardTeamNumbers,
        yCardReasons: this.state.yCardReasons,
        // PILOT & HUMAN PLAYER
        pilotErrors: this.state.pilotErrors,
        hpErrors: this.state.hpErrors,

        comments: this.state.comments,
      });
      this.setState({
        matchNumber: 0,
        allianceColor: "",
        // FOULS
        foulTeamNumbers: "",
        foulReasons: "",
        // YELLOW CARDS
        yCardTeamNumbers: "",
        yCardReasons: "",
        // PILOT & HUMAN PLAYER
        pilotErrors: "",
        hpErrors: "",

        comments: ""
      });
      this.refs["matchNumber"].setNativeProps({text: ''});
      this.refs["allianceColor"].setNativeProps({text: ''});
      this.refs["foulTeamNumbers"].setNativeProps({text: ''});
      this.refs["foulReasons"].setNativeProps({text: ''});
      this.refs["yCardTeamNumbers"].setNativeProps({text: ''});
      this.refs["yCardReasons"].setNativeProps({text: ''});
      this.refs["pilotErrors"].setNativeProps({text: ''});
      this.refs["hpErrors"].setNativeProps({text: ''});
      this.refs["comments"].setNativeProps({text: ''});
    } else {
      this.setState({
        response: "You Missed Something!"
      })
    }
  }

  render() {
    return (
      <ScrollView ref="scrollView" style={styles.container} keyboardDismissMode="on-drag">
        <View style={styles.headerContainer}>
          <View style={styles.headerTitleView}>
            <Text style={styles.titleViewText}>Super Scout</Text>
          </View>
        </View>

        <View style={styles.wrapper}>
          <View style={styles.inputWrap}>
            <TextInput
              ref="name"
              placeholder="Name"
              placeholderTextColor="#000"
              style={styles.input}
              onChangeText={(scoutName) => this.setState({
                scoutName,
                response: "Submit"
              })}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              ref="matchNumber"
              placeholderTextColor="#000"
              placeholder="Match Number"
              style={styles.input}
              onChangeText={(matchNumber) => this.setState({
                matchNumber: parseInt(matchNumber),
                response: "Submit"
              })}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              ref="allianceColor"
              placeholderTextColor="#000"
              placeholder="Alliance Color"
              style={styles.input}
              onChangeText={(allianceColor) => this.setState({
                allianceColor: parseInt(allianceColor),
                response: "Submit"
              })}
            />
          </View>

          <View style={styles.subheaderContainer}>
            <View style={styles.subheaderTitleView}>
              <Text style={styles.subTitleViewText}>Fouls</Text>
            </View>
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              ref="foulTeamNumbers"
              placeholderTextColor="#000"
              placeholder="Team Number(s) (Separate by comma)"
              style={styles.input}
              onChangeText={(foulTeamNumbers) => this.setState({
                foulTeamNumbers: foulTeamNumbers,
                response: "Submit"
              })}
              keyboardType="numbers-and-punctuation"
            />
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              ref="foulReasons"
              placeholderTextColor="#000"
              placeholder="Foul Reason(s) (Separate by comma)"
              style={styles.input}
              onChangeText={(foulReasons) => this.setState({
                foulReasons: foulReasons,
                response: "Submit"
              })}
            />
          </View>

          <View style={styles.subheaderContainer}>
            <View style={styles.subheaderTitleView}>
              <Text style={styles.subTitleViewText}>Yellow Cards</Text>
            </View>
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              ref="yCardTeamNumbers"
              placeholderTextColor="#000"
              placeholder="Team Number(s) (Separate by comma)"
              style={styles.input}
              onChangeText={(yCardTeamNumbers) => this.setState({
                yCardTeamNumbers: yCardTeamNumbers,
                response: "Submit"
              })}
              keyboardType="numbers-and-punctuation"
            />
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              ref="yCardReasons"
              placeholderTextColor="#000"
              placeholder="Foul Reason(s) (Separate by comma)"
              style={styles.input}
              onChangeText={(yCardReasons) => this.setState({
                yCardReasons: yCardReasons,
                response: "Submit"
              })}
            />
          </View>

          <View style={styles.subheaderContainer}>
            <View style={styles.subheaderTitleView}>
              <Text style={styles.subTitleViewText}>Pilots & Human Players</Text>
            </View>
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              ref="pilotErrors"
              placeholderTextColor="#000"
              placeholder="Pilot Errors"
              style={styles.input}
              onChangeText={(pilotErrors) => this.setState({
                pilotErrors: pilotErrors,
                response: "Submit"
              })}
            />
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              ref="hpErrors"
              placeholderTextColor="#000"
              placeholder="Human Player Errors"
              style={styles.input}
              onChangeText={(hpErrors) => this.setState({
                hpErrors: hpErrors,
                response: "Submit"
              })}
            />
          </View>

            <View style={styles.subheaderContainer}>
              <View style={styles.subheaderTitleView}>
                <Text style={styles.subTitleViewText}></Text>
              </View>
            </View>

            <View style={styles.inputWrap}>
              <TextInput
                ref="comments"
                placeholderTextColor="#000"
                placeholder="Relevant Comments"
                style={styles.input}
                onChangeText={(comments) => this.setState({
                  comments: comments,
                  response: "Submit"
                })}
              />
            </View>

          <TouchableOpacity activeOpacity={.5} onPress={this.submitSuperScoutForm.bind(this)}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{this.state.response}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    bottom: 30
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
  subheaderContainer: {
    flex: 1
  },
  subheaderTitleView: {
    backgroundColor: 'transparent',
    marginTop: 15,
    marginLeft: 25,
    marginBottom: 5,
  },
  subTitleViewText: {
    fontSize: 20,
    color: '#000000',
  },
  inputWrap: {
    flexDirection: 'row',
    marginVertical: 10,
    height: 40,
    width: 300,
  },
  input: {
    flex: 1,
    left: 40,
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: '#646464',
    borderRadius: 3
  },
  formText: {
    fontSize: 18,
    color: '#000000',
    marginVertical: 5,
    marginHorizontal: 45,
    textAlignVertical: 'center',
  },
  autoSwitchWrap: {
    flexDirection: 'row',
    left: 55
  },
  autoText: {
    fontSize: 16,
    color: '#000000',
    marginVertical: 6,
    marginHorizontal: 5,
    textAlignVertical: 'center',
  },
  button: {
    backgroundColor: '#CC3341',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  }
});
