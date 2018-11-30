import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';

import Login from "./components/login";
import PitScout from "./components/pitscout";
import MatchScout from "./components/matchscout";
import SuperScout from "./components/superscout";
import * as firebase from "firebase";
import GLOBAL from "./components/GLOBAL_CONSTANTS";

const firebaseConfig = {
  apiKey: "AIzaSyBuU1c53vtVJUNsoNGgBm-2lvQNFpgZDVs",
  authDomain: "funky-scout-326ed.firebaseapp.com",
  databaseURL: "https://funky-scout-326ed.firebaseio.com",
  storageBucket: "funky-scout-326ed.appspot.com"
};
GLOBAL.firebaseApp = firebase.initializeApp(firebaseConfig);

class TabIcon extends React.Component {
    render(){
        return (
            <Text style={{color: this.props.selected ? '#CC3341' :'#000000'}}>{this.props.title}</Text>
        );
    }
}

export default class FunkyScout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="tabbar" tabs={true} tabBarStyle={styles.tabBar}>
            <Scene key="pitscout" component={PitScout} title="Pit Scout" icon={TabIcon} hideNavBar={true} />
            <Scene key="matchscout" component={MatchScout} title="Match Scout" icon={TabIcon} hideNavBar={true} />
            <Scene key="superscout" component={SuperScout} title="Super Scout" icon={TabIcon} hideNavBar={true} />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF'
  }
});

AppRegistry.registerComponent('FunkyScout', () => FunkyScout);
