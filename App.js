import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator
} from "react-native";
import * as Contacts from "expo-contacts";
const { width, height } = Dimensions.get("window");

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
      if (data.length) {
        this.setState({
          loader: false,
          contacts: data
        });
      } else {
        this.setState({
          loader: false,
          contacts: []
        });
      }
    } catch (error) {
      this.setState({
        loader: false,
        contacts: []
      });
      console.log("TCL: App -> getContacts -> error", error);
    }
  };

  render() {
    const { loader, contacts } = this.state;
    return (
      <View>
        {loader ? (
          <View style={styles.loaderWrapper}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        ) : (
          <React.Fragment>
            {!contacts.length ? (
              <View style={styles.loaderWrapper}>
                <Text>No Contacts Found!</Text>
              </View>
            ) : (
              <Text>Contacts Found</Text>
            )}
          </React.Fragment>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loaderWrapper: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center"
  }
});
