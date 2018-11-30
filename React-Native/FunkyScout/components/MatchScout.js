import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import ReactNative, {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  Switch,
  Button,
  TouchableOpacity
} from 'react-native';

import * as firebase from "firebase";
import dropdown from './dropdown';
import GLOBAL from './GLOBAL_CONSTANTS';

const { width, height } = Dimensions.get("window");

// AUTONOMOUS
const GEAR_AUTO = [ 0, 1, 2 ];
const GEAR_AUTO_SIDE = ["Towards Boiler", "Center", "Towards Station"];

// TELEOP
const GEAR_TELEOP = [ 0, 1, 2, 3, 4, 5 ];
const DEFENSE_QUALITY = [ "Very Good", "Good", "Decent", "Bad", "Very Bad" ];

export default class MatchScout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scoutName: "",
      matchNumber: 0,
      teamNumber: 0,
      // AUTONOMOUS
      gearAuto: 0,
      gearAutoSide: "",
      highFuelAuto: false,
      lowFuelAuto: false,
      highFuelAccuracyPercentAuto: 0,
      lowFuelAccuracyPercentAuto: 0,
      // TELEOP
      gearTeleop: 0,
      highFuelTeleop: false,
      lowFuelTeleop: false,
      highFuelAccuracyPercentTeleop: 0,
      lowFuelAccuracyPercentTeleop: 0,
      climb: false,
      ropeGrabTime: 0,
      ropeClimbTime: 0,
      failed: false,
      failureReason: "",
      defense: false,
      defenseQuality: "",

      comments: "",
      // RESPONSE
      response: "Submit"
    };

    this.itemsRef = GLOBAL.firebaseApp.database().ref("matchscout");
  }

  submitMatchScoutForm() {
    var teamNumberRef = this.itemsRef.child("Team Number: " + this.state.teamNumber);
    var matchNumberRef = teamNumberRef.child("Match Number: " + this.state.matchNumber);
    if (this.state.scoutName !== "" && (this.state.matchNumber+this.state.teamNumber) > 1) {
      matchNumberRef.set({
        scoutName: this.state.scoutName,
        // AUTONOMOUS
        gearAuto: this.state.gearAuto,
        gearAutoSide: this.state.gearAutoSide,
        highFuelAuto: this.state.highFuelAuto,
        lowFuelAuto: this.state.lowFuelAuto,
        highFuelAccuracyPercentAuto: this.state.highFuelAccuracyPercentAuto,
        lowFuelAccuracyPercentAuto: this.state.lowFuelAccuracyPercentAuto,
        // TELEOP
        gearTeleop: this.state.gearTeleop,
        highFuelTeleop: this.state.highFuelTeleop,
        lowFuelTeleop: this.state.lowFuelTeleop,
        highFuelAccuracyPercentTeleop: this.state.highFuelAccuracyPercentTeleop,
        lowFuelAccuracyPercentTeleop: this.state.lowFuelAccuracyPercentTeleop,
        climb: this.state.climb,
        ropeGrabTime: this.state.ropeGrabTime,
        ropeClimbTime: this.state.ropeClimbTime,
        failed: this.state.failed,
        failureReason: this.state.failureReason,
        defense: this.state.defense,
        defenseQuality: this.state.defenseQuality,

        comments: this.state.comments,
      });
      this.setState({
        matchNumber: 0,
        teamNumber: 0,
        // AUTONOMOUS
        gearAuto: 0,
        gearAutoSide: "",
        highFuelAuto: false,
        lowFuelAuto: false,
        highFuelAccuracyPercentAuto: 0,
        lowFuelAccuracyPercentAuto: 0,
        // TELEOP
        gearTeleop: 0,
        highFuelTeleop: false,
        lowFuelTeleop: false,
        highFuelAccuracyPercentTeleop: 0,
        lowFuelAccuracyPercentTeleop: 0,
        climb: false,
        ropeGrabTime: 0,
        ropeClimbTime: 0,
        failed: false,
        failureReason: "",
        defense: false,
        defenseQuality: "",

        comments: ""
      });
      this.refs["matchNumber"].setNativeProps({text: ''});
      this.refs["teamNumber"].setNativeProps({text: ''});
      this.refs["gearAuto"].select(-1);
      this.refs["gearTeleop"].select(-1);
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
            <Text style={styles.titleViewText}>Match Scout</Text>
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
              onFocus={this.inputFocused.bind(this, "name")}
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
              onFocus={this.inputFocused.bind(this, "matchNumber")}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              ref="teamNumber"
              placeholderTextColor="#000"
              placeholder="Team Number"
              style={styles.input}
              onChangeText={(teamNumber) => this.setState({
                teamNumber: parseInt(teamNumber),
                response: "Submit"
              })}
              onFocus={this.inputFocused.bind(this, "teamNumber")}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.subheaderContainer}>
            <View style={styles.subheaderTitleView}>
              <Text style={styles.subTitleViewText}>Autonomous</Text>
            </View>
          </View>

          {dropdown("gearAuto", GEAR_AUTO, "Number of Gears...", GEAR_AUTO.length,
            (index) => this.setState({
              gearAuto: parseInt(GEAR_AUTO[index]),
              response: "Submit"
            })
          )}

          {this.state.gearAuto>0 ?
            <View>
              {dropdown("gearAutoSide", GEAR_AUTO_SIDE, "Where did they start...", GEAR_AUTO_SIDE.length,
                (index) => this.setState({
                  gearAutoSide: GEAR_AUTO_SIDE[index],
                  response: "Submit"
                })
              )}
            </View>
          : null}

          <View style={styles.inputWrap}>
            <Text style={styles.formText}>High Fuel</Text>
            <Switch
              onValueChange={(highFuelAuto) => this.setState({
                highFuelAuto: highFuelAuto,
                response: "Submit"
              })}
              value={this.state.highFuelAuto} />
          </View>
          <View style={styles.inputWrap}>
            <Text style={styles.formText}>Low Fuel</Text>
            <Switch
              onValueChange={(lowFuelAuto) => this.setState({
                lowFuelAuto: lowFuelAuto,
                response: "Submit"
              })}
              value={this.state.lowFuelAuto} />
          </View>

          {this.state.highFuelAuto ?
            <View style={styles.inputWrap}>
              <TextInput
                ref="highFuelAccuracyPercentAuto"
                placeholderTextColor="#000"
                placeholder="High Fuel Accuracy (%)"
                style={styles.input}
                onChangeText={(highFuelAccuracyPercentAuto) => this.setState({
                  highFuelAccuracyPercentAuto: parseInt(highFuelAccuracyPercentAuto),
                  response: "Submit"
                })}
                onFocus={this.inputFocused.bind(this, "highFuelAccuracyPercentAuto")}
                keyboardType="numeric"
              />
            </View>
            : null}
            {this.state.lowFuelAuto ?
              <View style={styles.inputWrap}>
                <TextInput
                  ref="lowFuelAccuracyPercentAuto"
                  placeholderTextColor="#000"
                  placeholder="Low Fuel Accuracy (%)"
                  style={styles.input}
                  onChangeText={(lowFuelAccuracyPercentAuto) => this.setState({
                    lowFuelAccuracyPercentAuto: parseInt(lowFuelAccuracyPercentAuto),
                    response: "Submit"
                  })}
                  onFocus={this.inputFocused.bind(this, "lowFuelAccuracyPercentAuto")}
                  keyboardType="numeric"
                />
              </View>
              : null}

          <View style={styles.subheaderContainer}>
            <View style={styles.subheaderTitleView}>
              <Text style={styles.subTitleViewText}>Teleop</Text>
            </View>
          </View>

          {dropdown("gearTeleop", GEAR_TELEOP, "Number of Gears...", GEAR_TELEOP.length,
            (index) => this.setState({
              gearTeleop: parseInt(GEAR_TELEOP[index]),
              response: "Submit"
            })
          )}

          <View style={styles.inputWrap}>
            <Text style={styles.formText}>High Fuel</Text>
            <Switch
              onValueChange={(highFuelTeleop) => this.setState({
                highFuelTeleop: highFuelTeleop,
                response: "Submit"
              })}
              value={this.state.highFuelTeleop} />
          </View>
          <View style={styles.inputWrap}>
            <Text style={styles.formText}>Low Fuel</Text>
            <Switch
              onValueChange={(lowFuelTeleop) => this.setState({
                lowFuelTeleop: lowFuelTeleop,
                response: "Submit"
              })}
              value={this.state.lowFuelTeleop} />
          </View>

          {this.state.highFuelTeleop ?
            <View style={styles.inputWrap}>
              <TextInput
                ref="highFuelAccuracyPercentTeleop"
                placeholderTextColor="#000"
                placeholder="High Fuel Accuracy (%)"
                style={styles.input}
                onChangeText={(highFuelAccuracyPercentTeleop) => this.setState({
                  highFuelAccuracyPercentTeleop: parseInt(highFuelAccuracyPercentTeleop),
                  response: "Submit"
                })}
                onFocus={this.inputFocused.bind(this, "highFuelAccuracyPercentTeleop")}
                keyboardType="numeric"
              />
            </View>
          : null}
          {this.state.lowFuelTeleop ?
            <View style={styles.inputWrap}>
              <TextInput
                ref="lowFuelAccuracyPercentTeleop"
                placeholderTextColor="#000"
                placeholder="Low Fuel Accuracy (%)"
                style={styles.input}
                onChangeText={(lowFuelAccuracyPercentTeleop) => this.setState({
                  lowFuelAccuracyPercentTeleop: parseInt(lowFuelAccuracyPercentTeleop),
                  response: "Submit"
                })}
                onFocus={this.inputFocused.bind(this, "lowFuelAccuracyPercentTeleop")}
                keyboardType="numeric"
              />
            </View>
            : null}

          <View style={styles.inputWrap}>
            <Text style={styles.formText}>Climb Attempted</Text>
            <Switch
              onValueChange={(value) => this.setState({
                climb: value,
                response: "Submit"
              })}
              value={this.state.climb} />
          </View>

          {this.state.climb ?
            <View style={styles.inputWrap}>
              <TextInput
                ref="ropeGrabTime"
                placeholderTextColor="#000"
                placeholder="Rope Grab Time (Seconds)"
                style={styles.input}
                onChangeText={(ropeGrabTime) => this.setState({
                  ropeGrabTime: parseInt(ropeGrabTime),
                  response: "Submit"
                })}
                onFocus={this.inputFocused.bind(this, "ropeGrabTime")}
                keyboardType="numeric"
              />
            </View>
          : null}
          {this.state.climb ?
            <View style={styles.inputWrap}>
              <TextInput
                ref="ropeClimbTime"
                placeholderTextColor="#000"
                placeholder="Rope Climb Time (Seconds)"
                style={styles.input}
                onChangeText={(ropeClimbTime) => this.setState({
                  ropeClimbTime: parseInt(ropeClimbTime),
                  response: "Submit"
                })}
                onFocus={this.inputFocused.bind(this, "ropeClimbTime")}
                keyboardType="numeric"
              />
            </View>
          : null}
          {this.state.climb ?
            <View style={styles.inputWrap}>
              <Text style={styles.formText}>Climb Failed</Text>
              <Switch
                onValueChange={(value) => this.setState({
                  failed: value,
                  response: "Submit"
                })}
                value={this.state.failed} />
            </View>
          : null}
          {this.state.failed ?
            <View style={styles.inputWrap}>
              <TextInput
                ref="failureReason"
                placeholderTextColor="#000"
                placeholder="Reason of Failure"
                style={styles.input}
                onChangeText={(failureReason) => this.setState({
                  failureReason: failureReason,
                  response: "Submit"
                })}
                onFocus={this.inputFocused.bind(this, "failureReason")}
              />
            </View>
          : null}

          <View style={styles.inputWrap}>
            <Text style={styles.formText}>Defense</Text>
            <Switch
              onValueChange={(value) => this.setState({
                defense: value,
                response: "Submit"
              })}
              value={this.state.defense} />
          </View>

          {this.state.defense ?
            <View>
              {dropdown("defenseQuality", DEFENSE_QUALITY, "Quality of Defense...", DEFENSE_QUALITY.length,
                (index) => this.setState({
                  defenseQuality: DEFENSE_QUALITY[index],
                  response: "Submit"
                })
              )}
            </View>
          : null}

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
              onFocus={this.inputFocused.bind(this, "comments")}
            />
          </View>

          <TouchableOpacity activeOpacity={.5} onPress={this.submitMatchScoutForm.bind(this)}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>{this.state.response}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  inputFocused (refName) {
    if (Platform.OS === 'ios') {
      setTimeout(() => {
        let scrollResponder = this.refs.scrollView.getScrollResponder();
        scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
          ReactNative.findNodeHandle(this.refs[refName]),
          110, //additionalOffset
          true
        );
      }, 50);
    }
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
