import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  FlatList
} from "react-native";
import * as Contacts from "expo-contacts";
const { width, height } = Dimensions.get("window");

function Item({ title }) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.username}>{title}</Text>
    </View>
  );
}

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
              <FlatList
                data={contacts}
                renderItem={obj => <Item title={obj.item.name} />}
              />
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
  },
  listItem: {
    width,
    height: height * 0.12,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    justifyContent: "center",
    alignItems: "center"
  },
  username: {
    fontSize: width * 0.05
  }
});
