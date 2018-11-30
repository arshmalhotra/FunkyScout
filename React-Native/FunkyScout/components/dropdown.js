import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import ReactNative, {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';

export default function dropdown(reference, options, defaultText, numOptions, onSelectFunction) {
  var dropdownStyleHeight = numOptions * 41
  return (
    <View style={styles.inputWrap}>
      <ModalDropdown
        ref={reference}
        options={options}
        onSelect={onSelectFunction}
        defaultValue={defaultText}
        style={styles.dropdown}
        textStyle={styles.dropdownText}
        dropdownStyle={dropdownStyle(dropdownStyleHeight)}
        renderRow={dropdownRenderRow.bind(this)}
        renderSeparator={(sectionID, rowID, adjacentRowHighlighted) => dropdownRenderSeparator(sectionID, rowID, adjacentRowHighlighted, numOptions)} />
    </View>
  );
}

function dropdownStyle(dropdownStyleHeight) {
  return {
    width: 300,
    height: dropdownStyleHeight,
    borderColor: '#646464',
    borderWidth: 2,
    borderRadius: 3,
  }
}

function dropdownRenderRow(rowData, rowID, highlighted) {
  return (
    <TouchableHighlight underlayColor='#CC3341'>
      <View style={[styles.dropdownRow, {backgroundColor: '#FFF'}]}>
        <Text style={styles.dropdownRowText}>
          {`${rowData}`}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

function dropdownRenderSeparator(sectionID, rowID, adjacentRowHighlighted, numOptions) {
  if (rowID === numOptions - 1) return;
  let key = `spr_${rowID}`;
  return (<View style={styles.dropdownSeparator}
    key={key} />
  );
}

const styles = StyleSheet.create({
  inputWrap: {
    flexDirection: 'row',
    marginVertical: 10,
    height: 40,
    width: 300,
  },
  dropdown: {
    left: 40,
    width: 300,
    borderWidth: 0,
    borderRadius: 3,
    backgroundColor: '#646464',
  },
  dropdownText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginVertical: 10,
    marginHorizontal: 6,
    textAlignVertical: 'center',
  },
  dropdownRow: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  dropdownRowText: {
    marginHorizontal: 4,
    fontSize: 16,
    color: '#646464',
    textAlignVertical: 'center',
  },
  dropdownSeparator: {
    height: 1,
    backgroundColor: '#646464',
  },
});
