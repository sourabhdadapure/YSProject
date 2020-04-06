import * as React from "react";
import { View, Text, Switch } from "react-native";
import UI from "../ui";

interface AppProperties {
  title: string;
  status: boolean;
  onChange(): void;
}
export default class App extends React.Component<AppProperties> {
  render() {
    const { status, title, onChange } = this.props;
    const { Colors } = UI;
    return (
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
        }}>
        <Text
          style={{
            fontSize: 18,
            paddingRight: 10,
            color: Colors.Labels.White,
          }}>
          {title}
        </Text>
        <Switch
          trackColor={{
            false: Colors.Buttons.White,
            true: Colors.Buttons.Primary,
          }}
          thumbColor={Colors.Buttons.White}
          ios_backgroundColor={Colors.Buttons.Gray}
          onValueChange={onChange}
          value={status}
        />
      </View>
    );
  }
}
