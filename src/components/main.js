import React, {Component} from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#7699dd',
    padding: 20,
    flex: 1
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10
  }
});

export default class Main extends Component {
  constructor (args) {
    super(args);
  }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Text>MAIN</Text>
        <TouchableOpacity style={styles.button} // onPress={this.context.drawer.open}
          >
          <Text>Open Drawer</Text>
        </TouchableOpacity>

      </ScrollView>
    );
  }
}
