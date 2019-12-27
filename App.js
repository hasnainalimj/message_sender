import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Contacts from "expo-contacts";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: true,
      contacts: []
    };
  }

  componentDidMount() {
    this.getContactsPermission();
  }

  getContactsPermission = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        this.getContacts();
      }
    } catch (error) {
      console.log("TCL: App -> getContactsPermission -> error", error);
    }
  };

  getContacts = async () => {
    try {
      const { data } = await Contacts.getContactsAsync();
      console.log("data", data);
    } catch (error) {
      console.log("TCL: App -> getContacts -> error", error);
    }
  };

  render() {
    return <View style={styles.container}></View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
