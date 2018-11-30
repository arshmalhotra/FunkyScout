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

// DRIVETRAIN
const DRIVETRAIN_OPTIONS = [ "Tank", "Swerve", "Mecanum", "Other" ];

// GAME PLAY
const GEAR_INTAKE = [ "Ground", "Station", "Both", "N/A" ];
const GEAR_RELEASE = [ "Active", "Passive", "N/A" ];
const HP_PILOT = [ "Human Player", "Pilot", "Either" ];
const ROPE_TYPE = [ "FRC", "Custom" ];
const FUEL_PICKUP = [ "Hopper", "Ground", "Both", "N/A" ];

// AUTONOMOUS
const STARTING_LOCATIONS = [ "Center", "Towards Boiler", "Towards Loading Station", "Any" ];

// CONSTRUCTION
const TALL_SHORT = [ "Tall", "Medium", "Short" ];
const CHEESECAKE_OPTIONS = [ "Yes", "No", "Not Needed" ];
const BUMPER_QUALITY = [ "High", "Medium", "Low" ];

export default class PitScout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scoutName: "",
      teamNumber: 0,
      // DRIVETRAIN
      drivetrain: "",
      drivetrainOther: "",
      speed: 0,
      speedShift: false,
      secondSpeed: 0,
      // GAME PLAY
      gearCycle: 0,
      gearIntake: "",
      gearRelease: "",
      hpPilot: "",
      ropeType: "",
      highShootingLocation: "",
      fuelPickup: "",
      // AUTONOMOUS
      startingLocations: "",
      baselineAuto: false,
      gearAuto: false,
      highFuelAuto: false,
      lowFuelAuto: false,
      // CONSTRUCTION
      tallShort: "",
      cheesecakeClimber: "",
      bumperQuality: "",

      comments: "",
      // RESPONSE
      response: "Submit"
    };

    this.itemsRef = GLOBAL.firebaseApp.database().ref("pitscout");
  }

  submitPitScoutForm() {
    var teamNumberRef = this.itemsRef.child("Team Number: " + this.state.teamNumber);
    if (this.state.scoutName !== ""
    && (this.state.teamNumber+this.state.speed) > 1
    && this.state.drivetrain !== ""
    && this.state.gearIntake !== ""
    && this.state.gearRelease !== ""
    && this.state.hpPilot !== ""
    && this.state.ropeType !== ""
    && this.state.fuelPickup !== ""
    && this.state.startingLocation !== ""
    && this.state.tallShort !== ""
    && this.state.cheesecake !== ""
    && this.state.bumperQuality !== "") {
      teamNumberRef.set({
        scoutName: this.state.scoutName,
        // DRIVETRAIN
        drivetrain: this.state.drivetrain,
        drivetrainOther: this.state.drivetrainOther,
        speed: this.state.speed,
        speedShift: this.state.speedShift,
        secondSpeed: this.state.secondSpeed,
        // GAME PLAY
        gearCycle: this.state.gearCycle,
        gearIntake: this.state.gearIntake,
        gearRelease: this.state.gearRelease,
        hpPilot: this.state.hpPilot,
        ropeType: this.state.ropeType,
        highShootingLocation: this.state.highShootingLocation,
        fuelPickup: this.state.fuelPickup,
        // AUTONOMOUS
        startingLocations: this.state.startingLocations,
        baselineAuto: this.state.baselineAuto,
        gearAuto: this.state.gearAuto,
        highFuelAuto: this.state.highFuelAuto,
        lowFuelAuto: this.state.lowFuelAuto,
        // CONSTRUCTION
        tallShort: this.state.tallShort,
        cheesecakeClimber: this.state.cheesecakeClimber,
        bumperQuality: this.state.bumperQuality,

        comments: this.state.comments
      });
      this.setState({
        teamNumber: 0,
        // DRIVETRAIN
        drivetrain: "",
        drivetrainOther: "",
        speed: 0,
        speedShift: false,
        secondSpeed: 0,
        // GAME PLAY
        gearCycle: 0,
        gearIntake: "",
        gearRelease: "",
        hpPilot: "",
        ropeType: "",
        highShootingLocation: "",
        fuelPickup: "",
        // AUTONOMOUS
        startingLocations: "",
        baselineAuto: false,
        gearAuto: false,
        highFuelAuto: false,
        lowFuelAuto: false,
        // CONSTRUCTION
        tallShort: "",
        cheesecakeClimber: "",
        bumperQuality: "",

        comments: ""
      });
      this.refs["teamNumber"].setNativeProps({text: ''});
      this.refs["drivetrainOptions"].select(-1);
      this.refs["speed"].setNativeProps({text: ''});
      this.refs["gearCycle"].setNativeProps({text: ''});
      this.refs["gearIntake"].select(-1);
      this.refs["gearRelease"].select(-1);
      this.refs["hpPilot"].select(-1);
      this.refs["ropeType"].select(-1);
      this.refs["fuelPickup"].select(-1);
      this.refs["highShootingLocation"].setNativeProps({text: ''});
      this.refs["fuelPickup"].select(-1);
      this.refs["startingLocations"].select(-1);
      this.refs["tallShort"].select(-1);
      this.refs["cheesecakeOptions"].select(-1);
      this.refs["bumperQuality"].select(-1);
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
            <Text style={styles.titleViewText}>Pit Scout</Text>
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
              <Text style={styles.subTitleViewText}>Drivetrain</Text>
            </View>
          </View>

          {dropdown("drivetrainOptions", DRIVETRAIN_OPTIONS, "Drivetrain...", DRIVETRAIN_OPTIONS.length,
            (index) => this.setState({
              drivetrain: DRIVETRAIN_OPTIONS[index],
              response: "Submit"
            })
          )}

          {this.state.drivetrain === "Other" ?
            <View style={styles.inputWrap}>
              <TextInput
                ref="drivetrainOther"
                placeholderTextColor="#000"
                placeholder="Drivetrain Other"
                style={styles.input}
                onChangeText={(drivetrainOther) => this.setState({
                  drivetrainOther,
                  response: "Submit"
                })}
                onFocus={this.inputFocused.bind(this, "drivetrainOther")}
              />
            </View>
            : null}

          <View style={styles.inputWrap}>
            <TextInput
              ref="speed"
              placeholderTextColor="#000"
              placeholder="Speed"
              style={styles.input}
              onChangeText={(speed) => this.setState({
                speed: parseInt(speed),
                response: "Submit"
              })}
              onFocus={this.inputFocused.bind(this, "speed")}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputWrap}>
            <Text style={styles.formText}>Speed Shift</Text>
            <Switch
              onValueChange={(value) => this.setState({
                speedShift: value,
                response: "Submit"
              })}
              value={this.state.speedShift} />
          </View>

          {this.state.speedShift ?
            <View style={styles.inputWrap}>
              <TextInput
                ref="secondSpeed"
                placeholderTextColor="#000"
                placeholder="Second Speed"
                style={styles.input}
                onChangeText={(secondSpeed) => this.setState({
                  secondSpeed: parseInt(secondSpeed),
                  response: "Submit"
                })}
                onFocus={this.inputFocused.bind(this, "secondSpeed")}
                keyboardType="numeric"
              />
            </View>
            : null}

          <View style={styles.subheaderContainer}>
            <View style={styles.subheaderTitleView}>
              <Text style={styles.subTitleViewText}>Game Play</Text>
            </View>
          </View>

          <View style={styles.inputWrap}>
            <TextInput
              ref="gearCycle"
              placeholderTextColor="#000"
              placeholder="One Gear Cycle Time (Seconds)"
              style={styles.input}
              onChangeText={(gearCycle) => this.setState({
                gearCycle: parseInt(gearCycle),
                response: "Submit"
              })}
              onFocus={this.inputFocused.bind(this, "gearCycle")}
              keyboardType="numeric"
            />
          </View>

          {dropdown("gearIntake", GEAR_INTAKE, "Gear Intake...", GEAR_INTAKE.length,
            (index) => this.setState({
              gearIntake: GEAR_INTAKE[index],
              response: "Submit"
            })
          )}

          {dropdown("gearRelease", GEAR_RELEASE, "Gear Release...", GEAR_RELEASE.length,
            (index) => this.setState({
              gearRelease: GEAR_RELEASE[index],
              response: "Submit"
            })
          )}

          {dropdown("hpPilot", HP_PILOT, "Human Player or Pilot?", HP_PILOT.length,
            (index) => this.setState({
              hpPilot: HP_PILOT[index],
              response: "Submit"
            })
          )}

          {dropdown("ropeType", ROPE_TYPE, "Rope Type...", ROPE_TYPE.length,
            (index) => this.setState({
              ropeType: ROPE_TYPE[index],
              response: "Submit"
            })
          )}

          <View style={styles.inputWrap}>
            <TextInput
              ref="highShootingLocation"
              placeholderTextColor="#000"
              placeholder="High Goal Shooting Location"
              style={styles.input}
              onChangeText={(highShootingLocation) => this.setState({
                highShootingLocation,
                response: "Submit"
              })}
              onFocus={this.inputFocused.bind(this, "highShootingLocation")}
            />
          </View>

          {dropdown("fuelPickup", FUEL_PICKUP, "Fuel Pickup...", FUEL_PICKUP.length,
            (index) => this.setState({
              fuelPickup: FUEL_PICKUP[index],
              response: "Submit"
            })
          )}

          <View style={styles.subheaderContainer}>
            <View style={styles.subheaderTitleView}>
              <Text style={styles.subTitleViewText}>Autonomous</Text>
            </View>
          </View>

          {dropdown("startingLocations", STARTING_LOCATIONS, "Starting Locations...", STARTING_LOCATIONS.length,
            (index) => this.setState({
              startingLocations: STARTING_LOCATIONS[index],
              response: "Submit"
            })
          )}

          <View style={styles.inputWrap}>
            <Text style={styles.formText}>Auto Routine</Text>
          </View>
          <View style={styles.autoSwitchWrap}>
            <Switch
              onValueChange={(value) => this.setState({
                baselineAuto: value,
                response: "Submit"
              })}
              value={this.state.baselineAuto} />
            <Text style={styles.autoText}>Baseline  </Text>
            <Switch
              onValueChange={(value) => this.setState({
                gearAuto: value,
                response: "Submit"
              })}
              value={this.state.gearAuto} />
            <Text style={styles.autoText}>Gear</Text>
          </View>
          <View style={styles.autoSwitchWrap}>
            <Switch
              onValueChange={(value) => this.setState({
                highFuelAuto: value,
                response: "Submit"
              })}
              value={this.state.highFuelAuto} />
            <Text style={styles.autoText}>High Fuel</Text>
            <Switch
              onValueChange={(value) => this.setState({
                lowFuelAuto: value,
                response: "Submit"})}

              value={this.state.lowFuelAuto} />
            <Text style={styles.autoText}>Low Fuel</Text>
          </View>

          <View style={styles.subheaderContainer}>
            <View style={styles.subheaderTitleView}>
              <Text style={styles.subTitleViewText}>Construction</Text>
            </View>
          </View>

          {dropdown("tallShort", TALL_SHORT, "Tall or Short...", TALL_SHORT.length,
            (index) => this.setState({
              tallShort: TALL_SHORT[index],
              response: "Submit"
            })
          )}

          {dropdown("cheesecakeOptions", CHEESECAKE_OPTIONS, "Cheesecake Climber...", CHEESECAKE_OPTIONS.length,
            (index) => this.setState({
              cheesecakeClimber: CHEESECAKE_OPTIONS[index],
              response: "Submit"
            })
          )}

          {dropdown("bumperQuality", BUMPER_QUALITY, "Bumper Quality...", BUMPER_QUALITY.length,
            (index) => this.setState({
              bumperQuality: BUMPER_QUALITY[index],
              response: "Submit"
            })
          )}

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

          <TouchableOpacity activeOpacity={.5} onPress={this.submitPitScoutForm.bind(this)}>
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
    bottom: 30,
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
